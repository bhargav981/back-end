const metrics = require ('@repositories/Metrics');
const userRepo = require ('@repositories/Users');
const userStateRepo = require ('@repositories/UserState');
const _ = require ('lodash');

const user = require('@utils/User');
const centricityComp = require ('@agile/metrics/gameMetrics/customerCentricity');
const changeAgilityComp = require ('@agile/metrics/gameMetrics/changeAgility');
const learningComp = require ('@agile/metrics/gameMetrics/continuosLearning');
const dexterityComp = require ('@agile/metrics/gameMetrics/talentDexterity');
const agileComp = require ('@agile/metrics/gameMetrics/agileScore');

const labels = require ('@controllers/StringsController');
const products = require ('@config/knolskapeProducts.js');

const models = require ('@models');

class GroupReports {
  //view the html in browser
  async returnHtmlView (ctx) {
    const {grpId} = ctx.params;
    const group = await this.getGroupDetails (ctx);
    const appUrl =  process.env.COMMONDB_DEFAULT_REDIRECT_URI.replace(
      "/login",
      ""
  );
    const html = await this.getGroupReportHtml ([grpId], group, ctx, appUrl);
    return html;
  }

  //function to return group report data to konsole
  async getGroupAggregateReportData (ctx) {
    const {grpId} = ctx.params;
    const group = await this.getGroupDetails (ctx);
    const appUrl =  process.env.COMMONDB_DEFAULT_REDIRECT_URI.replace(
      "/login",
      ""
  );
    const html = await this.getGroupReportHtml ([grpId], group, ctx, appUrl);

    return {
      grpId: grpId,
      isReportReady: 1,
      type: 'headlesschrome',
      version: 'v1.0.1',
      reportHTML: html,
      options: {
        pdf: {
          width: '595px',
          height: '843px',
        },
      },
    };
  }

  //to download batch report
  async getBatchReport (ctx) {
    const grpIds = ctx.query.grpIds.split (',');
    let name = ctx.query.name;
    name =  name ? name : 'BATCH REPORT';

    const group = {
      name
    };
    
    const appUrl = process.env.COMMONDB_DEFAULT_REDIRECT_URI.replace(
      "/login",
      ""
    );

    const html = await this.getGroupReportHtml (grpIds, group, ctx , appUrl);

    return html;

  }

  //view of the group report
  async getGroupReportHtml (grpIds, group, ctx , appUrl) {
    
    const {grpId} = ctx.params;

    const grp = await user.getGroup (grpId);
    const data = await this.getGroupReportData (grpIds);
    const label = await labels.getAllLabels (grp)

    let json = {
      groupData: {
        completedUsersCount: data.completedUsersCount,
        name: group.name || 'GROUP REPORT',
      },
      ...data,
      knolskapeProducts: products(label),
      compGrades: this.getCompGrades (),
      labels: label,
      lang: grp.lang
    };

    await ctx.render ('report/agileGroup', {
      appUrl,
      json,
    });

    return ctx.body;
  }

  //to get single group deatils
  async getGroupDetails (ctx) {
    const {grpId} = ctx.params;
    const group = await models.groups.find ({
      where: {
        id: grpId,
      },
      raw: true,
    });
    return group;
  }

  async getGroupReportData (grpIds) {
    let userData = await userRepo.getAllUsersByGroupId (grpIds);
    const userIds = _.map (userData, 'uliId');
    const completedUserData = await userStateRepo.getAllCompletedUserStateDetails (
      userIds
    );
    const completedUserIds = _.map (completedUserData, 'uliId');

    let json = {};

    json.completedUsersCount = completedUserIds.length;

    const meansd = await this.getMeanAndSd ();

    const pa = await metrics.getLatestSprintWiseMetricsForGroup (
      completedUserIds,
      6,
      meansd
    );

    const cs = await metrics.getLatestSprintWiseMetricsForGroup (
      completedUserIds,
      5,
      meansd
    );
    
    const skill = await metrics.getLatestSprintWiseMetricsForGroup (
      completedUserIds,
      1,
      meansd
    );
    const morale = await metrics.getLatestSprintWiseMetricsForGroup (
      completedUserIds,
      2,
      meansd
    );

    const accuracy = await metrics.getLatestSprintWiseMetricsForGroup2 (
      completedUserIds,
      8,
      meansd
    );
    const velocity = await metrics.getLatestSprintWiseMetricsForGroup2 (
      completedUserIds,
      9,
      meansd
    );
    const efficiency = await metrics.getLatestSprintWiseMetricsForGroup2 (
      completedUserIds,
      10,
      meansd
    );

    const otherMetricsData = await this.getStoryMetrics (
      accuracy,
      velocity,
      efficiency,
      meansd
    );

    const competencyScores = await this.getCompetencyScores (
      completedUserIds,
      pa,
      cs
    );

    json.agile = competencyScores.agileScore;
    json.competencies = competencyScores.competencies;
    json.pa = pa;
    json.pa.value = pa.metricValues.length
      ? pa.metricValues[pa.metricValues.length - 1]
      : 0;
    json.skill = skill;
    json.morale = morale;
    json.cs = cs;
    json.otherMetricsData = otherMetricsData;

    return json;
  }

