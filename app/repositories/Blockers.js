const models = require('@models');
const _ = require("lodash");

class Blockers {

	async getDaySpecificBlockers(storylineId, sprintNumber, sprintDay) {
		let daySpecificBlockers = await models.storyline_blockers.findAll({
			where: {
				storylineId,
				sprintNumber,
				sprintDay
			},
			include: [{
				model: models.blockers,
				attributes: {
					exclude: ['created_at', 'updated_at']
				}
			}],
			attributes: {
				exclude: ['created_at', 'updated_at']
			}
		});

		daySpecificBlockers = daySpecificBlockers.map(daySpecificBlocker => {
			daySpecificBlocker = daySpecificBlocker.get({
				plain: true
			});

			let updatedDaySpecificBlocker = {
				...daySpecificBlocker,
				name: daySpecificBlocker.blocker.name,
				description: daySpecificBlocker.blocker.description
			}

			delete updatedDaySpecificBlocker.blocker;

			return updatedDaySpecificBlocker;
		});

		return daySpecificBlockers;
	}

	async getBlockerMetricsConditions(blockerId) {
		let blockerMetricsConditions = await models.blockers_metrics_conditions.findAll({
			where: {
				blockerId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			}
		});

		return blockerMetricsConditions;
	}

	async getBlockerActionsConditions(blockerId) {
		let blockerActionsConditions = await models.blockers_actions_conditions.findAll({
			where: {
				blockerId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			}
		});

		return blockerActionsConditions;
	}

	async getAllBlockersActions() {
		let blockersActions = await models.blocker_actions.findAll({
			attributes: {
				exclude: ['created_at', 'updated_at']
			}
		});

		return blockersActions;
	}

	async getBlockerActions(blockerId) {
		let blockerActions = await models.blocker_actions.findAll({
			where: {
				blockerId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			}
		});

		return blockerActions;
	}

	async saveUserStoriesBlockers(userStoriesBlockers) {
		let savedUserStoriesBlockersIds = [];

		await models.user_stories_blockers.bulkCreate(
			userStoriesBlockers, {
				returning: true
			}
		).then((result) => {
			result.map(data => {
				savedUserStoriesBlockersIds.push(data.id);
			});
		});

		return savedUserStoriesBlockersIds;
	}

	async getUserBlockers(uliId) {
		let userBlockers = await models.user_stories_blockers.findAll({
			where: {
				uliId
			},
			include: [{
				model: models.blockers,
				attributes: {
					exclude: ['created_at', 'updated_at']
				}
			}],
			attributes: {
				exclude: ['created_at', 'updated_at']
			}
		});

		userBlockers = _(userBlockers)
			.orderBy(["id"], ["desc"])
			.groupBy("blockerId")
			.values()
			.map(groups => groups[0])
			.orderBy(["blockerId"], ["desc"])
			.value();

		let updatedUserBlockers = [];

		userBlockers.map(userBlocker => {
			userBlocker = userBlocker.get({ plain: true });
			let updatedUserBlocker = {
				...userBlocker,
				...userBlocker.blocker
			};

			delete updatedUserBlocker.blocker;
			delete updatedUserBlocker.storyId;

			updatedUserBlockers.push(updatedUserBlocker)
		});

		return updatedUserBlockers;
	}


	async resolveBlocker(uliId, actionId, transaction) {

		const blockers = await models.blocker_actions.findAll({
			where: {
				actionId
			},
			raw: true
		});


		const blockerIds = _.map(blockers, 'blockerId');

		await models.user_stories_blockers.update({
			status: 0
		}, {
				where: {
					uliId,
					blockerId: blockerIds
				},
				transaction
			});
	}

	async getStoriesBlockers(uliId, userStories, transaction) {
		let storiesBlockers = await models.user_stories_blockers.findAll({
			where: {
				uliId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			raw: true,
			transaction
		});

		storiesBlockers = _(storiesBlockers)
			.chain()
			.orderBy(["id"], ["desc"])
			.groupBy("storyId")
			.values()
			.map(groups => groups[0])
			.orderBy(["storyId"], ["desc"])
			.value();

		const blockerStories = userStories.map((userStory) => {
			const blocker = storiesBlockers.find(sb => sb.storyId == userStory.storyId && sb.status == 1);
			return {
				...userStory,
				blockerId: blocker ? blocker.blockerId : null
			}
		});

		return blockerStories;
	}

	async getUserActiveBlockers(uliId) {
		let userActiveBlockers = await models.user_stories_blockers.findAll({
			where: {
				uliId,
				status: 1
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			}
		});

		return userActiveBlockers;
	}


	async getBlockerInfo(id) {
		let blocker = await models.blockers.findOne({
			where: {
				id
			},
			include: [{
				model: models.blocker_metric_impacts,
				as: "impacts",
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				include: [{
					model: models.metrics,
					attributes: {
						exclude: ['created_at', 'updated_at']
					},
					include: [{
						model: models.storyline_metric_constants,
						attributes: {
							exclude: ['created_at', 'updated_at']
						},
						include: [
							{
								model: models.constants,
								attributes: {
									exclude: ['created_at', 'updated_at']
								},
							},
						]
					},]
				}]
			}, {
				model: models.storyline_blocker_constants,
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				include: [
					{
						model: models.constants,
						attributes: {
							exclude: ['created_at', 'updated_at']
						},
					},
				]
			}],
		})

		blocker = blocker.get({
			plain: true
		});
		// return blocker;
		let value = {
			id: blocker.id,
			name: blocker.name,
			// description: blocker.description,
			impacts: blocker.impacts.map((impact) => {
				let obj = {};
				impact.metric.storyline_metric_constants.map((child) => {
					obj[child.constant.abb] = child.value;
				});
				return {
					metricId: impact.metric.id,
					metricName: impact.metric.name,
					metricKey: impact.metric.key,
					direction: impact.direction,
					constants: obj
				}
			})
		}
		let blockerConstants = {};
		blocker.storyline_blocker_constants.map((child) => {
			blockerConstants[child.constant.abb] = child.value;
		});
		return {
			...value,
			blockerConstants
		};
	}

	async saveUserStoriesBlockersMetricsData(userStoriesBlockersMetricsData) {
		await models.user_stories_blockers_metrics.bulkCreate(
			userStoriesBlockersMetricsData
		);
	}
}

module.exports = new Blockers();