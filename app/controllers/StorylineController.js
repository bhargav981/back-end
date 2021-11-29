const storyline = require('@repositories/Storyline');
const user = require('@utils/User');


class StorylineController {
    async get(ctx) {

        const uliId = await user.getUserId(ctx);

        const storylineId = await user.getStorylineId(uliId);

        const storylinesData = await storyline.getStorylineData(storylineId);

        ctx.body = storylinesData;
    }
}

module.exports = new StorylineController();