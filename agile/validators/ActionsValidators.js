const UserState = require("@repositories/UserState");
const PrdsRepository = require("@repositories/Prds");

class ActionsValidators {

	async checkPRDType(validatorArguments) {
		const { uliId, prdId } = validatorArguments;

		const conditions = {
			uliId
		};

		const orderArray = [
			['id', 'DESC']
		];

		const limit = 1;

		const userPrds = await PrdsRepository.getUserPrdsByConditions(conditions, orderArray, limit);

		if (userPrds.length === 0) {
			return false;
		}

		const userPrdId = userPrds[0].prdId;

		if (userPrdId === prdId) {
			return true;
		}

		return false;
	}

	async checkPRDTypeInequality(validatorArguments) {
		const { uliId, prdId } = validatorArguments;

		const conditions = {
			uliId
		};

		const orderArray = [
			['id', 'DESC']
		];

		const limit = 1;

		const userPrds = await PrdsRepository.getUserPrdsByConditions(conditions, orderArray, limit);

		if (userPrds.length === 0) {
			return true;
		}

		const userPrdId = userPrds[0].prdId;

		if (userPrdId !== prdId) {
			return true;
		}

		return false;
	}

}

module.exports = new ActionsValidators();