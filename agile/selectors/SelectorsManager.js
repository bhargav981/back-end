const StoriesSelectors = require("@agile/selectors/StoriesSelectors");

class SelectorsManager {

	async get(type, selectorArguments) {
		switch (type) {
			case 'firstNonBlockedInProgressStory':
				return StoriesSelectors.getFirstNonBlockedInProgressStory(selectorArguments);

			case 'allNonBlockedInProgressStories':
				return StoriesSelectors.getAllNonBlockedInProgressStories(selectorArguments);

			case 'mostCompletedNonBlockedInProgressStory':
				return StoriesSelectors.getMostCompletedNonBlockedInProgressStory(selectorArguments);

			default:
				return [];
		}
	}

}

module.exports = new SelectorsManager();