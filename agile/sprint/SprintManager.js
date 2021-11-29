const _ = require("lodash");
const user = require('@utils/User');
const utils = require("@utils/Utils");
const models = require("@models");
const UserState = require("@repositories/UserState");
const Stories = require("@repositories/Stories");
const CustomerSpeaks = require("@repositories/CustomerSpeaks");
const ReportSpeaks = require("@repositories/ReportSpeaks");
const Sentry = require('@sentry/node');
const Metrics = require('@repositories/Metrics');
const MetricsManager = require("@agile/metrics/MetricsManager");
const blockersRepo = require("@repositories/Blockers");

class SprintManager {

	/*
		sprintState
		1 : TASK_SELECTION
		2 : PRIORITY_SETTING
		3 : SPRINT_EXECUTION
		4 : SPRINT_COMPLETED
	*/

	async startSprint(ctx) {
		let transaction = null;
		try {

			transaction = await models.sequelize.transaction();

			const uliId = await user.getUserId(ctx);
			const userStateDetails = await UserState.getUserStateDetails(uliId);

			const updatedUserStateData = {
				...userStateDetails,
				currentSprintNumber: userStateDetails.currentSprintNumber + 1,
				currentSprintDay: 1,
				currentSprintState: 1
			}


			const userSprintData = {
				uliId: uliId,
				day: userStateDetails.currentDay,
				sprintNumber: userStateDetails.currentSprintNumber + 1,
				sprintDay: 1
			}

			await models.user_state.update(
				updatedUserStateData, {
					where: {
						uliId
					}
				}, {
					transaction
				}
			);

			await models.user_sprints.create(
				userSprintData, {
					transaction
				}
			);

			await transaction.commit();

			return {
				userState: updatedUserStateData
			}

		} catch (error) {
			Sentry.captureMessage("Sprint couldn't be started" + JSON.stringify(error));
			ctx.throw(400, {
				msg: '',
				error
			});
		}
	}

	async addSprintStories(ctx) {
		let transaction = null;
		try {

			transaction = await models.sequelize.transaction();

			const {
				sprintId,
				userStoryIds
			} = ctx.request.body;
			const uliId = await user.getUserId(ctx);
			const userStateDetails = await UserState.getUserStateDetails(uliId);
			const userStoryProgressDetails = await Stories.getUserStoriesByStoryIds(uliId, userStoryIds);
			const storyDetails = await Stories.getStoriesByUliId(uliId);

			const updatedUserStateData = {
				...userStateDetails,
				currentSprintState: 2
			}

			const userStoryData = userStoryIds.map((eachUserStoryId) => {
				const progress = utils.findTopMostValueInArray(userStoryProgressDetails, 'storyId', eachUserStoryId, 'progress', 0);
				const currentStoryDetails = storyDetails.find((eachStory) => {
					return eachStory.id == eachUserStoryId
				});
				const storyPoint = currentStoryDetails != null
					? currentStoryDetails.storyPoint
					: utils.findTopMostValueInArray(userStoryProgressDetails, 'storyId', eachUserStoryId, 'status', 1);

				return {
					uliId: uliId,
					day: userStateDetails.currentDay,
					sprintNumber: userStateDetails.currentSprintNumber,
					sprintDay: userStateDetails.currentSprintDay,
					storyId: eachUserStoryId,
					progress: progress,
					storyStatus: utils.getStatusOfUserStory(progress, storyPoint),
					storyPriority: null
				};
			});

			await models.user_state.update(
				updatedUserStateData, {
					where: {
						uliId
					}
				}, {
					transaction
				}
			);

			await models.user_stories.bulkCreate(
				userStoryData, {
					transaction
				}
			);

			await transaction.commit();

			return {
				userStories: userStoryData,
				userState: updatedUserStateData
			}

		} catch (error) {
			if(transaction){
                await transaction.rollback();
            }
			Sentry.captureMessage("Stories couldn't be added to sprint" + JSON.stringify(error));
			ctx.throw(400, {
				msg: '',
				error
			});
		}
	}

