const Blockers = require("./../Blockers");
const BlockersRepository = require("@repositories/Blockers");
const Validators = require("@repositories/Validators");
const ValidatorsManager = require("@agile/validators/ValidatorsManager");
const Actions = require("@repositories/Actions");

class ActionsBasedBlockers extends Blockers {

	async checkBlocker(uliId, day, blocker) {
		//get actions conditions for selected blocker
		const blockerActionsConditions = await BlockersRepository.getBlockerActionsConditions(
			blocker.blockerId
		);

		//if no conditions for action based blockers, then don't trigger
		if (blockerActionsConditions.length === 0) {
			return null;
		}

		let shouldBlockerTrigger = true;

		for (let index = 0; index < blockerActionsConditions.length; index++) {
			let blockerActionConditions = blockerActionsConditions[index];

			//check blocker action for each blocker actions
			//return true if action not taken during conditions
			shouldBlockerTrigger &= await this.checkBlockerForActionOption(uliId, day, blocker, blockerActionConditions);
		}

		//if none of the action taken in the duration then trigger
		if (shouldBlockerTrigger) {
			return await this.saveAndGetBlockerDetails(uliId, day, blocker);
		}

		return null;
	}

	async isActionValidBasedOnValidator(blockerActionConditions, uliId) {
		const { validatorId, validatorArguments } = blockerActionConditions;

		const validator = await Validators.getValidator(validatorId);

		return await ValidatorsManager.validate(
			validator.name,
			{
				...validatorArguments,
				uliId
			}
		);
	}

	async checkBlockerForActionOption(uliId, day, blocker, blockerActionConditions) {
		//if the action is valid based on validator condition then don't trigger
		if (
			blockerActionConditions.validatorId
			&& await this.isActionValidBasedOnValidator(blockerActionConditions, uliId)
		) {
			return false;
		}

		//get user actions for the selected blocker's actionOptionId
		const userActionOptionDetails = await Actions.getUserActionOption(
			uliId, blockerActionConditions.actionOptionId
		);

		//if particular action is not taken at all, blocker should be triggered
		if (userActionOptionDetails.length === 0) {
			return true;
		}

		//check based on action duration first
		if (blockerActionConditions.lastActionDuration) {
			if (!this.isLastActionTakenDuringDuration(
				userActionOptionDetails[0], blocker, blockerActionConditions
			)) {
				return true;
			}
			return false;
		}

		//if action duration is not set then check based on action taken or not
		if (blockerActionConditions.isActionTaken && userActionOptionDetails.length === 0) {
			return true;
		}

		return false;
	}

	isLastActionTakenDuringDuration(userActionOptionDetails, blocker, blockerActionConditions) {
		//[TODO] get the value from DB
		const daysInSprint = 10;

		const actionDay = (userActionOptionDetails.sprintNumber - 1) * daysInSprint + userActionOptionDetails.sprintDay;
		const blockerDay = (blocker.sprintNumber - 1) * daysInSprint + blocker.sprintDay;

		if ((blockerDay - actionDay) <= blockerActionConditions.lastActionDuration) {
			return true;
		}

		return false;
	}
}

module.exports = new ActionsBasedBlockers();