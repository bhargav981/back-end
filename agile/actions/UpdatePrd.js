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
const TeamMembers = require("@repositories/TeamMembers");

class UpdatePrd extends ActionsParent {

    async saveUserPrd(uliId, prdId, day, transaction) {
        await Prds.saveUserPrdForPrdAction(uliId, prdId, day, transaction);
    }

    async getPrd(prdId, storylineId){
        const prd = await models.storyline_prds.findOne({
            where:{
                prdId,
                storylineId
            },
            raw: true
        });

        return prd;

    }
    async getCurrentDay(day, prd) {       

        const currentDay = day + prd.effort;
        return currentDay;
    }

    async getCurrentSprintDay(sprintDay, prd) {
        let currentSprintDay = sprintDay + prd.effort;
        if (currentSprintDay > 10) {
            return 10;
        }
        return currentSprintDay;
    }

    async getPRDEffort(prd) {
        return prd.effort;
    }

    async getResponse(ctx) {
        let transaction = null;
        try {
            const uliId = await user.getUserId(ctx);
            const {
                actionOptionId,
                prdId
            } = ctx.request.body;

            let currentUserState = await UserState.getUserStateDetails(uliId);

            let day = currentUserState.currentDay;
            let sprintNumber = currentUserState.currentSprintNumber;
            let sprintDay = currentUserState.currentSprintDay;

            const actionCanBeTaken = await actionUtils.checkIfActionCanBeTaken(uliId, actionOptionId, sprintNumber, day);

            if (actionCanBeTaken) {
                transaction = await models.sequelize.transaction();


                const actionOption = await actions.getActionOption(actionOptionId);

                await this.resolveBlocker(uliId, actionOption, transaction);

                const userActionOption = await this.saveUserActions(actionOptionId, sprintDay, sprintNumber, day, uliId, actionOption, transaction);
              //  const budget = await MetricsManager.updateBudget(actionOption, uliId, transaction, sprintDay, sprintNumber, day);


                const storylineId = await user.getStorylineId(uliId);
                const prd = await this.getPrd(prdId, storylineId);
                //logic to update day, sprint number and sprint day
                let updatedDay = await this.getCurrentDay(day, prd);
                let updatedSprintNumber = sprintNumber;
                let updatedSprintDay = await this.getCurrentSprintDay(sprintDay, prd);

                if (updatedSprintDay > 11) {
                    ctx.throw(400, {
                        msg: 'Action can\'t be taken as the action duration exceeds sprint end'
                    });
                    return;
                }

                const prdEffort = await this.getPRDEffort(prdId, storylineId);
                const prdCost = prd.cost;

                await this.saveUserPrd(uliId, prdId, day, transaction);
                const events = this.getEvents(ctx, sprintNumber, sprintDay, prdEffort);
                const blockers = await this.getBlockers(uliId, day, sprintNumber, sprintDay, prdEffort);

                const count = await actionUtils.getUserActionOptionsLength(uliId, actionOption.actionId, "sprint", sprintNumber, transaction);
                const metrics = await this.getMetrics(uliId, actionOptionId, day, sprintNumber, sprintDay, count);

                const saveUserActionOptionMetrics = await this.saveUserActionOptionMetrics(uliId, sprintDay, sprintNumber, day, actionOptionId, userActionOption, metrics, transaction);
                const storiesProgress = progression.makeProgression(sprintNumber, uliId, transaction, updatedDay, updatedSprintNumber, updatedSprintDay);
                //   const storiesProgressWithBlockers = blockersRepo.getStoriesBlockers(uliId,storiesProgress);
                await this.calculateMetricsImpact(actionOptionId, actionOption,uliId,transaction,sprintDay,sprintNumber,day);
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
                        message: userActionOption.message,
                        userMetrics: metrics,
                    },
                    events: await events,
                    blockers: blockers,
                    userStories: await storiesProgress,
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

module.exports = new UpdatePrd();