const user = require('@utils/User');
const models = require('@models');
const _ = require("lodash");
const metrics = require("@repositories/Metrics");
const stories = require("@repositories/Stories");

const accuracy = require("@agile/metrics/gameMetrics/accuracy");
const velocity = require("@agile/metrics/gameMetrics/velocity");
const efficiency = require("@agile/metrics/gameMetrics/efficiency");

const util = require("@app/utils/Utils");

class ReportMetrics {
    async getMetrics(uliId, allMetrics,storylineId) {

        const graph1Data = this.getMetricGraph1Data(uliId, allMetrics);
        const graph2Data = this.getMetricGraph2Data(uliId, allMetrics);
        const progressBarData = this.getProgressBarData(storylineId, uliId);
        const metricsWithSingleValue = [
            await this.getVelocity(allMetrics, uliId),
            await this.getAccuracy(allMetrics, uliId),
            await this.getEfficiency(allMetrics, uliId)
        ];
        return {
            title: 'label_report_other_metrics',
            graph1: await graph1Data,
            graph2: await graph2Data,
            progressBar: await progressBarData,
            metricsWithSingleValue
        }
    }

    async getProgressBarData(storylineId, uliId){
        const userStories = await stories.getLatestUserStories(uliId);
        const totalStories = await stories.getStorylineStories(storylineId);
        const totalTasks = totalStories.length;
        const completedTasks = userStories.filter(story => story.storyStatus == 4).length;
        const inProgressTasks = userStories.filter(story => story.storyStatus == 3).length;
        const notStartedTasks = totalTasks - (completedTasks + inProgressTasks);

        return {
            name: 'label_report_story_completion_title',
            desc: 'label_report_story_completion_description',
            completed: completedTasks,
            inProgress: inProgressTasks,
            notStarted: notStartedTasks,
            totalTasksText: 'label_report_total_tasks',
            completedLabel: 'label_report_completed_tasks',
            inProgressLabel: 'label_report_progress_tasks',
            notStartedLabel: 'label_report_not_started_tasks'
        }
    }

    async getMetricGraph1Data(uliId, allMetrics) {
        const metricKey = "cs";
        const csMetric = allMetrics.find(metric => metric.key === metricKey);
        const metricId = csMetric.metricsId;
        const metricData = metrics.getLatestSprintWiseMetrics(uliId, metricId);

        return {
            name: 'label_customer_focus_in_graph',   //This label is to display Customer Focus
            desc: csMetric.description,
            graphData: await metricData,
            graphAxisLabels: [{
                    axis: 'Y',
                    name: 'label_report_graph_1_yaxis_label'
                },
                {
                    axis: 'X',
                    name: 'label_report_graph_1_xaxis_label'
                }
            ]
        };
    }

    async getMetricGraph2Data(uliId, allMetrics) {
        const skillMetricKey = "skill";
        const skillMetric = allMetrics.find(metric => metric.key === skillMetricKey);
        
        const skillMetricId = skillMetric.metricsId;
        const skillMetricData = metrics.getLatestSprintWiseMetrics(uliId, skillMetricId);

        const moraleMetricKey = "morale";
        const moraleMetric = allMetrics.find(metric => metric.key === moraleMetricKey);
        const moraleMetricId = moraleMetric.metricsId;
        const moraleMetricData = metrics.getLatestSprintWiseMetrics(uliId, moraleMetricId);

        return {
            name: 'label_metric_graph2_name',
            desc: 'label_metric_graph2_desc',
            skillData: await skillMetricData,
            moraleData: await moraleMetricData,
            graphAxisLabels: [{
                    axis: 'Y',
                    name: 'label_report_graph_2_yaxis_label'
                },
                {
                    axis: 'X',
                    name: 'label_report_graph_2_xaxis_label'
                }
            ]
        };
    }

    async getAccuracy(allMetrics, uliId){
        const accuracyMetricKey = "accuracy";
        const accuracyMetric = allMetrics.find(metric => metric.key === accuracyMetricKey);
        const accuracyMetricId = accuracyMetric.metricsId;
        const accuracyMetricData = await metrics.getLatestSprintWiseMetrics(uliId, accuracyMetricId);
        const accuracyLength = accuracyMetricData.length ? accuracyMetricData.length-1 : 1;

        const accuracyValue = _.sum(accuracyMetricData)/accuracyLength;
        return {
            name: accuracyMetric.name,
            description: 'label_metric_desc_accuracy_report',
            value: util.convertToDecimal(accuracyValue) + "%"
        };
    }   

    async getEfficiency(allMetrics, uliId){
        const efficiencyMetricKey = "efficiency";
        const efficiencyMetric = allMetrics.find(metric => metric.key === efficiencyMetricKey);
        const efficiencyMetricId = efficiencyMetric.metricsId;
        const efficiencyMetricData = await metrics.getLatestSprintWiseMetrics(uliId, efficiencyMetricId);
        const efficiencyLength = efficiencyMetricData.length ? efficiencyMetricData.length-1 : 1;
        const efficiencyValue = _.sum(efficiencyMetricData)/efficiencyLength;

        return {
            name: efficiencyMetric.name,
            description: 'label_metric_desc_efficiency_report',
            value: util.convertToDecimal(efficiencyValue)+"%"
        };
    }

    async getVelocity(allMetrics, uliId){
        const velocityMetricKey = "velocity";
        const velocityMetric = allMetrics.find(metric => metric.key === velocityMetricKey);
        const velocityMetricId = velocityMetric.metricsId;
        const velocityMetricData = await metrics.getLatestSprintWiseMetrics(uliId, velocityMetricId);
        const velocityLength = velocityMetricData.length ? velocityMetricData.length-1 : 1;
        const velocityValue = _.sum(velocityMetricData)/velocityLength;
        return {
            name: velocityMetric.name,
            description: 'label_metric_desc_velocity_report',
            value: util.convertToDecimal(velocityValue)
        };
    }

    async getAgileScore() {

    }

    async getAgileGradeAndDesc() {

    }

}

module.exports = new ReportMetrics();