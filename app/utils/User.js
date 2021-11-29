
const models = require ('@models');

class User {
  async getUser (ctx) {
    try {
      const user = await models.users.find({
        raw: true,
        where: {
          uli_id: ctx.loggedInUserObject.userLicenseID,
        },
      });

      return user;
    } catch (error) {
      ctx.body = error;
    }
  }

  async getUserByUliId (uliId) {
    try {
      const user = await models.users.find({
        raw: true,
        where: {
          uliId
        },
      });

      return user;
    } catch (error) {
      
    }
  }


  getUserId (ctx) {
    try {
      return ctx.loggedInUserObject.userLicenseID;
    } catch (error) {
      console.log (error);
      ctx.body = error;
    }
  }

  async getGroupId(uliId){
    const user = await models.users.find ({
      where: {
        uliId,
      },
      attributes: ['groupId'],
      raw: true,
    });

    return user ? user.groupId: null;
  }

  async getGroup(grpId){
    const group = await models.groups.find({
      where:{
        id : grpId
      },
      raw: true
    });

    return group;
  }

  async getStorylineId (uliId) {
    const user = await models.users.find ({
      where: {
        uliId,
      },
      attributes: ['groupId'],
      raw: true,
    });

    const groupId = user.groupId;

    const storylineId = await this.getStorylineIdFromGroupId(groupId);
    return storylineId;
  }

  async getStorylineIdFromGroupId(groupId){
    const group = await models.groups.find ({
      where: {
        id: groupId,
      },
      raw: true,
      attributes: ['storylineId'],
    });

    const storyline = await models.storylines.find ({
      raw: true,
      where: {
        id: group.storylineId,
      },
    });

    if (storyline.isDemo) {
      return storyline.parentId;
    } else {
      return storyline.id;
    }
  }


  async createUserCompData(uliId,key,value){
    const metric = await models.metrics.find({
      where:{
        key
      },
      raw: true
    });

    console.log(key);
    console.log(metric);

    const compScore = await models.user_competency_values.find({
      where:{
        uliId,
        metricId: metric.id,
        key
      },
      raw: true
    });

    if(!compScore){
      await models.user_competency_values.create({
        uliId,
        metricId: metric.id,
        key,
        value
      });
    }else{
      await models.user_competency_values.update(
        {value},
        {
          where: {
          uliId,
          metricId: metric.id,
          key
        }
      });
    }
  }

  getInitConfig (ctx) {
    return {
      name: ctx.loggedInUserObject.firstName,
      email: ctx.loggedInUserObject.emailID,
      userId: this.getUserId (ctx),
      uliId: ctx.loggedInUserObject.userLicenseID,
      groupId: ctx.loggedInUserObject.commonDBGroupID,
      logoutUrl: 'http://pearlie.org',
    };
  }

  async softDeleteUsers(uliIds) {
    const uliIdsArray = uliIds.split(",");
    let deleteUser = uliIdsArray.map(async uliId => {
        let res = await models.users.destroy({
          where: {
            uliId
          }
        });

        return res;
    });
    deleteUser = await Promise.all(deleteUser);
    return { success: true };
}


}

module.exports = new User ();
