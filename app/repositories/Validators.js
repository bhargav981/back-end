const models = require('@models');

class Validators {

	async getAllValidators() {
		const validators = await models.validators.findAll();

		return validators;
	}

	async getValidator(id) {
		const validator = await models.validators.find({
			where: {
				id
			}
		});

		return validator;
	}
}

module.exports = new Validators();