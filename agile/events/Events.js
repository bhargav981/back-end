const user = require('@utils/User');
const Metrics = require('@repositories/Metrics');
const EventsRepository = require('@repositories/Events');
const MetricsManager = require("@agile/metrics/MetricsManager");
const UserState = require("@repositories/UserState");

class Events {

	async saveUserMetrics(ctx, userMetricsData, userEventData) {

		const savedUserMetricsIds = await Metrics.saveUserMetricsData(userMetricsData);

		const savedUserEventId = await EventsRepository.saveUserEventData(userEventData);

		let userEventMetricsData = [];

		savedUserMetricsIds.map(userMetricsId => {
			userEventMetricsData.push({
				userEventId: savedUserEventId,
				userMetricsId
			})
		});

		await EventsRepository.saveUserEventMetricsData(userEventMetricsData);

	}

	async saveAndGetEventDetails(ctx, event) {
		const uliId = await user.getUserId(ctx);

		let currentUserState = await UserState.getUserStateDetails(uliId);
		let day = currentUserState.currentDay;

		let metrics = await this.calculateEventImpact(event, uliId, day);

		const formattedMetrics = await this.addMissingValuesToMetrics(metrics, uliId, day, event.sprintNumber, event.sprintDay);

		const userEventData = await this.calculateUserEventData(event, uliId, day)

		await this.saveUserMetrics(ctx, formattedMetrics, userEventData);

		metrics = metrics.map(metric => {
            const finalMetric =  {
                ...metric,
                metricsId: metric.metricId
            };
            delete finalMetric.metricId;
            return finalMetric;
        });

		return {
			...event,
			day,
			userMetrics: metrics
		}
	}

	async addMissingValuesToMetrics(metrics, uliId, day, sprintNumber, sprintDay) {
		return metrics.map(metric => ({
			...metric,
			uliId,
			day,
			sprintNumber,
			sprintDay
		}));
	}

	async calculateEventImpact(event, uliId, day) {
		return await MetricsManager.getEventMetricsImpact(uliId, event.eventId, day, event.sprintNumber, event.sprintDay);
	}

	async calculateUserEventData(event, uliId, day) {
		return {
			eventId: event.eventId,
			day,
			sprintNumber: event.sprintNumber,
			sprintDay: event.sprintDay,
			uliId
		};
	}
}

module.exports = Events;