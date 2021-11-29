const _ = require("lodash");

const models = require("@models");
const allMetrics = require("./AllMetrics");
const status = require("./UserStatus");
const user = require('@utils/User');
const userState = require('@repositories/UserState');
const metrics = require("@repositories/Metrics");
const userRepo = require("@repositories/Users");


class UserMetrics {

  async getRemainingTime(uliId) {
    let timeLeftInMin;
    const grpId = await userRepo.getGroupIdByUliId(uliId);
    const grpDetails = await models.groups.find({
      where: {
        id: grpId
      },
      raw: true
    });
    if (!grpDetails.isTimerEnabled) {
      return 'NA';
    }
    const userStateDetails = await models.user_state.find({
      where: {
        uli_id: uliId
      },
      raw: true
    });
    let timeLeftInSec = userStateDetails.timerValue;

    if(userStateDetails.isGameCompleted) {
      return "Time up";
    }
    

    timeLeftInMin =
      (timeLeftInSec <= 0)
        ? "Time up"
        : Math.floor(timeLeftInSec / 60) +
        " min " +
        ("0" + Math.floor(timeLeftInSec % 60)).slice(-2) +
        " sec";

    return timeLeftInMin;
  }

  async getMetricsDataForUsersByUliId(uliId) {
    const metricsData = await metrics.getUserMetricsForCmnDB(uliId);
    let metricValues = {
      uliId
    };
    metricsData.map(metric => {
      metricValues[metric.key] = metric.value || null
    });
    return metricValues;
  }

  async getUserStatusByUliId(uliId) {
    const userData = await userState.getUserStateDetails(uliId);

    const userStatus = await status.getGameCompletionStatus(
      uliId,
      userData
    );
    return userStatus ? userStatus.status : null;
  }

  async getUserMetrics(ctx) {
    const { uliId } = ctx.params;
    const data = await this.getMetricsDataForUsersByUliId(uliId);
    const status = await this.getUserStatusByUliId(uliId);
    const metricsData = Object.assign({}, data, {
      status: status,
      timeLeft: await this.getRemainingTime(uliId)
    });

    const storylineId = await user.getStorylineId(uliId);

    return {
      metrics: await allMetrics.getMetricKeys(storylineId),
      metricsData
    };
  }

  async getMetricsDataForUsersByUliIdArray(usersData) {
    let metricsData = usersData.map(async userData => {
      const data = await this.getMetricsDataForUsersByUliId(userData.uliId);
      if (data) {
        const userStatus = await status.getGameCompletionStatus(
          userData.uliId,
          userData
        );
        const metricsData = Object.assign({}, data, {
          status: userStatus.status,
          timeLeft: await this.getRemainingTime(userData.uliId)
        });
        return metricsData;
      }
    });

    metricsData = await Promise.all(metricsData);
    const metricsDataFiltered = _.filter(metricsData, Boolean);

    return metricsDataFiltered;

    //QUERY CALLS TO BE OPTIMISED
  }

  async getGroupMetrics(ctx) {
    const { grpId } = ctx.params;

    let usersData = await userRepo.getAllUsersByGroupId(grpId);
    const userIds = _.map(usersData, "uliId");

    usersData = await userState.getAllUsersStateDetails(userIds);

    const storylineId = await user.getStorylineIdFromGroupId(grpId);

    return {
      metrics: await allMetrics.getMetricKeys(storylineId),
      metricsData: await this.getMetricsDataForUsersByUliIdArray(usersData)
    };
  }
}

module.exports = new UserMetrics();
