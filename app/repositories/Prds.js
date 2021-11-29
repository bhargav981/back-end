const models = require('@models');

class Prds {

	async getStorylinePrds(storylineId) {
		let storylinePrds = await models.storylines.findOne({
			where: {
				id: storylineId
			},
			attributes: [],
			include: [{
				model: models.prds,
				as: 'prds',
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

		storylinePrds = await this.formatStorylinePrds(storylinePrds);

		return storylinePrds;
	}

	formatStorylinePrds(storylinePrds) {
		return storylinePrds.get({
			plain: true
		}).prds.map(storylinePrd => {
			let updatedStorylinePrd = {
				...storylinePrd,
				...storylinePrd.storyline_prds
			}

			delete updatedStorylinePrd.storyline_prds;

			return updatedStorylinePrd;
		});
	}

	async saveUserPrd(uliId, prdId, day) {
		await models.user_prds.create({
			uliId,
			prdId,
			day
		});
	}

	async saveUserPrdForPrdAction(uliId, prdId, day, transaction) {
		await models.user_prds.create({
			uliId,
			prdId,
			day
		}, {
				transaction
			});
	}

	async getUserPrds(uliId) {
		return await models.user_prds.findAll({
			where: {
				uliId
			},
			raw: true,
			attributes: {
				exclude: ['created_at', 'updated_at', 'id']
			},
			order: [
				['day', 'ASC']
			]
		});
	}
	async getLatestUserPrd(uliId){
		return await models.user_prds.findOne({
			where: {
				uliId
			},
			raw: true,
			attributes: {
				exclude: ['created_at', 'updated_at', 'id']
			},
			order: [
				['id', 'DESC']
			]
		});
	}

	async getSpritntPrd(uliId, sprintNumber){
		return await models.user_prds.findOne({
			where: {
				uliId,
				sprintNumber
			},
			raw: true,
			attributes: {
				exclude: ['created_at', 'updated_at', 'id']
			}
		});
	}

	async getStorylinePrdDetails(prdId, storylineId) {
		return await models.storyline_prds.find({
			where: {
				prdId,
				storylineId
			},
			raw: true,
			attributes: {
				exclude: ['created_at', 'updated_at', 'id']
			}
		});
	}

	async getUserPrdsByConditions(conditions, orderArray = [], limit) {
		return await models.user_prds.findAll({
			where: conditions,
			raw: true,
			attributes: {
				exclude: ['created_at', 'updated_at', 'id']
			},
			order: orderArray,
			limit
		});
	}
}

module.exports = new Prds();