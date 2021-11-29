const models = require('@models');

class Customers {

	async getStorylineCustomers(storylineId) {
		let storylineCustomers = await models.storylines.findOne({
			where: {
				id: storylineId
			},
			attributes: [],
			include: [{
				model: models.customers,
				as: 'customers',
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				through: {
					attributes: {
						exclude: ['created_at', 'updated_at']
					}
				}
			}]
		});

		storylineCustomers = await this.formatStorylineCustomers(storylineCustomers);

		return storylineCustomers;
	}

	formatStorylineCustomers(storylineCustomers) {
		return storylineCustomers.get({ plain: true }).customers.map(storylineCustomer => {

			let updatedStorylineCustomer = {
				...storylineCustomer,
				...storylineCustomer.storyline_customers
			}

			delete updatedStorylineCustomer.storyline_customers;

			return updatedStorylineCustomer;
		});
	}
}

module.exports = new Customers();