const report = require('@agile/report/Report');
const models = require("@models");
const _ = require("lodash");


class UserReports {

  async getUserReport(ctx) {
    const { uliId } = ctx.params;
    // console.log(uliId)
    const html = await this.getReportHTML(ctx, uliId);

    return {
      uliId: uliId,
      isReportReady: 1,
      type: 'headlesschrome',
      version: 'v1.0.1',
      reportHTML: html,
      options: {
        pdf: {
          width: '595px',
          height: '843px',
        },
      },
    };
  }

  async getReportData(ctx, uliId) {
    const data = await report.getReportData(ctx,uliId);
    return data;
  }
  async getUsersReport(ctx) {
    let uliIds = ctx.query.uliIds.split(',').map(Number);

    let userData = await models.user_state.findAll({
      where: {
        uliId: uliIds,
        isGameCompleted: true
      },
      attributes: ['uliId'],
      raw: true,
    });

    uliIds = _.map(userData, 'uliId');
    let reports = uliIds.map(async uliId => {
      const html = await this.getReportHTML(ctx, uliId);
      return {
        uliId: uliId,
        isReportReady: 1,
        reportHTML: html,
        options: {
          pdf: {
            width: '595px',
            height: '843px',
          },
        },
      };
    });



    reports = await Promise.all(reports);

    return {
      type: 'headlesschrome',
      version: 'v1.0.1',
      reports
    };
  }

  async getGroupUsersReport(ctx) {
    const { grpId } = ctx.params;
    let userData = await models.users.findAll({
      where: {
        groupId: grpId
      },
      attributes: ['uliId'],
      raw: true,
    });

    let uliIds = _.map(userData, 'uliId');


    userData = await models.user_state.findAll({
      where: {
        uliId: uliIds,
        isGameCompleted: true
      },
      raw: true
    });

    uliIds = _.map(userData, 'uliId');

    let reports = uliIds.map(async uliId => {
      const html = await this.getReportHTML(ctx, uliId);
      return {
        uliId: uliId,
        isReportReady: 1,
        reportHTML: html,
        options: {
          pdf: {
            width: '595px',
            height: '843px',
          },
        },
      };
    });

    reports = await Promise.all(reports);

    return {
      type: 'headlesschrome',
      version: 'v1.0.1',
      reports,
    };
  }

  async getReportHTML(ctx, uliId) {
    const data = await this.getReportData(ctx, uliId);
    let json = data;
    const appUrl = process.env.COMMONDB_DEFAULT_REDIRECT_URI.replace(
      "/login",
      ""
    );

    await ctx.render("report/agile", {
      appUrl,
      json
    });

    return ctx.body;
  }
}

module.exports = new UserReports();