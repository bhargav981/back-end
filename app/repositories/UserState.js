const models = require('@models');
const utils= require('@utils/Utils');
class Stories {

	async getAllUsersStateDetails(uliIds){
		const usersState = await models.user_state.findAll({
			where:{
				uliId: uliIds
			},
			raw: true
		});

		return usersState;

	}

	async getAllCompletedUserStateDetails(uliIds){
		const usersState = await models.user_state.findAll({
			where:{
				uliId: uliIds,
				isGameCompleted: true
			},
			raw: true
		});

		return usersState;

	}


	async getUserStateDetails(uliId) {
		const userStateDetails = await models.user_state.findOne({
			where: {
				uliId
			},
			raw: true
		});
		return userStateDetails;
	}

	async getUserCurrentDay(uliId) {
		const userStateDetails = models.user_state.findOne({
			where: {
				uliId
			}
		});
		return userStateDetails.currentDay;
	}

	async updateField(update, condition){
		await models.user_state.update(update, {
			where: condition
		});
	}
}

module.exports = new Stories();