	async addPriorityForTasks(ctx) {
		let transaction = null;
		try {

			transaction = await models.sequelize.transaction();

			const {
				sprintId,
				userStoryPriorityList
			} = ctx.request.body;
			const uliId = await user.getUserId(ctx);
			const userStateDetails = await UserState.getUserStateDetails(uliId);
			const userStoryIds = userStoryPriorityList.map((eachUserStory) => {
				return eachUserStory.storyId;
			});
			const storyDetails = await Stories.getStoriesByUliId(uliId);


			const updatedUserStateData = {
				...userStateDetails,
				currentSprintNumber: userStateDetails.currentSprintNumber,
				currentSprintDay: userStateDetails.currentSprintDay + 1,
				currentDay: userStateDetails.currentDay + 1,
				currentSprintState: 3
			}

			const userStoryProgressDetails = await Stories.getUserStoriesByStoryIds(uliId, userStoryIds);

			const userStoryData = [];
			userStoryPriorityList.map((eachUserStoryPriority) => {
				if (eachUserStoryPriority.priorityId != null) {

					const progress = utils.findTopMostValueInArray(userStoryProgressDetails, 'storyId', eachUserStoryPriority.storyId, 'progress', 0);

					const currentStoryDetails = storyDetails.find((eachStory) => {
						return eachStory.id == eachUserStoryPriority.storyId
					});
					const storyPoint = currentStoryDetails != null
						? currentStoryDetails.storyPoint
						: utils.findTopMostValueInArray(userStoryProgressDetails, 'storyId', eachUserStoryPriority.storyId, 'status', 1);

					userStoryData.push({
						uliId: uliId,
						day: userStateDetails.currentDay,
						sprintNumber: userStateDetails.currentSprintNumber,
						sprintDay: userStateDetails.currentSprintDay,
						storyId: eachUserStoryPriority.storyId,
						progress: progress,
						storyStatus: utils.getStatusOfUserStory(progress, storyPoint),
						storyPriority: eachUserStoryPriority.priorityId
					});
				}
			});

			await models.user_state.update(
				updatedUserStateData, {
					where: {
						uliId
					}
				}, {
					transaction
				}
			);

			await models.user_stories.bulkCreate(
				userStoryData, {
					transaction
				}
			);


			await transaction.commit();

			return {
				userState: updatedUserStateData,
				userStories: userStoryData
			}

		} catch (error) {
			if(transaction){
                await transaction.rollback();
            }
			Sentry.captureMessage("Story priorities couldn't be started" + JSON.stringify(error));
			ctx.throw(400, {
				msg: '',
				error
			});
		}
	}

