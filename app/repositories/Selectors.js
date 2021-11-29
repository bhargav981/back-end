const models = require('@models');

class Selectors {

	async getAllSelectors() {
		const selectors = await models.selectors.findAll();

		return selectors;
	}

	async getSelector(id) {
		const selector = await models.selectors.find({
			where: {
				id
			}
		});

		return selector;
	}
}

module.exports = new Selectors();