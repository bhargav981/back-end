const _ = require ('lodash');
const models = require ('@models');
const users = require ('@repositories/Users');
const metrics = require ('@repositories/Metrics');

class LeaderBoardController {
  async get (ctx) {
    const thisUserId = ctx.loggedInUserObject.userLicenseID;
    let allUsersOfGroup = await users.getAllUsersByGroupId (
      ctx.loggedInUserObject.commonDBGroupID
    );

    let userIds = allUsersOfGroup.map (user => user.uliId);

    const gameStartedUsers = await models.user_state.findAll ({
      where: {
        uliId: userIds,
        isGameStarted: true,
      },
      raw: true,
    });

    userIds = gameStartedUsers.map (user => user.uliId);

    const userDetails = await models.users.findAll ({
      where: {
        uliId: userIds,
      },
      raw: true,
    });

    // const userDetails = allUsersOfGroup.map((user) => {
    //     console.log(_.includes(userIds, user.uliId))
    //     if(_.includes(userIds, user.uliId)){
    //         console.log("here")
    //         return user;
    //     }
    // });

    let metricsOfAllUsers = await metrics.getRecentUserMetricsOfAllUsers (
      userIds
    );

    
    let usersData = userDetails.map (user => {
      const metrics = metricsOfAllUsers.find (
        metric => metric.uliId === user.uliId
      );

      let metricsData = [];
      const userState = gameStartedUsers.find (u => u.uliId == user.uliId);
      metricsData.push (metrics);

      return {
        uliId: user.uliId,
        isSelf: user.uliId === thisUserId,
        email: user.email,
        userName: user.firstName
          ? user.firstName + ' ' + user.lastName
          : user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        currentDay: userState.currentDay > 0 ? userState.currentDay : 0,
        value: metrics.value,
        metrics: metricsData,
      };
    });

    // console.log(usersData)

    const maxValue = _.maxBy (usersData, 'value').value;
    usersData = _.orderBy (usersData, ['value'], ['desc']);

    let index = 0;
    let prevValue = -1;

    _ (_.orderBy (usersData, ['value'], ['desc'])).forEach (function (data, i) {
      if (prevValue != data.value) {
        index++;
      }
      prevValue = data.value;
      usersData[i].rank = index;
    });

    ctx.body = usersData;
  }
}

module.exports = new LeaderBoardController ();
