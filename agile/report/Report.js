const user = require('@utils/User');
const models = require('@models');
const _ = require("lodash");
const reportStrings = require("./ReportStrings");
const reportMetrics = require("./ReportMetrics");
const reportObjectives = require("./ReportObjectives");
const labels = require("@controllers/StringsController");
const metrics = require("@repositories/Metrics");
const competencies = require("./ReportCompetencies");
const userStateRepo = require("@repositories/UserState");
const MetricsManager = require("@agile/metrics/MetricsManager");

const products = require('@config/knolskapeProducts.js');
class Report {

  async getReportData(ctx, uliId) {

    let actionOptionImpact = await models.user_action_option_impact_sprint_values.findAll({
      where: {
        uliId
      },
      raw: true
    });

    const grpId = await user.getGroupId(uliId);
    const grp = await user.getGroup(grpId);
    const userState = await userStateRepo.getUserStateDetails(uliId);
    const sprintDay = userState.currentSprintDay;
    const day = userState.currentDay;
    const sprintNumber = userState.currentSprintNumber;

    // await actionOptionImpact;

    await MetricsManager.calculateCustomerCentricity(uliId, null, sprintDay, sprintNumber, day, actionOptionImpact);
    await MetricsManager.calculateChangeAgility(uliId, null, sprintDay, sprintNumber, day, actionOptionImpact);
    await MetricsManager.calculateTalentDexterity(uliId, null, sprintDay, sprintNumber, day, actionOptionImpact);
    await MetricsManager.calculateContinuosLearning(uliId, null, sprintDay, sprintNumber, day, actionOptionImpact);


    const userData = await user.getUserByUliId(uliId);
    const storylineId = await user.getStorylineId(uliId);
    const allMetrics = await metrics.getStorylineMetrics(storylineId);
    const comp = await competencies.getReportCompetencies(uliId, allMetrics);
    const label = await labels.getLabelsDataForCmnDb(uliId)

    return {
      user: {
        userName: userData.firstName ? userData.firstName + ' ' + userData.lastName : userData.email
      },
      about: reportStrings.getAboutText(),
      agileScore: comp.agileScore,
      othermetrics: await reportMetrics.getMetrics(uliId, allMetrics, storylineId),
      labels: label,
      objectives: await reportObjectives.getObjectives(uliId, allMetrics),
      competencies: comp.finalComp,
      keyTakeAways: this.getKeyTakeAways(),
      knolskapeProducts: products(label),
      userDetails: userData,
      lang: grp.lang
    }
  }

  getKeyTakeAways() {
    return {
      "heading": 'label_key_take_aways',
      "points": [
        'label_kt_1',
        'label_kt_2',
        'label_kt_3',
        'label_kt_4'
      ]
    }
  }

  async getReportUrl(uliId) {
    let reportUrlData = await models.user_reports.findOne(
      {
        where: {
          uliId: uliId,
        },
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        raw: true,
      }
    )
    return reportUrlData;
  }

}

module.exports = new Report();