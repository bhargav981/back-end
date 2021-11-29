const BlockersRepository = require('@repositories/Blockers');
const Selectors = require('@repositories/Selectors');
const SelectorsManager = require('@agile/selectors/SelectorsManager');
const MetricsManager = require("@agile/metrics/MetricsManager");
const Metrics = require('@repositories/Metrics');

class Blockers {

	async getBlockerActions(blockerId) {
		return await BlockersRepository.getBlockerActions(blockerId);
	}

	async getBlockerStoriesBasedOnSelector(selectorId, selectorArguments) {
		const selector = await Selectors.getSelector(selectorId);

		return await SelectorsManager.get(selector.name, selectorArguments);
	}

	async saveUserMetrics(userMetricsData, userStoriesBlockersData) {

		const savedUserMetricsIds = await Metrics.saveUserMetricsData(userMetricsData);

		const savedUserStoriesBlockersIds = await BlockersRepository.saveUserStoriesBlockers(userStoriesBlockersData);

		let userStoriesBlockersMetricsData = [];

		savedUserStoriesBlockersIds.map(userStoriesBlockerId => {
			savedUserMetricsIds.map(userMetricsId => {
				userStoriesBlockersMetricsData.push({
					userStoriesBlockerId,
					userMetricsId
				})
			});
		});

		await BlockersRepository.saveUserStoriesBlockersMetricsData(userStoriesBlockersMetricsData);
	}

	async calculateUserStoriesBlockers(uliId, day, blocker, stories) {
		const { blockerId, sprintDay, sprintNumber } = blocker;

		let userStoriesBlockers = [];

		for (let index = 0; index < stories.length; index++) {
			let userStoriesBlocker = {
				uliId,
				blockerId,
				sprintDay,
				sprintNumber,
				day,
				storyId: stories[index],
				status: 1
			}

			userStoriesBlockers.push(userStoriesBlocker);
		}

		return userStoriesBlockers;
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

	async saveAndGetBlockerDetails(uliId, day, blocker) {
		const { blockerId, selectorId } = blocker;

		const selectorArguments = {
			uliId
		};

		const stories = await this.getBlockerStoriesBasedOnSelector(selectorId, selectorArguments);

		const actions = await this.getBlockerActions(blockerId);

		const userStoriesBlockersData = await this.calculateUserStoriesBlockers(uliId, day, blocker, stories);

		let metrics = await MetricsManager.getBlockerMetricsImpact(uliId, blockerId, day, blocker.sprintNumber, blocker.sprintDay);

		const formattedMetrics = await this.addMissingValuesToMetrics(metrics, uliId, day, blocker.sprintNumber, blocker.sprintDay);

		await this.saveUserMetrics(formattedMetrics, userStoriesBlockersData);

		metrics = metrics.map(metric => {
			const finalMetric = {
				...metric,
				metricsId: metric.metricId
			};
			delete finalMetric.metricId;
			return finalMetric;
		});

		return {
			...blocker,
			stories,
			day,
			actions,
			userMetrics: metrics
		};
	}
}

module.exports = Blockers;