  async getStoryMetrics (accuracy, velocity, efficiency,meansd) {
    accuracy.value = Math.round(accuracy.metricValues * 100)/100;
    velocity.value = Math.round(velocity.metricValues * 100)/100;;
    efficiency.value = Math.round(efficiency.metricValues * 100)/100;;

    return [
      {
        value: velocity.value,
        displayValue: velocity.value,
        name: 'label_group_velocity_title',
        description: 'label_group_velocity_desc',
        grade: this.calculateScoreRange (velocity.value, meansd, 'velocity').grade,
        color: this.calculateScoreRange (velocity.value, meansd, 'velocity').color,
      },
      {
        value: accuracy.value,
        displayValue: accuracy.value+'%',
        name: 'label_group_relevance_title',
        description: 'label_group_relevance_desc',
        grade: this.calculateScoreRange (accuracy.value, meansd, 'accuracy').grade,
        color: this.calculateScoreRange (accuracy.value, meansd, 'accuracy').color,
      },
      {
        value: efficiency.value,
        displayValue: efficiency.value+'%',
        name: 'label_group_efficiency_title',
        description: 'label_group_efficiency_desc',
        grade: this.calculateScoreRange (
          efficiency.value,
          meansd,
          'efficiency'
        ).grade,
        color: this.calculateScoreRange (
          efficiency.value,
          meansd,
          'efficiency'
        ).color,
      },
    ];
  }

  async getCompetencyScores (completedUserIds, pa, cs) {
    const allMetrics = await metrics.getStorylineMetrics (1);
    const compData = await metrics.getCompAvgOfGroup (completedUserIds);

    const universeData = await models.universe_data.findAll ({
      raw: true,
    });

    const centricity = await centricityComp.getGroupMetrics (
      compData,
      completedUserIds,
      12,
      allMetrics,
      universeData
    );
    const changeAgility = await changeAgilityComp.getGroupMetrics (
      compData,
      completedUserIds,
      13,
      allMetrics,
      universeData
    );
    const dexterity = await dexterityComp.getGroupMetrics (
      compData,
      completedUserIds,
      14,
      allMetrics,
      universeData
    );
    const learning = await learningComp.getGroupMetrics (
      compData,
      completedUserIds,
      15,
      allMetrics,
      universeData
    );

    const agileScore = await agileComp.getAgileScoreDataForGroup (
      compData,
      pa,
      cs,
      completedUserIds,
      11,
      universeData
    );

    return {
      competencies: [centricity, changeAgility, learning, dexterity],
      agileScore,
    };
  }

  calculateScoreRange (score, meanSd, key) {
    const thisMetric = meanSd.find (metric => metric.key === key);
    const {mean, sd} = thisMetric;
    const low = mean - 0.5 * sd;
    const high = mean + 0.5 * sd;

    if (score <= low) {
      return {grade:'label_low',color:'#FF944D'};
    } else if (score > low && score < high) {
      return {grade:'label_medium',color:'#E6C846'};
    } else {
      return {grade:'label_high',color:'#30A82C'};
    }
  }

  getCompGrades () {
    return [
      {
        value: 'label_comp_grade_novice',
        color: '#A01313',
      },
      {
        value: 'label_comp_grade_emerging',
        color: '#EB8822',
      },
      {
        value: 'label_comp_grade_competent',
        color: '#F3D70A',
      },
      {
        value: 'label_comp_grade_proficient',
        color: '#6DC75D',
      },
      {
        value: 'label_comp_grade_rolemodel',
        color: '#1C9443',
      },
    ];
  }

  async getMeanAndSd () {
    const meanSd = await models.competency_mean_sd_values.findAll ({
      raw: true,
    });

    return meanSd;
  }


  //to update mean and sd of metrics
  async mean (ctx) {
    const {metricId} = ctx.request.body;

    const userData = await models.user_state.findAll ({
      where: {
        isGameCompleted: true,
      },
      raw: true,
    });

    const completedUserIds = _.map (userData, 'uliId');

    const avg = await metrics.updateMeanSD (completedUserIds, metricId);
    return avg;
  }
}

module.exports = new GroupReports ();
