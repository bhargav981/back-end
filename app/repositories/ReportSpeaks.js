const models = require('@models');

class ReportSpeaks {

	async getStorylineReportSpeaks(storylineId) {
		let storylineReportSpeaks = await models.report_speaks.findAll({
			where: {
				storylineId: storylineId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			}
		});

		return storylineReportSpeaks;
	}

}

module.exports = new ReportSpeaks();