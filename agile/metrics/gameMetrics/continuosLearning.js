const _ = require("lodash");
const metricUtils = require("./metricUtils");
const utils = require("@utils/Utils");
const actions = require("@repositories/Actions");
const metrics = require("@repositories/Metrics");
const UserState = require("@repositories/UserState");
const user = require("@utils/User");
const metricRepo = require("@repositories/Metrics");

class ContinuosLearning{

    async getCompScore(actionOptionImpact,sprintNumer){
        const m1 = await metricUtils.getMeasuresImpact(actionOptionImpact,{11:1,12:3,13:1,34:2,35:1,8:2,14:2,19:1},sprintNumer);
        const m2 = await metricUtils.getMeasuresImpact(actionOptionImpact,{8:1},sprintNumer);
        const m3 = await metricUtils.getMeasuresImpact(actionOptionImpact,{25:2,26:1,36:2,37:1},sprintNumer);
        const m4 = await metricUtils.getMeasuresImpact(actionOptionImpact,{25:2,26:1,36:2,37:1},sprintNumer);
        const m5 = await metricUtils.getMeasuresImpact(actionOptionImpact,{25:2,26:1,8:1,14:2},sprintNumer);
        // console.log('m1 ',m1,'m2 ',m2,'m3 ',m3,'m4 ',m4,'m5 ',m5)
        // console.log('ContinuosLearning ',(m1+m2+m3+m4+m5)/5)
        return (m1+m2+m3+m4+m5)/5;
    }

    async getMetrics(uliId, sprintNumer,actionOptionImpact){
        const compScore = await this.getCompScore(actionOptionImpact,sprintNumer);   
        await user.createUserCompData(uliId, "learning", compScore.toFixed(2));     
        const compData = await metricRepo.getCompMeanAndSD("learning"); 
        const {mean, sd} = compData;
        const score = metricUtils.getFinalCompScore(compScore,mean,sd);
        return score;
    }

    async getGroupMetrics(competencyAvg,completedUserIds,metricId,allMetrics,universeData){
        const compAvg = competencyAvg.filter(comp => comp.key == "learning");
        const compScore = await metricUtils.getGroupCompAvg(compAvg);        
        const compData = await metricRepo.getCompMeanAndSD("learning"); 
        const {mean, sd} = compData;
        const score = metricUtils.getFinalCompScore(compScore,mean,sd);
        const metricData = allMetrics.find(metric => metric.key === "learning");
        const universe = universeData.find(comp => comp.key == "learning");

        const grade = metricUtils.getGroupGradeAndDesc(score, "learning");


        return {
            name: metricData.name,
            score: score,
            scoreLabel: 'label_report_score',
            icon: 'https://knolskape-website.s3.amazonaws.com/misc/suyog_patil/2019/06/20/18/continouos-learning.png',
            desc: 'label_group_comp_res_foc_desc',
            keytakeways: {
                title: 'label_group_key_takeaways_res_foc_desc',
                staticInsight:'label_group_key_takeaways_res_foc_action',
                points:[
                {
                    desc: 'label_group_key_takeaways_res_foc_take_1'
                }, 
                {
                  desc: 'label_group_key_takeaways_res_foc_take_2'
                },
                {
                    desc: 'label_group_key_takeaways_res_foc_take_3'
                },
                {
                    desc: 'label_group_key_takeaways_res_foc_take_4'
                },
                {
                    desc: 'label_group_key_takeaways_res_foc_take_5'
                } ,
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

        //const compScore = await this.getCompScore(actionOptionImpact);
        const score = await metricUtils.getFinalScore(uliId,metricUserData);
        const grade = metricUtils.getCompScoreGrade(score, "learning");

        return {
            name: metricData.name,
            score: score,
            id: metricData.metricsId,
            scoreLabel: 'label_report_score',
            icon: 'https://knolskape-website.s3.amazonaws.com/misc/suyog_patil/2019/06/20/18/continouos-learning.png',
            desc: metricData.description,
            points: [
                {
                    name: 'label_learning_point_name_1',
                    desc: 'label_learning_point_desc_1'
                },
                {
                    name: 'label_learning_point_name_2',
                    desc: 'label_learning_point_desc_2'
                },
                {
                    name: 'label_learning_point_name_4',
                    desc: 'label_learning_point_desc_4'
                },
                {
                    name: 'label_learning_point_name_5',
                    desc: 'label_learning_point_desc_5'
                },
                {
                    name: 'label_learning_point_name_6',
                    desc: 'label_learning_point_desc_6'
                }    
            ],
            grade: grade.grade,
            gradeDesc: grade.gradeDesc,
            graphData: await metricUserData,
            graphAxisLabels: [
                { axis: 'Y', name: 'label_learning' },
                { axis: 'X', name: 'label_report_graph_1_xaxis_label' }
            ],
            descriptionLabel: 'label_description',
            graphDesc: 'label_learning_graph_desc',
            insightLabel: 'label_insight',
            insightText: grade.insight        
        }
    }

}


module.exports = new ContinuosLearning();