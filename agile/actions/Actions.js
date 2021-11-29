const models = require('@models');
const user = require("@utils/User");
const actionUtils = require("./ActionUtils");
const eventsManager = require("@agile/events/EventsManager");
const MetricsManager = require("@agile/metrics/MetricsManager");
const TeamMembers = require("@repositories/TeamMembers");
const Metrics = require('@repositories/Metrics');
const Stories = require("@repositories/Stories");

const progression = require('@agile/stories/progression');
const actions = require("@repositories/Actions");
const Sentry = require('@sentry/node');

const UserState = require("@repositories/UserState");
const blockersManager = require("@agile/blockers/BlockersManager");
const blockersRepo = require("@repositories/Blockers");
const _ = require("lodash");

class Actions {

    async resolveBlocker(uliId, actionOption, transaction) {
        const actionId = actionOption.actionId;
        await blockersRepo.resolveBlocker(uliId, actionId, transaction);
    }

    startSpan(ctx, desc){
        let span;
        const __sentry_transaction = ctx.__sentry_transaction;
        if (__sentry_transaction) {
            span = __sentry_transaction.startChild({
                description: desc,
                op: "Action Response",
            });
            return span;
        }else{
            return null;
        }
    }

    endSpan(span){
        if (span) {
            span.finish();
        }
    }

    async calculateMetricsImpact(actionOptionId, actionOption,uliId,transaction,sprintDay,sprintNumber,day){
        const budget = await MetricsManager.updateBudget(actionOption.cost, uliId, transaction, sprintDay, sprintNumber, day);
        const pa = await MetricsManager.calculatePA(uliId, transaction, sprintDay, sprintNumber, day);
        return await MetricsManager.calculateCS(actionOptionId, uliId, transaction, sprintDay, sprintNumber, day);
    }

    async getResponse(ctx) {
        let transaction = null;
        let __sentry_transaction = null;
        try {

            const getResponseSpan = this.startSpan(ctx, "overall get response")
            const uliId = await user.getUserId(ctx);
            const {actionOptionId} = ctx.request.body;


            let currentUserState = await UserState.getUserStateDetails(uliId);

            let day = currentUserState.currentDay;
            let sprintNumber = currentUserState.currentSprintNumber;
            let sprintDay = currentUserState.currentSprintDay;
            const actionCanBeTakenSpan = this.startSpan(ctx, "actionCanBeTaken")
            const actionCanBeTaken = await actionUtils.checkIfActionCanBeTaken(uliId, actionOptionId, sprintNumber, day);
            this.endSpan(actionCanBeTakenSpan);

            if (actionCanBeTaken) {
                // transaction = await models.sequelize.transaction();
                // transaction = await models.sequelize.transaction();
                
                const actionOptionSpan = this.startSpan(ctx, "actionOptionSpan");
                const actionOption = await actions.getActionOption(actionOptionId);
                this.endSpan(actionOptionSpan);

                const resolveBlockerSpan = this.startSpan(ctx, "resolveBlockerSpan");
                await this.resolveBlocker(uliId, actionOption, transaction);
                this.endSpan(resolveBlockerSpan);

                const userActionOptionSpan = this.startSpan(ctx, "userActionOptionSpan");
                const userActionOption = await this.saveUserActions(actionOptionId, sprintDay, sprintNumber, day, uliId, actionOption, transaction);
                this.endSpan(userActionOptionSpan);

                const actionOptionEffort = actionOption.effort;

                //logic to update day, sprint number and sprint day
                let updatedDay = day + actionOptionEffort;
                let updatedSprintNumber = sprintNumber;
                let updatedSprintDay = sprintDay + actionOptionEffort;

                const getBlockersSpan = this.startSpan(ctx, "getBlockers");
                const blockers = await this.getBlockers(uliId, day, sprintNumber, sprintDay, actionOptionEffort);
                this.endSpan(getBlockersSpan);


                const count = await actionUtils.getUserActionOptionsLength(uliId, actionOption.id, "sprint", sprintNumber, transaction)
                               //calculate stories progress
                const makeProgressionSpan = this.startSpan(ctx, "makeProgressionSpan");
                const storiesProgress = await progression.makeProgression(sprintNumber, uliId, transaction, updatedDay, updatedSprintNumber, updatedSprintDay);
                this.endSpan(makeProgressionSpan);

                const calculateMetricsImpactCSSpan = this.startSpan(ctx, "calculateMetricsImpactCS");
                const cs = await this.calculateMetricsImpact(actionOptionId, actionOption,uliId,transaction,sprintDay,sprintNumber,day);
                this.endSpan(calculateMetricsImpactCSSpan);

                // console.log('metrics after actios', metrics);
                let  metrics = await this.getMetrics(uliId, actionOptionId, day, sprintNumber, sprintDay, count);
                // console.log(metrics , 'me')
                const saveUserActionOptionMetricsSpan = this.startSpan(ctx, "saveUserActionOptionMetrics");
                const saveUserActionOptionMetrics = await this.saveUserActionOptionMetrics(uliId, sprintDay, sprintNumber, day, actionOptionId, userActionOption, metrics, transaction);
                this.endSpan(saveUserActionOptionMetricsSpan);
                metrics = [...metrics, cs]

                const calculateCSForPASpan = this.startSpan(ctx, "calculateCSForPA");
                await MetricsManager.calculateCSForPA(actionOptionId, uliId, transaction, sprintDay, sprintNumber, day);
                this.endSpan(calculateCSForPASpan);

                // await transaction.commit();
                const getEventsSpant = this.startSpan(ctx, "getEventsSpant")
                const events = await this.getEvents(ctx, sprintNumber, sprintDay, actionOptionEffort);
                this.endSpan(getEventsSpant);
                
                const latestUserMetrics = await MetricsManager.getLatestMetrics(uliId);
                const userTeamMembers = await TeamMembers.getTeamMembersMetrics(uliId);
                
                await UserState.updateField({
                    currentDay: updatedDay,
                    currentSprintNumber: updatedSprintNumber,
                    currentSprintDay: updatedSprintDay
                }, {
                    uliId
                });

                this.endSpan(getResponseSpan);
                
                return {
                    actionResponse: {
                        day,
                        sprintDay,
                        sprintNumber,
                        actionOptionId,
                        message: userActionOption.message || null,
                        userMetrics: metrics,
                    },
                    events: await events,
                    blockers: blockers,
                    userStories: storiesProgress,
                    userMetrics: latestUserMetrics,
                    userState: await UserState.getUserStateDetails(uliId),
                    userTeamMembers
                };
            } else {
                ctx.throw(400, {
                    msg: 'Action Limit exceeded'
                });
            }
        } catch (error) {
            console.log(error);
            if(transaction){
                await transaction.rollback();
            }
            
            Sentry.captureMessage("Action was not successful" + JSON.stringify(error));
            ctx.throw(400, {
                msg: '',
                error
            });
        }
        
    }

