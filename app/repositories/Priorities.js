const models = require('@models');

class Priorities {

	async getStorylinePriorities(storylineId) {
		let storylinePriorities = await models.storylines.findOne({
			where: {
				id: storylineId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			include: [{
				model: models.priorities,
				as: 'priorities',
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

		storylinePriorities = await this.formatStorylinePriorities(storylinePriorities);

		return storylinePriorities;
	}

	formatStorylinePriorities(storylinePriorities) {
		return storylinePriorities.get({ plain: true }).priorities.map(storylinePriority => {

			let updatedStorylinePriority = {
				...storylinePriority,
				...storylinePriority.storyline_priorities
			}

			delete updatedStorylinePriority.storyline_priorities;

			return updatedStorylinePriority;
		});
	}

}

module.exports = new Priorities();