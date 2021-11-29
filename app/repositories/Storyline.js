const models = require('@models');

const features = require('@repositories/Features');
const prds = require('@repositories/Prds');
const teamMembers = require('@repositories/TeamMembers');
const customers = require('@repositories/Customers');

class Storyline {

	async getStorylineByStorylineId(id){
		const data = await models.storylines.findAll ({
			where: {
			  id,
			},
			limit: 1,
		  });

		return data;
	
	}

	async getAllStorylines(isDemo){
		const data = await models.storylines.findAll ({
			  where: {
			    isDemo: isDemo,
			  },
			});
		
		return data;
	}

	async getStorylineData(id) {
		const storylineData = await models.storylines.findOne({
			// raw: true,
			where: {
				id
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			}
		});

		return {
			id: storylineData.id,
			name: storylineData.name,
			description: storylineData.description,
			isDemo: storylineData.isDemo,
			features: await features.getStorylineFeatures(id),
			prds: await prds.getStorylinePrds(id),
			teamMembers: await teamMembers.getStorylineTeamMembers(id),
			customers: await customers.getStorylineCustomers(id),
		};
	}

}

module.exports = new Storyline();
