const models = require('@models');

class Features {

	async getStorylineFeatures(storylineId) {
		let storylineFeatures = await models.storylines.findOne({
			where: {
				id: storylineId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			include: [{
				model: models.features,
				as: 'features',
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

		storylineFeatures = await this.formatStorylineFeatures(storylineFeatures);

		return storylineFeatures;
	}

	formatStorylineFeatures(storylineFeatures) {
		return storylineFeatures.get({ plain: true }).features.map(storylineFeature => {

			let updatedStorylineFeature = {
				...storylineFeature,
				...storylineFeature.storyline_features
			}

			delete updatedStorylineFeature.storyline_features;

			return updatedStorylineFeature;
		});
	}
}

module.exports = new Features();