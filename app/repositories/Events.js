const models = require('@models');

class Events {

	async getDaySpecificEvents(storylineId, sprintNumber, sprintDay) {
		let daySpecificEvents = await models.storyline_events.findAll({
			where: {
				storylineId,
				sprintNumber,
				sprintDay
			},
			include: [{
				model: models.events,
				attributes: {
					exclude: ['created_at', 'updated_at']
				}
			}],
			attributes: {
				exclude: ['created_at', 'updated_at']
			}
		});

		daySpecificEvents = daySpecificEvents.map(daySpecificEvent => {
			daySpecificEvent = daySpecificEvent.get({
				plain: true
			});

			let updatedDaySpecificEvent = {
				...daySpecificEvent,
				name: daySpecificEvent.event.name,
				description: daySpecificEvent.event.description
			}

			delete updatedDaySpecificEvent.event;

			return updatedDaySpecificEvent;
		});

		return daySpecificEvents;
	}

	async getEventMetricsConditions(eventId) {
		let eventMetricsConditions = await models.events_metrics_conditions.findAll({
			where: {
				eventId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			}
		});

		return eventMetricsConditions;
	}

	async getEventActionsConditions(eventId) {
		let eventActionsConditions = await models.events_actions_conditions.findAll({
			where: {
				eventId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			}
		});

		return eventActionsConditions;
	}

	async saveUserEventData(userEventData) {
		let savedUserEventId = null;

		await models.user_events.create(
			userEventData, {
				returning: true
			}
		).then((result) => {
			savedUserEventId = result.id;
		});

		return savedUserEventId;
	}

	async saveUserEventMetricsData(userEventMetricsData) {
		await models.user_events_metrics.bulkCreate(
			userEventMetricsData
		);
	}

	async getEventInfo(id) {
		let event = await models.events.findOne({
			where: {
				id
			},
			include: [{
				model: models.event_metric_impacts,
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
				model: models.storyline_event_constants,
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

		event = event.get({
			plain: true
		});
		// return event;
		let value = {
			id: event.id,
			name: event.name,
			// description: event.description,
			impacts: event.impacts.map((impact) => {
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
		let eventConstants = {};
		event.storyline_event_constants.map((child) => {
			eventConstants[child.constant.abb] = child.value;
		});
		return {
			...value,
			eventConstants
		};

	}


	async getUserEventsWithMetrics(uliId) {

		const data = models.user_events.findAll({
			where: {
				uliId
			},
			include: [{
				model: models.user_metrics,
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
			}, {
				model: models.events,
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
			}]
		})
		
		return data.map((action) => {
			return {
				id: action.id,
				sprintDay: action.sprintDay,
				day: action.day,
				sprintNumber: action.sprintNumber,
				eventId: action.eventId,
				name: action.event.name,
				description: action.event.description,
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



	async getEventsTa(uliId) {
		const data = await models.user_events.findAll({
			where: {
				uliId
			},
			include: [{
				model: models.events,
				attributes: {
					exclude: ['created_at', 'updated_at']
				}
			}]
		});

		const d =  data.reduce((perv, action) => {
			return perv + action.event.ta
		}, 0)
		return d;
	}

}

module.exports = new Events();