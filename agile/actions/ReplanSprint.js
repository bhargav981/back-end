
const ActionsParent = require("./Actions");
const Prds = require('@repositories/Prds');
const actions = require("@repositories/Actions");
const Sentry = require('@sentry/node');

const actionUtils = require("./ActionUtils");
const models = require('@models');
const user = require("@utils/User");
const progression = require('@agile/stories/progression');

const UserState = require("@repositories/UserState");
const MetricsManager = require("@agile/metrics/MetricsManager");

const SprintManager = require("@agile/sprint/SprintManager");

const TeamMembers = require("@repositories/TeamMembers");

class ReplanSprint extends ActionsParent{    
    async getResponse(ctx) {
        let transaction = null;
        try {
            const uliId = await user.getUserId(ctx);
            const {
                actionOptionId
            } = ctx.request.body;
      

            let currentUserState = await UserState.getUserStateDetails(uliId);

            let day = currentUserState.currentDay;
            let sprintNumber = currentUserState.currentSprintNumber;
            let sprintDay = currentUserState.currentSprintDay;

            const actionCanBeTaken = await actionUtils.checkIfActionCanBeTaken(uliId, actionOptionId, sprintNumber, day);

            if (actionCanBeTaken) {
                transaction = await models.sequelize.transaction();    

                const replanned = await SprintManager.replanSprint(ctx, transaction);

                const actionOption = await actions.getActionOption(actionOptionId);

                await this.resolveBlocker(uliId, actionOption, transaction);

                const userActionOption = await this.saveUserActions(actionOptionId, sprintDay, sprintNumber, day, uliId, actionOption, transaction);

                const actionOptionEffort = actionOption.effort;

                //logic to update day, sprint number and sprint day
                let updatedDay = day + actionOptionEffort;
                let updatedSprintNumber = sprintNumber;
                let updatedSprintDay = sprintDay + actionOptionEffort;

                if (updatedSprintDay > 11) {
                    ctx.throw(400, {
                        msg: 'Action can\'t be taken as the action duration exceeds sprint end'
                    });
                    return;
                }

                const events = this.getEvents(ctx, sprintNumber, sprintDay, actionOptionEffort);
                const blockers = await this.getBlockers(uliId, day, sprintNumber, sprintDay, actionOptionEffort);

                const count = await actionUtils.getUserActionOptionsLength(uliId, actionOption.actionId, "sprint", sprintNumber, transaction)
                const metrics = await this.getMetrics(uliId, actionOptionId, day, sprintNumber, sprintDay, count);

                const saveUserActionOptionMetrics = await this.saveUserActionOptionMetrics(uliId, sprintDay, sprintNumber, day, actionOptionId, userActionOption, metrics, transaction);

                const budget = await MetricsManager.updateBudget(actionOption.cost, uliId, transaction, sprintDay, sprintNumber, day);
                const cs = await MetricsManager.calculateCS(actionOptionId, uliId, transaction, sprintDay, sprintNumber, day);
                const pa = await MetricsManager.calculatePA(uliId, transaction, sprintDay, sprintNumber, day);

                await transaction.commit();

                const latestUserMetrics = await MetricsManager.getLatestMetrics(uliId);
                const userTeamMembers = await TeamMembers.getTeamMembersMetrics(uliId);
                const budgetMetric = latestUserMetrics.find(metrics => metrics.metricsId === 7);
                const csMetric = latestUserMetrics.find(metrics => metrics.metricsId === 5);
                metrics.push(budgetMetric);
                metrics.push(csMetric);

                await UserState.updateField({
                    currentDay: updatedDay,
                    currentSprintNumber: updatedSprintNumber,
                    currentSprintDay: updatedSprintDay
                }, {
                    uliId
                });


                return {
                    actionResponse: {
                        day,
                        sprintDay,
                        sprintNumber,
                        actionOptionId,
                        message: userActionOption.message || null,
                        userMetrics: metrics
                    },
                    events: await events,
                    blockers: blockers,
                    userStories: replanned.userStories,
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

}

module.exports = new ReplanSprint();