const models = require('@models');
const Sequelize = require("sequelize");
const Stories = require("@repositories/Stories");
const LoginController = require("@controllers/LoginController");
const UserRepo = require ('@utils/User');

async function getTimerValue(loggedInUserObject){
    if (loggedInUserObject.commonDBGroupStorylineAdditionalParams.time){
        return Number(loggedInUserObject.commonDBGroupStorylineAdditionalParams.time)*60;
    }
        const timer = await models.storylines.find({
            raw: true,
            where: {
                id: loggedInUserObject.storylineID
            }
        });
        return timer.timerValue
}

module.exports = async function (ctx, next) {
        let req = ctx.req;
        let res = ctx.res;
        const transaction = await models.sequelize.transaction();
        const groups = models.groups;
        const loggedInUserObject = ctx.loggedInUserObject;
        const timerValue = await getTimerValue(loggedInUserObject);

        if (!loggedInUserObject){
            return LoginController.logout(ctx);
        }

        let grp = await groups.find({
            raw: true,
            where: {
                id: loggedInUserObject.commonDBGroupID
            }
        });

        if (!grp) {
            const isTimerEnabled = loggedInUserObject.commonDBGroupStorylineAdditionalParams.additionalOptions.includes('isTimerEnabled');
            const isFeedbackEnabled = loggedInUserObject.commonDBGroupStorylineAdditionalParams.additionalOptions.includes('isFeedbackEnabled');
            const isLeaderboardEnabled = loggedInUserObject.commonDBGroupStorylineAdditionalParams.additionalOptions.includes('isLeaderboardEnabled');
            const isFinalReportEnabled = loggedInUserObject.commonDBGroupStorylineAdditionalParams.additionalOptions.includes('isFinalReportEnabled');

            grp = await groups.create({
                id: loggedInUserObject.commonDBGroupID,
                name: loggedInUserObject.commonDBGroupName,
                storylineId: loggedInUserObject.storylineID,
                lang: loggedInUserObject.commonDBGroupStorylineAdditionalParams.lang || 'en_US',
                timerValue: isTimerEnabled ?  timerValue : null,
                isTimerEnabled,
                isFeedbackEnabled,
                isLeaderboardEnabled,
                isFinalReportEnabled
            }, {
                transaction
            })
        }

        let user = await models.users.find({
            where: {
                uliId: loggedInUserObject.userLicenseID
            }
        });

        if (!user) {
            const uliId = loggedInUserObject.userLicenseID;
            await models.users.create({
                uliId,
                groupId: grp.id,
                firstName: loggedInUserObject.firstName,
                lastName: loggedInUserObject.lastName,
                email: loggedInUserObject.emailID
            }, {
                transaction
            })

            // add user stories to the user
            // const storylineId = await UserRepo.getStorylineIdFromGroupId(grp.id);
            const stories = await Stories.getStorylineStories(1);

            await models.user_stories.bulkCreate(stories.map((story) => {
                return {
                    uliId,
                    day: 0,
                    storyId: story.id,
                    progress: 0,
                    status: 1,
                    storyStatus: 1,
                    sprintNumber: 0,
                    sprintDay: 0
                }
            }), {
                returning: true,
                transaction
            })

        }

        let userState = await models.user_state.find({
            where: {
                uliId: loggedInUserObject.userLicenseID
            }
        });

        if (!userState) {
            const uliId = loggedInUserObject.userLicenseID;
            await models.user_state.create({
                uliId,
                isGameStarted: false,
                isGameCompleted: false,
                currentDay: 1,
                currentSprintNumber: 0,
                currentSprintDay: 0,
                timerValue,
                currentSprintState: null,
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE
            }, {
                transaction
            });
        }

        const userTeamMembers = await models.user_team_members.findAll({
            where: {
                uliId: loggedInUserObject.userLicenseID
            },
            raw: true
        });

        if (!userTeamMembers.length) {
            const teamMembers = await models.storyline_team_members.findAll({
                where: {
                    storylineId: 1
                },
                raw: true
            }); //to be fetched storylinewise

            await models.user_team_members.bulkCreate(teamMembers.map((tm) => {
                // console.log(tm)
                return {
                    uliId: loggedInUserObject.userLicenseID,
                    day: 0,
                    sprintNumber: 0,
                    sprintDay: 0,
                    teamMemberId: tm.teamMemberId,
                    skill: tm.skill,
                    morale: tm.morale
                }
            }), {
                returning: true,
                transaction
            });

            // await models.user_team_members.bulkCreate(userTeamMembersData,transaction);
        }
        
        const teamMembers = await models.storyline_team_members.findAll({
            where: {
                storylineId: 1
            },
            raw: true
        });
        
        let skill = teamMembers.reduce((prev, met) => met.skill + prev, 0) / teamMembers.length;
        let morale = teamMembers.reduce((prev, met) => met.morale + prev, 0) / teamMembers.length;


        const userMetric = await models.user_metrics.findAll({
            where: {
                uliId: loggedInUserObject.userLicenseID
            },
            raw: true
        });

        if (!userMetric.length) {
            const metrics = await models.metrics.findAll({
                raw: true
            }); //to be fetched storylinewise

            const storylineMetrics = await models.storyline_metrics.findAll({
                raw: true
            });

            
            const initialMetrics = {
                throughput: storylineMetrics.find(metric => metric.key == 'throughput').initialValue,
                quality: storylineMetrics.find(metric => metric.key == 'quality').initialValue,
                cs: storylineMetrics.find(metric => metric.key == 'cs').initialValue,
                skill,
                morale,
                pa: storylineMetrics.find(metric => metric.key == 'pa').initialValue,
                budget: storylineMetrics.find(metric => metric.key == 'budget').initialValue,
                accuracy: 0,
                efficiency: 0,
                velocity: 0,
                centricity: 0,
                changeAgility: 0,
                dexterity: 0,
                learning: 0,
                agileleader:0
            };

            await models.user_metrics.bulkCreate(metrics.map((m) => {
                return {
                    uliId: loggedInUserObject.userLicenseID,
                    day: 0,
                    sprintNumber: 0,
                    sprintDay: 0,
                    metricsId: m.id,
                    value: initialMetrics[m.key],
                    diff: 0
                }
            }), {
                returning: true,
                transaction
            });
        }

        await transaction.commit()
        await next();
};