	async endSprint(ctx) {
		let transaction = null;
		try {

			transaction = await models.sequelize.transaction();
			
			const uliId = await user.getUserId(ctx);		
			const launchingProduct = ctx.request.body.launchingProduct != null ? ctx.request.body.launchingProduct : false;
			const storylineId = await user.getStorylineId(uliId);
			const userStateDetails = await UserState.getUserStateDetails(uliId);

			const userStoryDetails = await Stories.getUserStoriesByUliId(uliId);
			const groupedUserStoryDetails = _.groupBy(userStoryDetails, 'storyId');
			const storyDetails = await Stories.getStoriesByUliId(uliId);

			const sprintDay = userStateDetails.currentSprintDay;
			const day = userStateDetails.currentDay;
			const sprintNumber = userStateDetails.currentSprintNumber;

			await MetricsManager.calculateActionOptionAI(uliId, sprintNumber, transaction);


			if(sprintNumber == 0) {
				await models.user_state.update(
					{
						//...userStateDetails,
						currentSprintState: 4
					}, {
						where: {
							uliId
						}
					}, {
						transaction
					}
				);
				return {
					userState: {
						...userStateDetails,
						currentSprintState: 4,
						currentPhaseId: 2
					}
				};
			}

			await MetricsManager.calculateAccuracy(uliId, transaction, sprintDay, sprintNumber, day);
			await MetricsManager.calculateVelocity(uliId, transaction, sprintDay, sprintNumber, day);
			await MetricsManager.calculateEfficiency(uliId, transaction, sprintDay, sprintNumber, day);
			
			const actionOptionImpact = await models.user_action_option_impact_sprint_values.findAll({
				where:{
					uliId
				},
				raw: true,
				transaction
			});

			await MetricsManager.calculateCustomerCentricity(uliId, transaction, sprintDay, sprintNumber, day,actionOptionImpact);
			await MetricsManager.calculateChangeAgility(uliId, transaction, sprintDay, sprintNumber, day,actionOptionImpact);
			await MetricsManager.calculateTalentDexterity(uliId, transaction, sprintDay, sprintNumber, day,actionOptionImpact);
			await MetricsManager.calculateContinuosLearning(uliId, transaction, sprintDay, sprintNumber, day,actionOptionImpact);
			await MetricsManager.calculateAgileLedaershipScore(uliId, transaction, sprintDay, sprintNumber, day,actionOptionImpact);


			const allMetrics = await Metrics.getStorylineMetrics(storylineId);
			const allUserMetrics = await Metrics.getAllUserMetrics(uliId);

			let customerSpeaks = await CustomerSpeaks.getStorylineCustomerSpeaks(storylineId);
			customerSpeaks = _.groupBy(customerSpeaks, 'sprintNumber');
			let reportSpeaks = await ReportSpeaks.getStorylineReportSpeaks(storylineId);
			reportSpeaks = _.groupBy(reportSpeaks, 'sprintNumber');

			const updatedUserStateData = {
				//...userStateDetails,
				currentSprintState: 4,
				currentDay: userStateDetails.currentSprintDay < 11 && userStateDetails.currentSprintState != 4 && launchingProduct === false
					? userStateDetails.currentDay + (11 - userStateDetails.currentSprintDay)
					: userStateDetails.currentDay
			};

			const toBeBacklogedData = [];

			Object.keys(groupedUserStoryDetails).map((eachStoryId) => {

				const eachUserStoryData = groupedUserStoryDetails[eachStoryId][0];
				if (
					eachUserStoryData.storyStatus !== 4
					&& eachUserStoryData.sprintNumber === userStateDetails.currentSprintNumber
				) {
					toBeBacklogedData.push({
						uliId: uliId,
						day: userStateDetails.currentDay,
						sprintNumber: userStateDetails.currentSprintNumber,
						sprintDay: userStateDetails.currentSprintDay,
						storyId: eachUserStoryData.storyId,
						progress: eachUserStoryData.progress,
						storyPriority: null,
						storyStatus: 1
					});
				}

			});


			await models.user_state.update(
				updatedUserStateData, {
					where: {
						uliId
					}
				}, {
					transaction
				}
			);

			await models.user_stories.bulkCreate(
				toBeBacklogedData, {
					transaction
				}
			);


			await transaction.commit();

			return {
				userState: updatedUserStateData,
				userStories: toBeBacklogedData,
				sprintReport: await this.getSprintReport(
					userStateDetails.currentSprintNumber,
					storyDetails,
					groupedUserStoryDetails,
					customerSpeaks,
					reportSpeaks,
					allMetrics,
					allUserMetrics
				)
			};

		} catch (error) {
			if(transaction){
                await transaction.rollback();
            }
			Sentry.captureMessage("Sprint couldn't be ended" + JSON.stringify(error));
			ctx.throw(400, {
				msg: '',
				error
			});
		}

	}

