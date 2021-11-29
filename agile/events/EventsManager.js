const Events = require("@repositories/Events");

const ActionsBasedEvents = require("./ActionsBasedEvents/ActionsBasedEvents");
const MetricsBasedEvents = require("./MetricsBasedEvents/MetricsBasedEvents");
const GeneralEvents = require("./GeneralEvents/GeneralEvents");

const User = require("@utils/User");
class EventsManager {

	async getEvents(ctx, sprintNumber, sprintDay, actionEffort) {
		const uliId = await User.getUserId(ctx);
		const storylineId = await User.getStorylineId(uliId);
		//  sprintNumber = 1;
		//  sprintDay = 9;

		// get events of the day(s)
		let daySpecificEvents = [];
		const daysInSprint = 10;
		for (let index = 0; index < actionEffort; index++) {
			let eventSprintNumber = sprintNumber;
			let eventSprintDay = sprintDay;

			eventSprintDay += index;
			if (eventSprintDay > daysInSprint) {
				eventSprintDay = eventSprintDay % daysInSprint;
				eventSprintNumber += parseInt(eventSprintDay / daysInSprint, 10);
			}

			daySpecificEvents = daySpecificEvents.concat(
				await Events.getDaySpecificEvents(storylineId, eventSprintNumber, eventSprintDay)
			);
		}

		let finalEvents = [];

		// check if event is valid
		for (let i = 0; i < daySpecificEvents.length; i++) {
			let finalEvent = await this.checkEventCondition(ctx, daySpecificEvents[i], uliId);

			if (finalEvent) {
				finalEvents.push(finalEvent);
			}
		}

		return finalEvents;
	}

	async checkEventCondition(ctx, event, uliId) {
		switch (event.type) {
			case 'generalEvent':
				return GeneralEvents.checkEvent(ctx, event, uliId);

			case 'actionsBasedEvent':
				return ActionsBasedEvents.checkEvent(ctx, event, uliId);

			case 'metricsBasedEvent':
				return MetricsBasedEvents.checkEvent(ctx, event, uliId);

			default:
				return null;
		}
	}

}

module.exports = new EventsManager();