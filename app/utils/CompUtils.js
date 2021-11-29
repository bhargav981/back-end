const models = require("@models");
const _ = require("lodash");

class CompUtils {

    async getMetricsImpact(uliId,actionOptionIds, sprintNumber){
        const impactedMetrics = await this.getMetricsData(uliId,actionOptionIds, sprintNumber);
        const skillImpact = await this.getImpact(impactedMetrics, 1);
        const moraleImpact = await this.getImpact(impactedMetrics, 2);
        const csImpact = await this.getImpact(impactedMetrics, 5);

    }


    async getMetricsData(uliId,actionOptionIds, sprintNumber){
        const userActionOptionIds = await this.getUserActionOptionIds(uliId,actionOptionIds, sprintNumber);       
        const userMetricIds = await this.getUserMetricIds(userActionOptionIds);
        const userActionMetrics = this.getMetrics(userMetricIds);


        const eventIds = await this.getEventIds(actionOptionIds);
        const userEventIds = await this.getUserEvents(uliId,eventIds,sprintNumber);
        const userEventMetricIds = await this.getEventMetricIds(userEventIds);
        const userEventMetrics = this.getEventMetricImpact(userEventMetricIds);

        return [...await userActionMetrics, ...await userEventMetrics];

    }

    async getImpact (impactedMetrics,metricId){

        let metrics = impactedMetrics.filter(metric => metric.metricsId == metricId);
        metrics = _.map(metrics,'diff');

        const impact =  metrics.reduce(function(acc, val) { return acc + val; }, 0);
    }

    async getEventIds(actionOptionIds){
        const eventIds = await models.events_actions_conditions.findAll({
            where:{
                actionOptionId: actionOptionIds
            },
            raw: true
        });

        return _.map(eventIds,"eventId");
    }

    async getUserEvents(uliId,eventIds,sprintNumber){
        const userEvents = await models.user_events.findAll({
            where:{
                uliId,
                eventId: eventIds,
                sprintNumber
            },
            raw: true
        });

        return _.map(userEvents, 'id');
    }

    async getEventMetricIds(userEventIds){
        const userMetricsData = await models.user_events_metrics.findAll({
            where:{
                userEventId: userEventIds
            },
            raw: true
        });

        return _.map(userMetricsData,"userMetricsId");
    }

    async getEventMetricImpact(userMetricsId){
        let metrics = await models.user_metrics.findAll({
            where:{
                id: userMetricsId,
                metrics_id: [1,2,5]
            },
            attributes: {
				exclude: ['created_at', 'updated_at']
            },
            raw: true
        });

        let impactedMetrics = metrics.filter(metric => metric.diff != 0);

        return impactedMetrics;
    }


	async getUserActionOptionIds(uliId,actionOptionIds, sprintNumber){
        let userActionOptionData = await models.user_action_options.findAll({
			where: {
                uliId,
                actionOptionId: actionOptionIds,
                sprintNumber
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
            },
            raw: true
		});


        const userActionOptionIds = _.map(userActionOptionData, "id");
        // console.log(userActionOptionIds);

		return userActionOptionIds;
    }

    async getUserMetricIds(userActionOptionIds, actionOptionImpactMetricIds){
        let userActionOptionMetricData = await models.user_action_option_metrics.findAll({
            where:{
                userActionOptionId: userActionOptionIds
            },
            attributes: {
				exclude: ['created_at', 'updated_at']
            },
            raw: true
        });

        return userActionOptionMetricData;

        // console.log(userActionOptionMetricData, 'userActionOptionMetricData');

    }

    async getMetrics(metricIds){
        const userMetricsId = _.map(metricIds,"userMetricsId");

        let metrics = await models.user_metrics.findAll({
            where:{
                id: userMetricsId,
                metrics_id: [1,2,5]
            },
            attributes: {
				exclude: ['created_at', 'updated_at']
            },
            raw: true
        });


        let impactedMetrics = metrics.filter(metric => metric.diff != 0);

        return impactedMetrics;
        
    }



    async getActionOptionImpactMetricIds(actionOptionIds){
        let impactedMetricData = await models.action_option_metrics_impacts.findAll({
            where: {
                actionOptionId : actionOptionIds,
                metricId : [1,2,5]
            },
            attributes: {
				exclude: ['created_at', 'updated_at']
            },
            raw: true
        });

        let impacts = {};
        // console.log(impactedMetricData, 'impactedMetricData');
        impactedMetricData.map((impactMetric) => {
            // console.log(impactMetric)
            if (!impacts[impactMetric.actionOptionId]){
                impacts[impactMetric.actionOptionId] = [impactMetric.metricId]
            }else{
                impacts[impactMetric.actionOptionId].push(impactMetric.metricId)
            }
        });

        return impacts;
    }
}

module.exports = new CompUtils();