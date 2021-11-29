const _ = require("lodash");
const user = require('@utils/User');
const report = require('@agile/report/Report');

const fetch = require("node-fetch");

const utils = require("@utils/Utils");
const models = require("@models");
const UserState = require("@repositories/UserState");
const Stories = require("@repositories/Stories");
const postmark = require("postmark");

const groupReport = require('@agile/cmndb/GroupReports');
const labels = require("@controllers/StringsController");
const ReportServiceController = require("./ReportServiceController")

class ReportController {
    async getReportData(ctx) {
        const uliId = await user.getUserId(ctx);
        const data = await report.getReportData(ctx, uliId);
        ctx.body = data;
        return data;
    }

    async getUserReportHtml(ctx) {
        const appUrl = process.env.COMMONDB_DEFAULT_REDIRECT_URI.replace(
            "/login",
            ""
        )
        const uliId = await user.getUserId(ctx);
        const json = await report.getReportData(ctx, uliId);

        await ctx.render("report/agile", {
            appUrl,
            json
        })
    }


    async getUserReportPdf(ctx) {
        const uliId = await user.getUserId(ctx);

        let result = await report.getReportUrl(uliId);
        if (result && result.reportUrl) {
            result.url = result.reportUrl
            ctx.body = result;
        }
        else {
            // generate report, say old completed user
            const data = await report.getReportData(ctx, uliId);
            result = await ReportServiceController.generateReportUrl(uliId, ctx, data);
            if (result && result.reportUrl) {
                result.url = result.reportUrl
                ctx.body = result;
            } else {
                ctx.body = {
                    "error": "Report Url not Found",
                }
            }
        }

    }

    async sendUserReportMail(ctx) {

        const uliId = await user.getUserId(ctx);
        let strings = await labels.getLabelsDataForCmnDb(uliId)

        const result = await report.getReportUrl(uliId);

        if (result && result.reportUrl != null) {
            return await this.sendEmail(result, ctx, strings)

        } else {
            // generate report, say old completed user
            const data = await report.getReportData(ctx, uliId);
            result = await ReportServiceController.generateReportUrl(uliId, ctx, data);
            if (result && result.reportUrl != null) {
                return await sendEmail(result, ctx, strings)
            } else {
                ctx.body = {
                    success: 0,
                    message: 'Report url is not generated by Report Service'
                }
            }
        }

    }

    async sendEmail(result, ctx, strings) {
        const {
            mailId,
            userName
        } = ctx.request.body;

        result.url = result.reportUrl
        var client = new postmark.ServerClient("f9c5d811-3fe9-49d2-a23e-4f5f8ce55ec3");
        const emailResponse = await client.sendEmailWithTemplate({
            "From": "info@knolskape.com",
            "To": mailId,
            "TemplateAlias": "agile-sim-email-template-new",
            "TemplateModel": {
                "username": userName,
                "reportlink": result.url,
                "Year": new Date().getYear(),
                "Subject": strings["label_mail_report_email_subject"],
                ...strings
            }
        });
        if (emailResponse.Message == 'OK' || emailResponse.ErrorCode == 0) {
            ctx.body = {
                success: 1,
                message: 'Email has been sent successfully',
                url: result.url
            };
        } else {
            ctx.body = {
                success: 0,
                message: 'Some issue with postmark sendEmailTemplate execution',
                url: result.url
            };
        }
    }

    async getBatchReportPdf(ctx) {
        const html = await groupReport.getBatchReport(ctx);

        let result;
        // return taskId
        // second ctx.params = task id
        // hit the service again with task id
        const reportService = process.env.REPORT_SERVICE_URL;
        await fetch(reportService, {
            method: "post",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                html,
                type: "headlesschrome",
                options: {
                    pdf: { width: "595px", height: "843px" }
                },
                name: 'Agile_Batch_Report' + Number(new Date())
            })
        })
            .then(res => res.json())
            .then(res => {
                result = res;
            });

        ctx.body = result;
    }

    async executeScipt(ctx) {
        try {
            // step1 : delete from user_action_option_impact_sprint_values the duplicates. //migrations
            // step2: add constraints on user_action_option_impact_sprint_values. // migrations
            // step3: delete these  uli ids from competency tables.
            // step4: then generate report user report for these users to fill these values again.
            const models = require('@models');
            const Sequelize = require("sequelize");
            const MetricsManager = require("@agile/metrics/MetricsManager");
            const userStateRepo = require("@repositories/UserState");

            const { pageNumber } = ctx.query
            console.log("pageNumber", pageNumber)

            // step3
            const uliIds = await models.user_action_option_impact_sprint_values.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('uli_id')), 'uli_id']],
                raw: true,
                group: ['uli_id', 'sprint_number', 'action_option_id'],
                limit: 1000,
                offset: (1000 * pageNumber)
            })

            console.log("ids,ids", uliIds.length)
            //step4
            let userReport = uliIds.map(ele => {
                return this.report(ele["uli_id"], MetricsManager, userStateRepo)
            });
            console.log("Runnning report data for those ulids")
            await Promise.all(userReport)


            ctx.body = {
                success: 1,
                message: "Success",
                data: uliIds
            };
        } catch (err) {
            console.log(err)
            ctx.body = {
                success: 0,
                message: err
            };
        }
    }

    async report(uliId, MetricsManager, userStateRepo) {
        try {
            let actionOptionImpact = await models.user_action_option_impact_sprint_values.findAll({
                where: {
                    uliId
                },
                raw: true
            });
            const userState = await userStateRepo.getUserStateDetails(uliId);
            const sprintDay = userState.currentSprintDay;
            const day = userState.currentDay;
            const sprintNumber = userState.currentSprintNumber;

            await Promise.all([
                MetricsManager.calculateCustomerCentricity(uliId, null, sprintDay, sprintNumber, day, actionOptionImpact),
                MetricsManager.calculateChangeAgility(uliId, null, sprintDay, sprintNumber, day, actionOptionImpact),
                MetricsManager.calculateTalentDexterity(uliId, null, sprintDay, sprintNumber, day, actionOptionImpact),
                MetricsManager.calculateContinuosLearning(uliId, null, sprintDay, sprintNumber, day, actionOptionImpact),
                MetricsManager.calculateAgileLedaershipScore(uliId, null, sprintDay, sprintNumber, day, actionOptionImpact)
            ])
            return true
        } catch (err) {
            throw err
        }
    }
}

module.exports = new ReportController();