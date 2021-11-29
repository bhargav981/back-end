const Stories = require("@repositories/Stories");
const _ = require("lodash");
const utils = require("@utils/Utils");

class Velocity{
    async getMetrics(uliId,sprintNumber){
        const completedStories = await Stories.getCompletedUserStories(uliId,sprintNumber);
        const velocity = completedStories.length;

        return velocity;
    }
}


module.exports = new Velocity();