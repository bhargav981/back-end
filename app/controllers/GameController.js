const _ = require('lodash');
const user = require('@utils/User');
const models = require('@models');

const Features = require('@repositories/Features');
const Prds = require('@repositories/Prds');
const TeamMembers = require('@repositories/TeamMembers');
const Customers = require('@repositories/Customers');
const StorylineIntro = require('@repositories/StorylineIntro');
const Stories = require('@repositories/Stories');
const User = require('@repositories/Users');
const Priorities = require('@repositories/Priorities');
const Statuses = require('@repositories/Statuses');
const Actions = require('@repositories/Actions');
const ActionOptions = require('@repositories/Actions');
const Metrics = require('@repositories/Metrics');
const Events = require('@repositories/Events');
//TODO: MOVE LABELS TO REPOSITORIES
const Labels = require('@controllers/StringsController');

const UserState = require('@repositories/UserState');
// const Metrics = require('@repositories/Metrics');
const SprintManager = require('@agile/sprint/SprintManager');
const CustomerSpeaks = require('@repositories/CustomerSpeaks');
const ReportSpeaks = require('@repositories/ReportSpeaks');
const BlockersRepository = require('@repositories/Blockers');

const MetricsManager = require('@agile/metrics/MetricsManager');
const competencies = require("@agile/report/ReportCompetencies");
const agileComp = require ('@agile/metrics/gameMetrics/agileScore');
const nodeLoginWrapper = require('node-login-wrapper');

const Sentry = require('@sentry/node');

const Analytics = require('@controllers/AnalyticsController');

class GameController {
  async getGameData(ctx) {
    const userDetails = await user.getUser(ctx);
    const uliId = userDetails.uliId;
    const storylineId = await user.getStorylineId(uliId);
    const group = user.getGroup(userDetails.groupId);
    const features = await Features.getStorylineFeatures(storylineId);
    const prds = Prds.getStorylinePrds(storylineId);
    const teamMembers = TeamMembers.getStorylineTeamMembers(storylineId);
    const customers = Customers.getStorylineCustomers(storylineId);
    const storylineIntro = StorylineIntro.getData(storylineId);
    const actions = await Actions.getStorylineActions(storylineId);
    const actionOptions = Actions.getStorylineActionOptions(actions);

    const userStories = await Stories.getLatestUserStories(uliId);
    const userState = await UserState.getUserStateDetails(uliId);
    const userPrds = Prds.getUserPrds(uliId);
    const storyDetails = await Stories.getStoriesByUliId(uliId);
    const allMetrics = await Metrics.getStorylineMetrics(storylineId);
    const allUserMetrics = await Metrics.getAllUserMetrics(uliId);

    const groupedUserStoryDetails = _.groupBy(userStories, 'storyId');
    const latestUserStories = Object.keys(
      groupedUserStoryDetails
    ).map(eachStoryId => {
      return groupedUserStoryDetails[eachStoryId][0];
    });

    const labels = Labels.getLabelsData(ctx);
    const priorities = Priorities.getStorylinePriorities(storylineId);
    const statuses = Statuses.getStorylineStatuses(storylineId);

    const featureIds = features.map(eachFeature => {
      return eachFeature.id;
    });

    const stories = Stories.getStoriesByFeatureIds(featureIds);

    let customerSpeaks = await CustomerSpeaks.getStorylineCustomerSpeaks(
      storylineId
    );
    let reportSpeaks = await ReportSpeaks.getStorylineReportSpeaks(
      storylineId
    );
    customerSpeaks = _.groupBy(customerSpeaks, 'sprintNumber');
    reportSpeaks = _.groupBy(reportSpeaks, 'sprintNumber');

    const allUserStoryDetails = await Stories.getUserStoriesByUliId(uliId);
    const groupedAllUserStoryDetails = _.groupBy(
      allUserStoryDetails,
      'storyId'
    );

    let userSprintReports = [];
    const currentSprintNumber = userState.currentSprintNumber;
    const currentSprintState = userState.currentSprintState;

    const reportSprintNumber = currentSprintState === 4
      ? currentSprintNumber
      : currentSprintNumber - 1;
    for (let i = 1; i <= reportSprintNumber; i++) {
      userSprintReports.push(
        await SprintManager.getSprintReport(
          i,
          storyDetails,
          groupedAllUserStoryDetails,
          customerSpeaks,
          reportSpeaks,
          allMetrics,
          allUserMetrics
        )
      );
    }

    const metrics = Metrics.getStorylineMetrics(storylineId);
    const userMetrics = Metrics.getRecentUserMetrics(uliId);
    const userBlockers = this.getUserBlockers(uliId);

    const userActions = Actions.getUserActionsWithMetrics(uliId);
    const userEvents = await Events.getUserEventsWithMetrics(uliId);

    ctx.body = {
      userActions: await userActions,
      userEvents: await userEvents,
      userBlockers: await userBlockers,
      metrics: await metrics,
      userMetrics: await userMetrics,
      userSprintReports: userSprintReports,
      userDetails: userDetails,
      features: features,
      prds: await prds,
      teamMembers: await teamMembers,
      customers: await customers,
      storylineIntro: await storylineIntro,
      stories: await stories,
      userStories: latestUserStories,
      actions: actions,
      actionOptions: await actionOptions,
      labels: await labels,
      priorities: await priorities,
      statuses: await statuses,
      userState: userState,
      group: await group,
      userPrds: await userPrds,
      returnType: ctx.loggedInUserObject.logoutType,
      returnUrl: ctx.loggedInUserObject.returnUrl
    };
  }

