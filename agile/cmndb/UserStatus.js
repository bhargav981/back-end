const models = require("@models");
const _ = require("lodash");
const userState = require("@repositories/UserState");
const userRepo = require("@repositories/Users");

class UserStatus {
  async getGameCompletionStatus(uliId, userData) {
    if (userData && userData.isGameCompleted) {
      
      return {
        uliId: userData.uliId,
        status: "COMPLETED",
        grpId: await userRepo.getGroupIdByUliId(userData.uliId),
        started: userData.created_at,
        completed: userData.updated_at
      };
    }
    if (userData && userData.isGameStarted) {
      return {
        uliId: userData.uliId,
        status: "STARTED",
        grpId: await userRepo.getGroupIdByUliId(userData.uliId),
        started: userData.created_at,
        completed: userData.updated_at
      };
    }

    return {
        uliId: uliId,
        status: "NOT_STARTED",
        grpId: userData ? await userRepo.getGroupIdByUliId(userData.uliId) : null,
        started: null,
        completed: null
      }
  }

  async getUserStatus(ctx) {
    const uliId = Number(ctx.params.uliId);
    const userData = await userState.getUserStateDetails(uliId);

    const response = this.getGameCompletionStatus(uliId, userData);
    return response;
  }

  async getUserStatusByIds(userData) {
    let response = userData.map(user => {
      const item = this.getGameCompletionStatus(user.uliId, user);
      return item;
    });

    response = Promise.all(response);
    return response;
  }

  async getUserStatusForUliIds(ctx) {
    const uliIds = ctx.query.uliIds.split(",").map(Number);

    const userData = await userState.getAllUsersStateDetails(uliIds);

    const userDataUliIds = _.map(userData, "uliId");

    let idsNotInDTDB = uliIds.map(uliId => {
      if (!userDataUliIds.includes(uliId)) {
        return uliId;
      }
    });

    idsNotInDTDB = _.filter(idsNotInDTDB, Boolean);

    let idsNotInDBStatus = await idsNotInDTDB.map(async id => {
      return await this.getGameCompletionStatus(id, null);
    });

    idsNotInDBStatus = await Promise.all(idsNotInDBStatus);

    const userStatus = await this.getUserStatusByIds(userData);
    return userStatus.concat(idsNotInDBStatus);
  }

  async getGroupUserStatusByGroupId(ctx) {
    const { groupId } = ctx.params;
    let userData = await userRepo.getAllUsersByGroupId(groupId);

    const userIds = _.map(userData, "uliId");

    userData = await userState.getAllUsersStateDetails(userIds);

    let response = await this.getUserStatusByIds(userData);
    response = _.filter(response, Boolean);
    return response;
  }

  async getGroupUserStatusByGoupIdsArray(ctx) {
    const groupIds = ctx.query.grpIds.split(",");

    let userData = await userRepo.getAllUsersByGroupIds(groupIds);

    const userIds = _.map(userData, "uliId");

    userData = await userState.getAllUsersStateDetails(userIds);

    userData = _.filter(userData, Boolean);

    let response = await this.getUserStatusByIds(userData);
    return response;
  }
}

module.exports = new UserStatus();
