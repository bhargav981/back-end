const models = require('@models');
const Stories = require("@repositories/Stories");
const Metrics = require('@agile/metrics/MetricsManager');
const utils = require("@utils/Utils");
const _ = require("lodash")
class Progression {

    async makeProgression(sprint, uliId, transaction, updatedDay, updatedSprintNumber, updatedSprintDay) {
        // sort and grouped by priority
        const userStories = await Stories.getStoriesOfSprint(sprint, uliId, transaction);

        let allStories = [];
        let changedStories = [];

        const metrics = await Metrics.getLatestMetrics(uliId);
        const effort = metrics.find(metric => metric.metricsId == 3);
        const effortofDay = effort.value; //to be made dynamic   take metric 3 latest value

        let effortRemainingFromPrevios = effortofDay;
 
        
        Object.keys(userStories).forEach((key) => {            
            // priority cannot be null
            if (effortRemainingFromPrevios !== 0 && key !== 'null') {
                const {stories, effortRemaining} = this.applyEffort(userStories[key], effortRemainingFromPrevios);
                changedStories.push(stories);
                effortRemainingFromPrevios = effortRemaining;

            }
        });
        await this.saveStoryProgressInUserStories(_.flatten(changedStories), transaction, updatedDay, updatedSprintNumber, updatedSprintDay);
        return _.flatten(changedStories);
    }

    applyEffort(stories, effort) {
        // console.log(stories)
        const totalStories = stories.length;
        let effortRemaining = utils.convertToDecimal(effort);
        let toBeCompleted = stories.filter(story => story.storyStatus !== 4).length;

        while (toBeCompleted > 0 && effortRemaining > 0) {
            
            let idealprogression = utils.convertToDecimal(effortRemaining / toBeCompleted);
            // if ideal progression is zero return
            if(!idealprogression){
                // this is needed when the progression is <0.1
                effortRemaining = 0;
                break
            }
            for (let index = 0; index < totalStories; index++) {

                const element = stories[index];
                // if the story is complete do not worry
                if(element.storyStatus == 4){
                    continue;
                }
                if( element.blockerId !== null){
                    toBeCompleted--;
                    continue;
                }
                let effortNeededForStory = utils.convertToDecimal(Math.abs(element.storyPoint - element.progress));
                    if (effortNeededForStory <= idealprogression) {                        
                        element.progress = utils.convertToDecimal(element.storyPoint);
                        element.storyStatus = 4;
                        element.changed = true;
                        effortRemaining = utils.convertToDecimal(Math.abs(effortRemaining - effortNeededForStory));  // negative value
                        toBeCompleted--;
                    } else {
                        element.progress = utils.convertToDecimal(element.progress + idealprogression);
                        element.changed = true;
                        effortRemaining = utils.convertToDecimal(Math.abs(effortRemaining - idealprogression));
                        element.storyStatus= 3;
                    }
            }
        
        }
     
        return {
            stories,
            effortRemaining
        }
    }
    async saveStoryProgressInUserStories(stories, transaction, updatedDay, updatedSprintNumber, updatedSprintDay) {
        const userStories = stories.map((story) => {
            return {
            uliId : story.uliId,
            day: updatedDay,
            sprintNumber: updatedSprintNumber,
            sprintDay: updatedSprintDay,
            storyId: story.storyId,
            progress: story.progress,
            storyStatus: story.storyStatus,
            storyPriority: story.storyPriority
            }
        });

        await Stories.storeChangedUserStories(userStories, transaction);
    }
}

module.exports = new Progression();