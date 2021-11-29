const models = require('@models');
const user = require('@utils/User');
const _ = require("lodash");
class Actions {

	async getUserActionOption(uliId, actionOptionId) {
		let daySpecificActions = await models.user_action_options.findAll({
			where: {
				uliId,
				actionOptionId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			order: [
				['day', 'DESC']
			]
		});

		return daySpecificActions;
	}

	async getAction(actionId) {
		const action = await models.actions.find({
			where: {
				id: actionId
			},
			raw: true
		});

		return action;
	}

	async getActionOption(actionOptionId) {
		const actionOption = await models.action_options.find({
			where: {
				id: actionOptionId
			},
			raw: true
		});

		return actionOption;
	}

	async getUserActionOptons(uliId, actionOptionId, transaction){
		const data = await models.user_action_options.findAll({
			where: {
				uliId,
				actionOptionId
			},
			raw: true,
			transaction
		});

		return data;
	}

	async getUserActionOptionsForMessage(uliId, actionOptionId, type,sprintNumber,transaction) {
		// console.log(type)
		if (type == "game") {
			return this.getUserActionOptons(uliId,actionOptionId, transaction);
		} else {
			const data = await models.user_action_options.findAll({
				where: {
					uliId,
					actionOptionId,
					sprintNumber
				},
				raw: true,
				transaction
			});

			return data;
		}
	}

	async getSprintUserActionOptions(uliId, actionOptionId, sprintNumber) {
		const data = await models.user_action_options.findAll({
			where: {
				uliId,
				actionOptionId,
				sprintNumber
			},
			raw: true
		});

		return data;
	}

	async createUserActions(uliId, actionOptionId, sprintDay, sprintNumber, day, message, actionOption, transaction) {
		return await models.user_action_options.create({
			uliId,
			sprintNumber,
			sprintDay,
			day,
			actionOptionId,
			message,
			actionId: actionOption.actionId
		}, {
			transaction
		});
	}

	async getLevelMessages(actionId) {
		const levelMessages = await models.action_option_message_level.findAll({
			where: {
				actionId
			},
			raw: true
		});

		return levelMessages;
	}

	async getRandomPoolMessage(actionOptionId) {
		const poolMessages = await models.action_option_message_pool.findAll({
			where: {
				actionOptionId
			},
			raw: true
		});

		const randomMessage = _.sample(poolMessages);
		return randomMessage;
	}

	async getUserActionOptionByDay(uliId, actionOptionId, sprintDay, sprintNumber, day, transaction) {
		const data = await models.user_action_options.find({
			where: {
				uliId,
				actionOptionId,
				day,
				sprintDay,
				sprintNumber
			},
			transaction,
			raw: true,

		});

		return data;
	}

	async saveUserActionOptionsMetricsData(userActionMetricsData, transaction) {
		await models.user_action_option_metrics.bulkCreate(
			userActionMetricsData, {
				transaction
			}
		);
	}

	async getStorylineActions(storylineId) {
		let storylineActions = await models.storylines.findOne({
			where: {
				id: storylineId
			},
			attributes: [],
			include: [{
				model: models.actions,
				as: 'actions',
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				through: {
					attributes: {
						exclude: ['created_at', 'updated_at', 'storylineId', 'actionId']
					}
				}
			}]
		});

		storylineActions = await this.formatstorylineActions(storylineActions);

		return storylineActions;
	}

	formatstorylineActions(storylineActions) {
		return storylineActions.get({
			plain: true
		}).actions.map(storylineAction => {

			let updatedStorylineAction = {
				...storylineAction,
				...storylineAction.storyline_actions
			}

			delete updatedStorylineAction.storyline_actions;

			return updatedStorylineAction;
		});
	}

	async getStorylineActionOptions(actions) {
		const actionIds = actions.map((action) => action.id);
		const actionOptions = await models.action_options.findAll({
			where: {
				actionId: actionIds
			},
			attributes: {
				exclude: ['created_at', 'updated_at', 'action_id', 'key']
			}
		})
		return actionOptions;
	}



	async getActionInfo(id) {
		let action = await models.action_options.findOne({
			where: {
				id
			},
			include: [{
				model: models.action_option_metrics_impacts,
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				include: [{
					model: models.metrics,
					attributes: {
						exclude: ['created_at', 'updated_at']
					},
					// include: [{
					// 	model: models.storyline_metric_constants,
					// 	attributes: {
					// 		exclude: ['created_at', 'updated_at']
					// 	},
					// 	include: [
					// 		{
					// 			model: models.constants,
					// 			attributes: {
					// 				exclude: ['created_at', 'updated_at']
					// 			},
					// 		},
					// 	]
					// },]
				}]
			}, {
				model: models.storyline_action_option_constants,
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				include: [{
					model: models.constants,
					attributes: {
						exclude: ['created_at', 'updated_at']
					},
				}, ]
			}],
		})


		action = action.get({
			plain: true
		});

		const metrics = action.action_option_metrics_impacts.map((metric) => metric.metricId);

		const metricConstants = await models.storyline_metric_constants.findAll({
			where: {
				metricId: metrics
			},
			include: [{
				model: models.constants,
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
			}, ]
		})
		// return action;
		// return metricConstants;
		const metricMap = _.groupBy(metricConstants, "metricId");
		// return metricMap["1"];
		const data = {
			id: action.id,
			name: action.name,
			description: action.action_option_metrics_impacts.description,
			// sprintCount: action.sprintCount,
			impacts: action.action_option_metrics_impacts.map((impact) => {
				const metricId = impact.metric.id;
				const needed = metricConstants.filter((met) => met.metricId == metricId)
				let obj = {};
				const constants = needed.map((child) => {
					obj[child.constant.abb] = child.value;
				});
				return {
					metricId,
					metricName: impact.metric.name,
					metricKey: impact.metric.key,
					direction: impact.direction,
					sprintCount: impact.sprintCount,
					constants: obj
				}
			})
		}
		let actionConstants = {};
		action.storyline_action_option_constants.map((child) => {
			actionConstants[child.constant.abb] = child.value;
		});


		return {
			...data,
			actionConstants
		};
	}

	async getUserThroughPutCummulative(uliId) {
		return await this.getCummlative(uliId, "throughput")
	}

	async getUserQualityCummulative(uliId) {
		return await this.getCummlative(uliId, "quality")
	}
	async getUserCSummulative(uliId) {
		return await this.getCummlative(uliId, "cs")
	}

	async getCummlative(uliId, cond) {
		const data = await models.user_action_options.findAll({
			where: {
				uliId
			},
			include: [{
				model: models.action_options,
				attributes: {
					exclude: ['created_at', 'updated_at']
				}
			}]

		});
		return data.reduce((perv, action) => {
			console.log(action.action_option[cond], cond)
			return action.action_option[cond] ? perv + action.action_option[cond] : 0
		}, 0)
	}

	async getUserActionOptionsCount(uliId,actionOptionId){
		const data = await models.user_action_options.findAll({
			where:{
				uliId,
				actionOptionId
			},
			raw: true
		});

		return data.length;
	}

	async getUserActionOptionsCountBySprint(uliId,actionOptionId,sprintNumber){
		const data = await models.user_action_options.findAll({
			where:{
				uliId,
				actionOptionId,
				sprintNumber
			},
			raw: true
		});

		return data.length;
	}

	async getUserActionsWithMetrics(uliId) {

		const data = models.user_action_options.findAll({
			where: {
				uliId
			},
			include: [{
				model: models.user_metrics,
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
			}]
		})
		return data.map((action) => {
			return {
				id: action.id,
				day: action.day,
				sprintDay: action.day,
				sprintNumber: action.sprintNumber,
				sprintDay: action.sprintDay,
				actionOptionId: action.actionOptionId,
				message: action.message,
				userMetrics: action.user_metrics.map((metric) => {
					return {
						metricsId: metric.metricsId,
						value: metric.value,
						diff: metric.diff
					}
				})
			}
		});
	}
}

module.exports = new Actions();