  async gameStarted(ctx) {
    const uliId = await user.getUserId(ctx);


    let { req, res } = ctx;
    await nodeLoginWrapper.started(req, res);

    await User.setGameStarted(uliId);
    ctx.body = {
      success: true,
    };
  }


  async gameCompleted(ctx) {
    try {
      const uliId = await user.getUserId(ctx);


      let { req, res } = ctx;
      // console.log (result);
      await models.user_state.update({
        isGameCompleted: true
      }, {
        where: {
          uliId
        }
      });

      const score = await agileComp.getAgileScoreData(uliId)

      console.log("agileScore for this user", score.agileLeadershipScore / 10)

      await nodeLoginWrapper.completed(req, res);
      await nodeLoginWrapper.score(req, res, score.agileLeadershipScore / 10);

      Analytics.sendData(ctx);

      ctx.body = {
        success: true,
      };
    } catch (error) {
      Sentry.captureMessage('Completed status not saved' + JSON.stringify(error));
      ctx.throw(500, {
        msg: 'Completion status is not saved',
        error,
      });
    }
  }

  async getUserBlockers(uliId) {
    let userBlockers = await BlockersRepository.getUserBlockers(uliId);

    let blockerActions = await BlockersRepository.getAllBlockersActions();

    userBlockers = userBlockers.map(userBlocker => {
      let actions = [];

      actions = blockerActions.filter(
        blockerAction => blockerAction.blockerId === userBlocker.blockerId
      );

      return {
        ...userBlocker,
        actions,
      };
    });

    return userBlockers;
  }

  async saveSelectedPrd(ctx) {
    try {
      const { prdId } = ctx.request.body;

      const uliId = await user.getUserId(ctx);

      const storylineId = await user.getStorylineId(uliId);

      const prdDetails = await Prds.getStorylinePrdDetails(prdId, storylineId);

      const userStateDetails = await UserState.getUserStateDetails(uliId);

      let {
        currentDay,
        currentSprintNumber,
        currentSprintDay,
      } = userStateDetails;

      let updatedDay = currentDay + prdDetails.effort;

      await Prds.saveUserPrd(uliId, prdId, currentDay);

      await UserState.updateField(
        {
          currentDay: updatedDay,
        },
        {
          uliId,
        }
      );

      await MetricsManager.updateBudget(
        prdDetails.cost,
        uliId,
        null,
        currentSprintDay,
        currentSprintNumber,
        currentDay
      );

      const userState = await UserState.getUserStateDetails(uliId);
      const userPrds = await Prds.getUserPrds(uliId);
      const latestUserMetrics = await MetricsManager.getLatestMetrics(uliId);

      ctx.body = {
        success: true,
        userPrds,
        userState,
        userMetrics: latestUserMetrics,
      };
    } catch (error) {
      Sentry.captureMessage('prd is not saved' + JSON.stringify(error));
      ctx.throw(500, {
        msg: 'prd is not saved',
        error,
      });
    }
  }
}

module.exports = new GameController();
