const models = require('@models');

class Statuses {
	async getStorylineStatuses(storylineId) {
		let storylineStatus = await models.storylines.findOne({
			where: {
				id: storylineId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			include: [{
				model: models.statuses,
				as: 'statuses',
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				through: {
					model: models.storyline_statuses,
					as: 'storyline_statuses',
					attributes: {
						exclude: ['created_at', 'updated_at']
					}
				}
			}]
		});

		storylineStatus = await this.formatStorylineStatuses(storylineStatus);

		return storylineStatus;
	}

	formatStorylineStatuses(storylineStatus) {
		return storylineStatus.get({ plain: true }).statuses.map(eachStorylineStatus => {

			let updatedEachStorylineStatus = {
				...eachStorylineStatus,
				...eachStorylineStatus.storyline_statuses
			}

			delete updatedEachStorylineStatus.storyline_statuses;

			return updatedEachStorylineStatus;
		});
	}
}

module.exports = new Statuses();