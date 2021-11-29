const models = require("@models");
class Utils {
	async createDataInModel(modelName, data, transaction = null) {
		await modelName.create(
			data, {
				transaction
			}
		);
		return;
	}

	async updateDataInModel(modelName, updateData, condition) {
		return await modelName.update(updateData, {
			where: condition
		});
	}

	async getExistingData(modelName, condition) {
		const data = await modelName.findOne({
			where: condition,
			raw: true,
			attributes: {
				exclude: ["created_at", "updated_at"]
			}
		});

		return data;
	}

	async getAllData(modelName) {
		const data = await modelName.findAll({
			raw: true,
			attributes: {
				exclude: ["created_at", "updated_at"]
			}
		});

		return data;
	}

	//two decimal places
	//remove async 
	convertToDecimal(number) {
		return Math.floor(number * 100) / 100;
	}

	convertToPercentage(number) {
		return number * 100;
	}

	getSuccessResponse() {
		return {
			success: true
		}
	}

	findTopMostValueInArray(completeArray, key, value, valueKey, defaultValue) {
		const latestValue = completeArray.find((eachItem) => {
			return eachItem[key] === value
		});
		if (latestValue !== undefined) {
			return latestValue[valueKey];
		}
		return defaultValue;
	}

	getStatusOfUserStory(progress, storyPoint) {
		if (progress == storyPoint) {
			return 4;
		} else if (progress == 0) {
			return 2;
		} else if (progress < storyPoint) {
			return 3;
		}
		return 2;
	}

	isOperationCorrect (operator, value1, value2) {
		switch (operator) {
			case "greaterThanEqualTo":
				if (value1 >= value2) {
					return true;
				}
				return false;

			case "lessThanEqualTo":
				if (value1 <= value2) {
					return true;
				}
				return false;
			
			case "greaterThan":
				if (value1 > value2) {
					return true;
				}
				return false;
				
			case "lessThan":
				if (value1 < value2) {
					return true;
				}
				return false;

			default:
				return false;
		}
	}
}

module.exports = new Utils();