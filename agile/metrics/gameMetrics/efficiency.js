const Stories = require("@repositories/Stories");
const _ = require("lodash");
const utils = require("@utils/Utils");

class Efficiency{
    async getMetrics(uliId,sprintNumber){
        const completedStories = await Stories.getCompletedUserStories(uliId,sprintNumber);

        const plannedStories = await Stories.getAllSprintsPlannedStories(uliId,sprintNumber);

        const efficiency = utils.convertToDecimal((completedStories.length / plannedStories.length)*100);

        return efficiency ? efficiency : 0;
    }
}


module.exports = new Efficiency();