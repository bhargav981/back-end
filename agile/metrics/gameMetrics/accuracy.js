const Stories = require("@repositories/Stories");
const _ = require("lodash");
const utils = require("@utils/Utils");

class Accuracy{
    async getMetrics(uliId,sprintNumber){
        const completedStories = await Stories.getCompletedUserStories(uliId,sprintNumber);
        const completedStoryIds = _.map(completedStories, 'storyId');

        const allStories = await Stories.getUserStoriesOfThisSprint(uliId, sprintNumber);
        const correctStories = allStories.filter(story => story.isCorrect == true);
        const correctStoryIds = _.map(correctStories, 'id');

        const completedCorrectStories = _.intersection( completedStoryIds, correctStoryIds);
        const accuracy = utils.convertToDecimal((completedCorrectStories.length / completedStories.length)*100);

        return accuracy ? accuracy : 0;
    }
}


module.exports = new Accuracy();