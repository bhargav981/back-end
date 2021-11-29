const models = require('@models');
const _ = require("lodash")

class TeamMembers {

	async getStorylineTeamMembers(storylineId) {
		let storylineTeamMembers = await models.storylines.findOne({
			where: {
				id: storylineId
			},
			attributes: [],
			include: [{
				model: models.team_members,
				as: 'teamMembers',
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

		storylineTeamMembers = await this.formatStorylineTeamMembers(storylineTeamMembers);

		return storylineTeamMembers;
	}

	formatStorylineTeamMembers(storylineTeamMembers) {
		return storylineTeamMembers.get({
			plain: true
		}).teamMembers.map(storylineTeamMember => {

			let updatedStorylineTeamMember = {
				...storylineTeamMember,
				...storylineTeamMember.storyline_team_members
			}

			delete updatedStorylineTeamMember.storyline_team_members;

			return updatedStorylineTeamMember;
		});
	}

	async getTeamMembersMetrics(uliId) {
		const team = await models.user_team_members.findAll({
			where: {
				uliId
			},
			orderBy: [['id', 'DESC']]
		})
		// return team;
		return _(team)
			.chain()
			.orderBy(["id"], ["desc"])
			.groupBy("teamMemberId")
			.values()
			.map(groups => groups[0])
			.orderBy(["teamMemberId"], ["desc"])
			.value()
	}

	async saveTeamMebers(data) {}
}

module.exports = new TeamMembers();