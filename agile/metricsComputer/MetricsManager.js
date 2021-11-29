const user = require('@utils/User');
const models = require('@models');
const _ = require("lodash");

class MetricsManager {

	async getEventMetricsImpact(ctx, event) {
		const uliId = await user.getUserId(ctx);

		return [{
				metricsId: 1,
				value: 50,
				day: 10,
				sprintNumber: 2,
				sprintDay: 5,
				uliId
			},
			{
				metricsId: 2,
				value: 60,
				day: 10,
				sprintNumber: 2,
				sprintDay: 5,
				uliId
			}
		];
	}

	
}

module.exports = new MetricsManager();