const models = require('@models');


class StorylineIntro {

    async getData(storylineId) {
        const data = await models.storyline_intro.find({
            where: {
                storylineId
            },
            raw: true,
            attributes: {
                exclude: ['created_at', 'updated_at', 'storylineId']
            }
        });

        return data;
    }

}

module.exports = new StorylineIntro();