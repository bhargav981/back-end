const Blockers = require("@repositories/Blockers");

const ActionsBasedBlockers = require("./ActionsBasedBlockers/ActionsBasedBlockers");
const MetricsBasedBlockers = require("./MetricsBasedBlockers/MetricsBasedBlockers");
const GeneralBlockers = require("./GeneralBlockers/GeneralBlockers");

const User = require("@utils/User");
class BlockersManager {

	async getBlockers(uliId, day, sprintNumber, sprintDay, actionEffort) {
		//uliId = 2440;
		const storylineId = await User.getStorylineId(uliId);
		// day = 10;
		// sprintNumber = 1;
		// sprintDay = 3;

		// get blockers of the day
		let daySpecificBlockers = [];
		const daysInSprint = 10;
		for (let index = 0; index < actionEffort; index++) {
			let blockerSprintNumber = sprintNumber;
			let blockerSprintDay = sprintDay;

			blockerSprintDay += index;
			if (blockerSprintDay > daysInSprint) {
				blockerSprintDay = blockerSprintDay % daysInSprint;
				blockerSprintNumber += parseInt(blockerSprintDay / daysInSprint, 10);
			}

			daySpecificBlockers = daySpecificBlockers.concat(
				await Blockers.getDaySpecificBlockers(storylineId, blockerSprintNumber, blockerSprintDay)
			);
		}

		let finalBlockers = [];

		// check if blocker is valid
		for (let i = 0; i < daySpecificBlockers.length; i++) {
			let finalBlocker = await this.checkBlockerCondition(uliId, day, daySpecificBlockers[i]);
			
			if (finalBlocker) {
				finalBlockers.push(finalBlocker);
			}
		}

		//ctx.body = finalBlockers;

		return finalBlockers;
	}

	async checkBlockerCondition(uliId, day, blocker) {
		switch (blocker.type) {
			case 'generalBlocker':
				return GeneralBlockers.checkBlocker(uliId, day, blocker);

			case 'actionsBasedBlocker':
				return ActionsBasedBlockers.checkBlocker(uliId, day, blocker);

			case 'metricsBasedBlocker':
				return MetricsBasedBlockers.checkBlocker(uliId, day, blocker);

			default:
				return null;
		}
	}

}

module.exports = new BlockersManager();