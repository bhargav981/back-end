const models = require('@models');
const Features = require("@repositories/Features");
const _ = require("lodash");
const user = require("@utils/User");
const blockersRepo = require("@repositories/Blockers");

class Stories {

    async getStorylineStories(storylineId) {
        const features = await Features.getStorylineFeatures(storylineId);
        const fIds = features.map((f) => f.id);
        const stories = await models.stories.findAll({
            where: {
                featureId: fIds
            }
        })
        return stories;
    }

    async getUserStories(uliId) {
        return models.user_stories.findAll({
            where: {
                uliId
            },
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
        })
    }

    async getUserStoriesByStoryIds(uliId, storyIds) {
        return models.user_stories.findAll({
            where: {
                uliId,
                storyId: storyIds
            },
            order: [
                ['id', 'DESC']
            ],
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
        })
    }

    async getStoriesByUliId(uliId) {
        const storylineId = await user.getStorylineId(uliId);
        const features = await Features.getStorylineFeatures(storylineId);

        const featureIds = features.map((eachFeature) => {
            return eachFeature.id
        });

        const stories = await this.getStoriesByFeatureIds(featureIds);
        return stories;
    }

    async getUserStoriesByUliId(uliId) {
        return models.user_stories.findAll({
            where: {
                uliId
            },
            order: [
                ['id', 'DESC']
            ],
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
        })
    }

    async getStoriesByFeatureIds(featureIds) {
        return models.stories.findAll({
            where: {
                featureId: featureIds
            },
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
        })
    }

    async storeChangedUserStories(stories, transaction){
        await models.user_stories.bulkCreate(
            stories,
            transaction
        );
    }

    async getStoriesOfSprint(sprint,uliId,transaction){    
        let userStories = await this.getLatestUserStoriesOfSprintNotCompleted(uliId, sprint,transaction);
        const storiesProgressWithBlockers = await blockersRepo.getStoriesBlockers(uliId,userStories,transaction);

        const storylineId = await user.getStorylineId(uliId);
        const staticStories = await this.getStorylineStories(storylineId);

        for(let i =0;i<staticStories.length;i++){
            for (let j = 0 ;j< storiesProgressWithBlockers.length;j++){
                if (staticStories[i].id == storiesProgressWithBlockers[j].storyId){
                    storiesProgressWithBlockers[j].storyPoint = staticStories[i].storyPoint;
                }
            }
        }
        
        return _.groupBy(storiesProgressWithBlockers, "storyPriority");
    }

    async  getLatestUserStoriesOfSprint(uliId, sprint){
        // console.log(uliId, sprint)
        const userStories =  await models.user_stories.findAll({
            where: {
                uliId,
                sprintNumber: sprint
            },
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
            raw: true
        });

        const stories = _(userStories)
        .chain()
        .orderBy(["id"], ["desc"])
        .groupBy("storyId")
        .values()
        .map(groups => groups[0])
        .orderBy(["storyId"], ["desc"])
        .value();

        return stories;
    }


    async  getLatestUserStoriesOfSprintNotCompleted(uliId, sprint){
        // console.log(uliId, sprint)
        let userStories =  await models.user_stories.findAll({
            where: {
                uliId,
                sprintNumber: sprint
            },
            order: [
				['id', 'DESC']
			],
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
            raw: true
        });

        const stories = _(userStories)
        .chain()
        .groupBy("storyId")
        .values()
        .map(groups => groups[0])
        .orderBy(["storyId"], ["desc"])
        .value();


        // const stories = _(userStories)
        // .chain()
        // .orderBy(["id"], ["desc"])
        // .groupBy("storyId")
        // .values()
        // .map(groups => groups[0])
        // .orderBy(["storyId"], ["desc"])
        // .value();


        return stories;
    }

    async getLatestUserStories(uliId){
        const userStories =  await models.user_stories.findAll({
            where: {
                uliId
            },
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
            raw: true
        });

        const stories = _(userStories)
        .chain()
        .orderBy(["id"], ["desc"])
        .groupBy("storyId")
        .values()
        .map(groups => groups[0])
        .orderBy(["storyId"], ["desc"])
        .value();

        const storiesProgressWithBlockers = await blockersRepo.getStoriesBlockers(uliId,stories,null);


        return storiesProgressWithBlockers;
    }

    async getPaStories(uliId){
        const storylineId = await user.getStorylineId(uliId);

        const features = await Features.getStorylineFeatures(storylineId);
        const fIds = features.map((f) => f.id);
        const stories = await models.stories.findAll({
            where: {
                featureId: fIds,
                isPA: true
            }
        });

        return stories;
    }

    async getCompletedUserStoriesForPa(uliId, storyIds){
        let userStories =  await models.user_stories.findAll({
            where: {
                uliId,
                storyId: storyIds
            },
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
            raw: true
        });

        userStories = _(userStories)
        .chain()
        .orderBy(["id"], ["desc"])
        .groupBy("storyId")
        .values()
        .map(groups => groups[0])
        .orderBy(["storyId"], ["desc"])
        .value();

        return userStories;
    }

    async getCompletedUserStories(uliId,sprintNumber){
        let userStories =  await models.user_stories.findAll({
            where: {
                uliId,
                storyStatus: 4,
                sprintNumber
            },
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
            raw: true
        });

        userStories = _(userStories)
        .chain()
        .orderBy(["id"], ["desc"])
        .groupBy("storyId")
        .values()
        .map(groups => groups[0])
        .orderBy(["storyId"], ["desc"])
        .value();

        return userStories;
    }

    async getUserStoriesByConditions(conditions, orderArray= [], limit){

        const stories = await models.user_stories.findAll({
            where: conditions,
            order: orderArray,
            limit
        });

        return stories;
    }

    async getAllSprintsPlannedStories(uliId,sprintNumber){
        let userStories =  await models.user_stories.findAll({
            where: {
                uliId,
                storyStatus: [2,3],
                sprintNumber
            },
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
            raw: true
        });

        userStories = _(userStories)
        .chain()
        .orderBy(["id"], ["desc"])
        .groupBy("storyId")
        .values()
        .map(groups => groups[0])
        .orderBy(["storyId"], ["desc"])
        .value();

        return userStories;
    }

    async getUserStoriesOfThisSprint(uliId, sprintNumber){
        let userStories =  await models.user_stories.findAll({
            where: {
                uliId,
                sprintNumber
            },
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
            raw: true
        });

        userStories = _(userStories)
        .chain()
        .orderBy(["id"], ["desc"])
        .groupBy("storyId")
        .values()
        .map(groups => groups[0])
        .orderBy(["storyId"], ["desc"])
        .value();

        const storyIds = _.map(userStories, 'storyId');
        const stories = await models.stories.findAll({
            where:{
                id: storyIds
            },
            raw: true
        });

        return stories;
    }
}

module.exports = new Stories();