    async saveUserActions(actionOptionId, sprintDay, sprintNumber, day, uliId, actionOption, transaction) {
        const message = await this.getMessage(uliId, actionOptionId, actionOption, sprintNumber, transaction);
        await actions.createUserActions(uliId, actionOptionId, sprintDay, sprintNumber, day, message, actionOption, transaction);
        return actions.getUserActionOptionByDay(uliId, actionOptionId, sprintDay, sprintNumber, day, transaction);
    }

    async getEvents(ctx, sprintNumber, sprintDay, actionOptionEffort) {
        const events = await eventsManager.getEvents(ctx, sprintNumber, sprintDay, actionOptionEffort);
        return events;
    }

    async getBlockers(uliId, day, sprintNumber, sprintDay, actionOptionEffort) {
        const blockers = await blockersManager.getBlockers(uliId, day, sprintNumber, sprintDay, actionOptionEffort)
        return blockers;
    }

    async getMetrics(uliId, actionOptionId, day, sprintNumber, sprintDay, count) {
        const metrics = await MetricsManager.getActionMetricsImpact(uliId, actionOptionId, day, sprintNumber, sprintDay, count);
        const final = metrics.map(metric => {
            const finalMetric =  {
                ...metric,
                metricsId: metric.metricId
            };
            delete finalMetric.metricId;
            return finalMetric;
        });
        // console.log(final, 'final');
        return final;
    }

    async getMessage(uliId, actionOptionId, actionOption, sprintNumber, transaction) {
        
        if (actionOption.messageType == "level") {
            const message = await actionUtils.getLevelMessage(uliId,actionOptionId, actionOption.messageLevelType, sprintNumber, transaction);
            return message;
        } else {
            const message = await actionUtils.getPoolMessage(actionOptionId);
            return message;
        }
    }

    getCurrentDay(day, actionOption) {
        const currentDay = day + actionOption.effort;
        return currentDay;
    }

    getCurrentSprintDay(sprintDay, actionOption) {
        let currentSprintDay = sprintDay + actionOption.effort;
        return currentSprintDay;
    }

    async saveUserActionOptionMetrics(uliId, sprintDay, sprintNumber, day, actionOptionId, userActionOption, metrics, transaction) {
       
        // console.log(metrics, "saveUserActionOptionMetrics");
        const metricsData = metrics.map((metric) => {
            return {
                uliId,
                sprintDay,
                sprintNumber,
                day,
                metricsId: metric.metricsId,
                value: metric.value,
                diff: metric.diff
            }
        });

        const actionMetrics = await MetricsManager.getSavedActionMetricsImpact(metricsData, transaction,uliId);
        const userActionOptionMetricData = actionMetrics.map((actionMetric) => {
            return {
                uliId,
                userActionOptionId: userActionOption.id,
                userMetricsId: actionMetric.id
            };
        });
        // console.log('userActionOptionMetricData',userActionOptionMetricData)
        await actions.saveUserActionOptionsMetricsData(userActionOptionMetricData, transaction);
    }
}

module.exports = Actions;