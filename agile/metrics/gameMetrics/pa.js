const Stories = require("@repositories/Stories");
const utils = require("@utils/Utils");

class PA{
    async getMetrics(uliId){
        const paStories = await Stories.getPaStories(uliId);
        const storyIds = paStories.map((sto) => sto.id);
        const userStories = await Stories.getCompletedUserStoriesForPa(uliId, storyIds)
        const completed =userStories.reduce((prev,story)=>{
            return prev + story.progress
        },0)
        const total = paStories.reduce((prev,story)=>{
            return prev + story.storyPoint
        },0)
        return utils.convertToDecimal((completed/total)*100);
    }
}


module.exports = new PA();