	async replanSprint(ctx, transaction) {

		try {

			// const transaction = await models.sequelize.transaction();

			const uliId = await user.getUserId(ctx);
			const userStateDetails = await UserState.getUserStateDetails(uliId);

			const userStoryDetails = await Stories.getUserStoriesByUliId(uliId);
			const groupedUserStoryDetails = _.groupBy(userStoryDetails, 'storyId');

			const updatedUserStateData = {
				...userStateDetails,
				currentSprintState: 1
			};

			const toBeBacklogedData = [];

			Object.keys(groupedUserStoryDetails).map((eachStoryId) => {

				const eachUserStoryData = groupedUserStoryDetails[eachStoryId][0];
				if (
					eachUserStoryData.storyStatus !== 4
					&& eachUserStoryData.sprintNumber === userStateDetails.currentSprintNumber
				) {
					toBeBacklogedData.push({
						uliId: uliId,
						day: userStateDetails.currentDay,
						sprintNumber: userStateDetails.currentSprintNumber,
						sprintDay: userStateDetails.currentSprintDay,
						storyId: eachUserStoryData.storyId,
						progress: eachUserStoryData.progress,
						storyPriority: null,
						storyStatus: 1
					});
				}
			});

			await models.user_state.update(
				updatedUserStateData, {
					where: {
						uliId
					}
				}, {
					transaction
				}
			);

			await models.user_stories.bulkCreate(
				toBeBacklogedData, {
					transaction
				}
			);


			//await transaction.commit();

			const userStoriesWithBlockers = await blockersRepo.getStoriesBlockers(uliId, toBeBacklogedData, transaction);

			return {
				userState: updatedUserStateData,
				userStories: userStoriesWithBlockers
			};

		} catch (error) {
			Sentry.captureMessage("Sprint couldn't be ended" + JSON.stringify(error));
			ctx.throw(400, {
				msg: '',
				error
			});
		}


	}


