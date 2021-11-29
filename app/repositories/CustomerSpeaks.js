const models = require('@models');

class CustomerSpeaks {

	async getStorylineCustomerSpeaks(storylineId) {
		let storylineCustomerSpeaks = await models.customer_speaks.findAll({
			where: {
				storylineId: storylineId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			}
		});

		return storylineCustomerSpeaks;
	}

}

module.exports = new CustomerSpeaks();