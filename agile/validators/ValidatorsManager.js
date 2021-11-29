const ActionsValidators = require("@agile/validators/ActionsValidators");

class ValidatorsManager {

	async validate(type, validatorArguments) {
		switch (type) {
			case 'checkPRDType':
				return ActionsValidators.checkPRDType(validatorArguments);

			case 'checkPRDTypeInequality':
				return ActionsValidators.checkPRDTypeInequality(validatorArguments);

			default:
				return false;
		}
	}

}

module.exports = new ValidatorsManager();