const models = require('@models');

class User {
    async getAllUsersByGroupIds(groupIds){
        const users = await models.users.findAll({
            where: {
              groupId: groupIds
            },
            raw: true
          });

        return users;
    }

    async getAllUsersByGroupId(groupId){
        const users = await models.users.findAll({
            where: {
              groupId
            },
            raw: true
          });

        return users;
    }

    async setGameCompleted(uliId) {
      return await models.user_state.update({
        isGameCompleted: true
    }, {
        where: {
            uliId
        }
    })
    }

    async setGameStarted(uliId) {
        return await models.user_state.update({
                isGameStarted: true
            }, {
                where: {
                    uliId
                }
            })
    }

    async getGroupIdByUliId(uliId){
        const user = await models.users.find({
            where: {
              uliId
            },
            raw: true
          });
          console.log(user);
          return user ? user.groupId : null; 
    }
}

module.exports = new User();