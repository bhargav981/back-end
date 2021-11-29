const Blockers = require("./../Blockers");
const BlockersRepository = require("@repositories/Blockers");
const Metrics = require("@repositories/Metrics");
const _ = require("lodash");
const utils = require("@utils/Utils");

class MetricsBasedBlockers extends Blockers {

	async checkBlocker(uliId, day, blocker) {
		//get user metrics for the selected blocker's day
		let daySpecificUserMetrics = await Metrics.getRecentUserMetrics(uliId);

		//hash the user metrics array based on metrics id
		daySpecificUserMetrics = _.keyBy(daySpecificUserMetrics, 'metricsId');

		//get metrics conditions for selected blocker
		const blockerMetricsConditions = await BlockersRepository.getBlockerMetricsConditions(
			blocker.blockerId
		);

		let shouldBlockerTrigger = true;

		//check blocker conditions
		blockerMetricsConditions.map(blockerMetricData => {
			let userMetricsData = daySpecificUserMetrics[blockerMetricData.metricsId];

			if (!userMetricsData) {
				shouldBlockerTrigger &= false;
				return blockerMetricData;
			}

			shouldBlockerTrigger &= utils.isOperationCorrect(
				blockerMetricData.operator,
				userMetricsData.value,
				blockerMetricData.value
			);

			return blockerMetricData;
		});

		if (shouldBlockerTrigger && blockerMetricsConditions.length !== 0) {
			return await this.saveAndGetBlockerDetails(uliId, day, blocker);
		}

		return null;
	}

}

module.exports = new MetricsBasedBlockers();