	async getSprintReport(sprintNumber, storyDetails, groupedUserStoryDetails, customerSpeaks, reportSpeaks, allMetrics, allUserMetrics) {

		const reportStoriesList = [];

		let firstSprintDay = -1;

		Object.keys(groupedUserStoryDetails).map((eachStoryId) => {

			const eachFirstDayReportUserStoryData = groupedUserStoryDetails[eachStoryId].find((eachStory) => {
				return (
					eachStory.sprintDay === 1
					&& eachStory.sprintNumber === sprintNumber
				)
			});

			if(eachFirstDayReportUserStoryData != null) {
				if(firstSprintDay == -1 || firstSprintDay > eachFirstDayReportUserStoryData.day) {
					firstSprintDay = eachFirstDayReportUserStoryData.day;
				}
			}

			const eachReportUserStoryData = groupedUserStoryDetails[eachStoryId].find((eachStory) => {
				return (
					eachStory.sprintDay <= 11
					&& eachStory.sprintNumber === sprintNumber
					&& eachStory.storyPriority != null
				);
			});

			if (eachReportUserStoryData != null) {
				const currentStoryDetails = storyDetails.find((eachStory) => {
					return eachStory.id == eachReportUserStoryData.storyId
				});
				reportStoriesList.push(
					{
						...eachReportUserStoryData.get({ plain: true }),
						storyStatus: utils.getStatusOfUserStory(eachReportUserStoryData.progress, currentStoryDetails.storyPoint)
					}
				);
			} else {
				const eachReportUserStoryData = groupedUserStoryDetails[eachStoryId].find((eachStory) => {
					return (
						eachStory.sprintDay < 11
						&& eachStory.sprintNumber === sprintNumber
					);
				});

				if (eachReportUserStoryData != null) {
					const currentStoryDetails = storyDetails.find((eachStory) => {
						return eachStory.id == eachReportUserStoryData.storyId
					});
					reportStoriesList.push(
						{
							...eachReportUserStoryData.get({ plain: true }),
							storyStatus: utils.getStatusOfUserStory(eachReportUserStoryData.progress, currentStoryDetails.storyPoint)
						}
					);
				}
			}

		});

		let sprintCustomerSpeak = [];
		let maxSprintNumberForCustomerSpeak = 0;

		Object.keys(customerSpeaks).map((eachSprintNumber) => {
			if (eachSprintNumber == sprintNumber) {
				sprintCustomerSpeak = customerSpeaks[eachSprintNumber];
			}
			if (maxSprintNumberForCustomerSpeak <= eachSprintNumber) {
				maxSprintNumberForCustomerSpeak = eachSprintNumber
			}
		});

		if (sprintCustomerSpeak.length === 0) {
			sprintCustomerSpeak = customerSpeaks[maxSprintNumberForCustomerSpeak];
		}

		let reportMetrics = [];
		let reportSpeakMessageArray = [];
		const groupedUserMetrics = _.groupBy(allUserMetrics, 'metricsId');

		allMetrics.map((eachMetric) => {

			let sprintUserMetricData = groupedUserMetrics[eachMetric.metricsId].find((eachUserMetric) => {
				return (
					eachUserMetric.sprintDay <= 11
					&& eachUserMetric.sprintNumber === sprintNumber
				);
			});

			if (sprintUserMetricData == null) {
				sprintUserMetricData = groupedUserMetrics[eachMetric.metricsId].find((eachUserMetric) => {
					return (
						eachUserMetric.sprintDay <= 11
						&& eachUserMetric.sprintNumber < sprintNumber
					);
				});
			}

			const previousLatestUserMetricData = groupedUserMetrics[eachMetric.metricsId].find((eachUserMetric) => {
				return (
					eachUserMetric.sprintDay <= 11
					&& eachUserMetric.sprintNumber < sprintNumber
				);
			});


			const currentSprintMetricValue = sprintUserMetricData != null ? sprintUserMetricData.value : 0;
			const previousSprintMetricValue = previousLatestUserMetricData != null ? previousLatestUserMetricData.value : 0;
			const changeInMetricValue = currentSprintMetricValue - previousSprintMetricValue;

			reportMetrics.push({
				metricsId: eachMetric.metricsId,
				currentSprintValue: currentSprintMetricValue,
				previousSprintValue: previousSprintMetricValue,
				changeInMetricValue: changeInMetricValue
			});


			let maximumSprintNumberForReportSpeak = 0;
			Object.keys(reportSpeaks).map((eachSprintNumber) => {
				if (maximumSprintNumberForReportSpeak <= eachSprintNumber) {
					maximumSprintNumberForReportSpeak = eachSprintNumber
				}
			});

			if (sprintNumber <= maximumSprintNumberForReportSpeak) {
				reportSpeaks[sprintNumber].map((eachSpeak) => {
					if (eachSpeak.metricId == eachMetric.metricsId) {
						if (eachSpeak.metricChange < 0 && changeInMetricValue < 0) {
							reportSpeakMessageArray.push({
								metricId: eachSpeak.metricId,
								metricMessage: eachSpeak.message
							});
						} else if (eachSpeak.metricChange > 0 && changeInMetricValue > 0) {
							reportSpeakMessageArray.push({
								metricId: eachSpeak.metricId,
								metricMessage: eachSpeak.message
							});
						}
					}
				});
			} else {
				reportSpeaks[maximumSprintNumberForReportSpeak].map((eachSpeak) => {
					if (eachSpeak.metricId == eachMetric.metricsId) {
						if (eachSpeak.metricChange < 0 && changeInMetricValue < 0) {
							reportSpeakMessageArray.push({
								metricId: eachSpeak.metricId,
								metricMessage: eachSpeak.message
							});
						} else if (eachSpeak.metricChange > 0 && changeInMetricValue > 0) {
							reportSpeakMessageArray.push({
								metricId: eachSpeak.metricId,
								metricMessage: eachSpeak.message
							});
						}
					}
				});
			}


		});

		let lastSprintDay = 0;
		reportStoriesList.map((eachStory) => {
			if(eachStory.day >= lastSprintDay && eachStory.sprintDay == 11) {
				lastSprintDay = eachStory.day - 1;
			} else if (eachStory.day >= lastSprintDay && eachStory.sprintDay < 11) {
				lastSprintDay = eachStory.day;
			}
		});

		return {
			reportStories: reportStoriesList,
			sprintNumber: sprintNumber,
			customerSpeak: sprintCustomerSpeak,
			reportMetrics: reportMetrics,
			// day: reportStoriesList.length ? reportStoriesList[0].day : 0,
			day: lastSprintDay,
			firstSprintDay: firstSprintDay,
			reportSpeak: {
				heading: 'label_report_speak_heading',
				reportSpeakMessageArray: reportSpeakMessageArray
			}
		};

	}
}

module.exports = new SprintManager();