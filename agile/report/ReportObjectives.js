const pa = require ('@agile/metrics/gameMetrics/pa');
const userStateDetails = require ('@repositories/UserState');
const metrics = require ('@repositories/Metrics');

class ReportObjectives {
  async getObjectives (uliId, allMetrics) {
    const paMetricKey = 'pa';
    const paMetric = allMetrics.find (metric => metric.key === paMetricKey);
    const metricId = paMetric.metricsId;
    const paMetricData = metrics.getLatestSprintWiseMetrics (uliId, metricId);

    const progress = await pa.getMetrics (uliId);
    const isCompleted = progress == 100;
    const objective = this.getObjectiveMessage (isCompleted, progress);
    const userState = await userStateDetails.getUserStateDetails (uliId);

    return {
      title: 'label_report_objectives_title',
      targetAchievedStatusTexts: [
        'label_report_achieved',
        'label_report_failed',
      ],
      objectivesList: [
        {
          name: 'label_report_objectives_1',
          value: progress,
          isCompleted,
          description: 'label_report_objectives_1_desc',
        },
        {
          isEnabled: isCompleted,
          name: 'label_launch_timeline',
          value: userState.currentDay,
          maxValue: 50,
          isCompleted: false,
          deadlineCrossedLabel: this.getDeadlineLabel (isCompleted),
          description: 'label_deadline_crossed_desc',
        },
      ],
      targetLabel: 'label_report_target',
      startLabel: 'label_report_start',
      deadlineLabel: 'label_report_deadline',
      objectivesMessage: objective.message,
      graphHeader: 'label_product_customer_fit',
      graphData: await paMetricData,
      graphAxisLabels: [
        {axis: 'Y', name: 'label_report_objectives_graph_yaxis_label'},
        {axis: 'X', name: 'label_report_sprints'},
      ],
    };
  }

  getDeadlineLabel (isCompleted) {
    return isCompleted ? 'label_deadline_crossed' : 'label_deadline_missed';
  }

  getObjectiveMessage (isCompleted, progress) {
    console.log (progress, 'progress');
    if (isCompleted) {
      return {
        message: 'label_objective_achieved',
      };
    } else if (progress >= 75) {
      return {
        message: 'label_objective_just_missed',
      };
    } else {
      return {
        message: 'label_objective_failed',
      };
    }
  }
}

module.exports = new ReportObjectives ();
