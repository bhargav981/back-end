const Events = require("./../Events");
const EventsRepository = require("@repositories/Events");
const Metrics = require("@repositories/Metrics");
const _ = require("lodash");
const User = require("@utils/User");
const utils = require("@utils/Utils");

class MetricsBasedEvents extends Events {

	async checkEvent(ctx, event) {
		const uliId = await User.getUserId(ctx);
		//get user metrics for the selected event's day
		let daySpecificUserMetrics = await Metrics.getRecentUserMetrics(uliId);

		//hash the user metrics array based on metrics id
		daySpecificUserMetrics = _.keyBy(daySpecificUserMetrics, 'metricsId');

		//get metrics conditions for selected event
		const eventMetricsConditions = await EventsRepository.getEventMetricsConditions(
			event.id
		);

		let shouldEventTrigger = true;

		//check event conditions
		eventMetricsConditions.map(eventMetricData => {
			let userMetricsData = daySpecificUserMetrics[eventMetricData.metricsId];
			
			if (!userMetricsData) {
				shouldEventTrigger &= false;
				return eventMetricData;
			}

			shouldEventTrigger &= utils.isOperationCorrect(
				eventMetricData.operator,
				userMetricsData.value,
				eventMetricData.value
			);

			return eventMetricData;
		});

		if (shouldEventTrigger && eventMetricsConditions.length !== 0) {
			return await this.saveAndGetEventDetails(ctx, event);
		}

		return null;
	}

}

module.exports = new MetricsBasedEvents();