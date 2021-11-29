const UserState = require("@repositories/UserState");
const StoriesRepository = require("@repositories/Stories");
const BlockersRepository = require("@repositories/Blockers");

class StoriesSelectors {

	async getUserSprintNumberAndSprintDay(uliId) {
		const currentUserState = await UserState.getUserStateDetails(uliId);

		return {
			sprintNumber: currentUserState.currentSprintNumber,
			sprintDay: currentUserState.currentSprintDay
		};
	}

	getStoriesIdsFromStories(stories = []) {
		let storiesIds = [];

		stories.map(story => {
			storiesIds.push(story.storyId);
		})

		return storiesIds;
	}

	getBlockedStoryIdsFromActiveBlockersList(activeBlockers = []) {
		let blockedStoryIds = [];

		activeBlockers.map(activeBlocker => {
			blockedStoryIds.push(activeBlocker.storyId);
		})

		return blockedStoryIds;
	}

	getNonBlockedStoryIds(storyIds, blockedStoryIds) {
		let nonBlockedStoryIds = [];

		storyIds.map(storyId => {
			if (blockedStoryIds.indexOf(storyId) === -1) {
				nonBlockedStoryIds.push(storyId);
			}
		})

		return nonBlockedStoryIds;
	}

	async getFirstNonBlockedInProgressStory(selectorArguments) {
		const { uliId } = selectorArguments;

		const { sprintNumber, sprintDay } = await this.getUserSprintNumberAndSprintDay(uliId);

		const storyStatus = 3; //status for in progress story

		const conditions = {
			uliId,
			storyStatus,
			sprintDay,
			sprintNumber
		};

		const orderArray = [
			['id', 'ASC']
		];

		const limit = 1;

		const stories = await StoriesRepository.getUserStoriesByConditions(conditions, orderArray, limit);

		const storyIds = this.getStoriesIdsFromStories(stories);

		const activeBlockers = await BlockersRepository.getUserActiveBlockers(uliId);

		const blockedStoryIds = this.getBlockedStoryIdsFromActiveBlockersList(activeBlockers);

		return this.getNonBlockedStoryIds(storyIds, blockedStoryIds);
	}

	async getAllNonBlockedInProgressStories(selectorArguments) {
		const { uliId } = selectorArguments;

		const { sprintNumber, sprintDay } = await this.getUserSprintNumberAndSprintDay(uliId);

		const storyStatus = 3; //status for in progress story

		const conditions = {
			uliId,
			storyStatus,
			sprintDay,
			sprintNumber
		};

		const orderArray = [
			['id', 'ASC']
		];

		const limit = 1000;

		const stories = await StoriesRepository.getUserStoriesByConditions(conditions, orderArray, limit);

		const storyIds = this.getStoriesIdsFromStories(stories);

		const activeBlockers = await BlockersRepository.getUserActiveBlockers(uliId);

		const blockedStoryIds = this.getBlockedStoryIdsFromActiveBlockersList(activeBlockers);

		return this.getNonBlockedStoryIds(storyIds, blockedStoryIds);
	}

	async getMostCompletedNonBlockedInProgressStory(selectorArguments) {
		const { uliId } = selectorArguments;

		const { sprintNumber, sprintDay } = await this.getUserSprintNumberAndSprintDay(uliId);

		const storyStatus = 3; //status for in progress story

		const conditions = {
			uliId,
			storyStatus,
			sprintDay,
			sprintNumber
		};

		const orderArray = [
			['progress', 'DESC']
		];

		const limit = 1;

		const stories = await StoriesRepository.getUserStoriesByConditions(conditions, orderArray, limit);

		const storyIds = this.getStoriesIdsFromStories(stories);

		const activeBlockers = await BlockersRepository.getUserActiveBlockers(uliId);

		const blockedStoryIds = this.getBlockedStoryIdsFromActiveBlockersList(activeBlockers);

		return this.getNonBlockedStoryIds(storyIds, blockedStoryIds);
	}

}

module.exports = new StoriesSelectors();