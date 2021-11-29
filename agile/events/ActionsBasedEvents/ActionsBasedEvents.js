const Events = require("./../Events");
const EventsRepository = require("@repositories/Events");
const Actions = require("@repositories/Actions");
const Validators = require("@repositories/Validators");
const ValidatorsManager = require("@agile/validators/ValidatorsManager");

class ActionsBasedEvents extends Events {

	async checkEvent(ctx, event, uliId) {

		//get actions conditions for selected event
		const eventActionsConditions = await EventsRepository.getEventActionsConditions(
			event.eventId
		);

		//if no conditions for action based events, then don't trigger
		if (eventActionsConditions.length === 0) {
			return null;
		}

		let shouldBlockerTrigger = true;

		for (let index = 0; index < eventActionsConditions.length; index++) {
			let eventActionConditions = eventActionsConditions[index];

			//check event action for each event actions
			//return true if action not taken during conditions
			shouldBlockerTrigger &= await this.checkActionForActionOption(uliId, event, eventActionConditions);
		}

		//if none of the action taken in the duration then trigger
		if (shouldBlockerTrigger) {
			return await this.saveAndGetEventDetails(ctx, event);
		}

		return null;
	}

	async isActionValidBasedOnValidator(eventActionConditions, uliId) {
		const { validatorId, validatorArguments } = eventActionConditions;

		const validator = await Validators.getValidator(validatorId);

		return await ValidatorsManager.validate(
			validator.name,
			{
				...validatorArguments,
				uliId
			}
		);
	}

	async checkActionForActionOption(uliId, event, eventActionConditions) {
		//if the action is valid based on validator condition then don't trigger
		if (
			eventActionConditions.validatorId
			&& await this.isActionValidBasedOnValidator(eventActionConditions, uliId)
		) {
			return false;
		}

		//if action option id is null then by default trigger
		if (!eventActionConditions.actionOptionId) {
			return true;
		}

		//get user actions for the selected event's actionOptionId
		const userActionOptionDetails = await Actions.getUserActionOption(
			uliId, eventActionConditions.actionOptionId
		);

		//if particular action is not taken at all, event should be triggered
		if (userActionOptionDetails.length === 0) {
			return true;
		}

		//check based on action duration first
		if (eventActionConditions.lastActionDuration) {
			if (!this.isLastActionTakenDuringDuration(
				userActionOptionDetails[0], event, eventActionConditions
			)) {
				return true;
			}
			return false;
		}

		//if action duration is not set then check based on action taken or not
		if (eventActionConditions.isActionTaken && userActionOptionDetails.length === 0) {
			return true;
		}

		return false;
	}

	isLastActionTakenDuringDuration(userActionOptionDetails, event, eventActionConditions) {
		//[TODO] get the value from DB
		const daysInSprint = 10;

		const actionDay = (userActionOptionDetails.sprintNumber - 1) * daysInSprint + userActionOptionDetails.sprintDay;
		const eventDay = (event.sprintNumber - 1) * daysInSprint + event.sprintDay;

		if ((eventDay - actionDay) <= eventActionConditions.lastActionDuration) {
			return true;
		}

		return false;

	}

}

module.exports = new ActionsBasedEvents();