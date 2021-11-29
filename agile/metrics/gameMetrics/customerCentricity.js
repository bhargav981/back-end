const _ = require("lodash");
const metricUtils = require("./metricUtils");
const utils = require("@utils/Utils");
const actions = require("@repositories/Actions");
const metrics = require("@repositories/Metrics");
const UserState = require("@repositories/UserState");
const user = require("@utils/User");
const metricRepo = require("@repositories/Metrics");


class CustomerCentricity{
    async getCompScore(actionOptionImpact,sprintNumer){
        const m1 = await metricUtils.getMeasuresImpact(actionOptionImpact,{1: 1,2:2,23:1,3:2,32:1},sprintNumer);
        const m2= await metricUtils.getMeasuresImpact(actionOptionImpact,{1: 1,2:2,23:1,3:2,32:1},sprintNumer);
        
        return (m1+m2 )/ 2;

    }

    async getMetrics(uliId, sprintNumer,actionOptionImpact){
        const compScore = await this.getCompScore(actionOptionImpact,sprintNumer);        
        await user.createUserCompData(uliId, "centricity",compScore.toFixed(2));
        const compData = await metricRepo.getCompMeanAndSD("centricity"); 
        const {mean, sd} = compData;
        const score = metricUtils.getFinalCompScore(compScore,mean,sd);
        return score;
    }

    async getGroupMetrics(competencyAvg,completedUserIds,metricId,allMetrics,universeData){

        const compAvg = competencyAvg.filter(comp => comp.key == "centricity");
        const compScore = await metricUtils.getGroupCompAvg(compAvg);        
        const compData = await metricRepo.getCompMeanAndSD("centricity"); 
        const {mean, sd} = compData;
        const score = metricUtils.getFinalCompScore(compScore,mean,sd);
        const metricData = allMetrics.find(metric => metric.key === "centricity");
        const universe = universeData.find(comp => comp.key == "centricity");

        const grade = metricUtils.getGroupGradeAndDesc(score, "centricity");


        return {
            name: metricData.name,
            score: score,
            scoreLabel: 'label_report_score',
            icon: 'https://knolskape-website.s3.amazonaws.com/misc/suyog_patil/2019/06/20/4/customer-centricity-icon.png',
            desc: 'label_group_comp_cust_cent_desc',
            keytakeways: {
                title: 'label_group_key_takeaways_cust_desc',
                staticInsight: 'label_group_key_takeaways_cust_action',
                points:[
                {
                   
                    desc: 'label_group_key_takeaways_cust_take_1'
                }, 
                {

                    desc: 'label_group_key_takeaways_cust_take_2'
                } 
            ]},
            universe: universe.value,
            grade: grade.grade,
            gradeDesc: grade.insight,
            width: score*10+'%',
            marginLeftGroup: (score/10)* 250+'px',
            marginLeftUniverse: (universe.value/10)* 250+'px',
            graphData: await metricRepo.getCompetencyDistribution(completedUserIds,metricId),
            // graphAxisLabels: [
            //     { axis: 'Y', name: 'label_customer_centricity' },
            //     { axis: 'X', name: 'label_report_graph_1_xaxis_label' }
            // ],
            // descriptionLabel: 'label_description',
            // graphDesc: 'label_cutomer_centricity_graph_desc',
            // insightLabel: 'label_insight',
            // insightText: grade.insight        
        }
    }

    async getCompetencyData(uliId, metricKey, actionOptionImpact, allMetrics){

        const metricData = allMetrics.find(metric => metric.key === metricKey);
        const metricId = metricData.metricsId;
        const metricUserData = await metrics.getLatestSprintWiseMetrics(uliId, metricId);

        //const compScore = await this.getCompSvore(actionOptionImpact);      
        const score = await metricUtils.getFinalScore(uliId,metricUserData);

        const grade = metricUtils.getCompScoreGrade(score, "customer_centricity");


        return {
            name: metricData.name,
            score: score,
            id: metricData.metricsId,
            scoreLabel: 'label_report_score',
            icon: 'https://knolskape-website.s3.amazonaws.com/misc/suyog_patil/2019/06/20/4/customer-centricity-icon.png',
            desc: metricData.description,
            points: [
                {
                    name: 'label_customer_centricity_point_name_1',
                    desc: 'label_customer_centricity_point_desc_1'
                }, 
                {
                    name: 'label_customer_centricity_point_name_2',
                    desc: 'label_customer_centricity_point_desc_2'
                } 
            ],
            grade: grade.grade,
            gradeDesc: grade.gradeDesc,
            graphData: await metricUserData,
            graphAxisLabels: [
                { axis: 'Y', name: 'label_customer_centricity' },
                { axis: 'X', name: 'label_report_graph_1_xaxis_label' }
            ],
            descriptionLabel: 'label_description',
            graphDesc: 'label_cutomer_centricity_graph_desc',
            insightLabel: 'label_insight',
            insightText: grade.insight        
        }
    }

}


module.exports = new CustomerCentricity();