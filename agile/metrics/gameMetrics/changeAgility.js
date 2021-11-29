const _ = require("lodash");
const metricUtils = require("./metricUtils");
const utils = require("@utils/Utils");
const actions = require("@repositories/Actions");
const metrics = require("@repositories/Metrics");
const UserState = require("@repositories/UserState");
const user = require("@utils/User");
const metricRepo = require("@repositories/Metrics");

class ChangeAgility{
    async getCompScore(actionOptionImpact,sprintNumer){
        // console.log(actionOptionImpact, 'ac')
        // echo("here")
        const m1 = await metricUtils.getMeasuresImpact(actionOptionImpact,{4:2,15:3,19:1},sprintNumer);
        const m2 = await metricUtils.getMeasuresImpact(actionOptionImpact,{4:2,15:3,19:1},sprintNumer);
        const m3 = await metricUtils.getMeasuresImpact(actionOptionImpact,{4:2,15:3,19:1},sprintNumer);
        // console.log('m1 ',m1,'m2 ',m2,'m3 ',m3)
        // console.log('ChangeAgility ', (m1+m2+m3)/3)
        return (m1+m2+m3)/3;
    }

    async getMetrics(uliId, sprintNumer,actionOptionImpact){
        const compScore = await this.getCompScore(actionOptionImpact,sprintNumer);     
        await user.createUserCompData(uliId, "changeAgility", compScore.toFixed(2));   
        const compData = await metricRepo.getCompMeanAndSD("changeAgility");
        const {mean, sd} = compData; 
        const score = metricUtils.getFinalCompScore(compScore, mean , sd);
        return score;
    }

    async getGroupMetrics(competencyAvg,completedUserIds,metricId,allMetrics,universeData){
        const compAvg = competencyAvg.filter(comp => comp.key == "changeAgility");
        const compScore = await metricUtils.getGroupCompAvg(compAvg);        
        const compData = await metricRepo.getCompMeanAndSD("changeAgility"); 
        const {mean, sd} = compData;
        const score = metricUtils.getFinalCompScore(compScore,mean,sd);
        const metricData = allMetrics.find(metric => metric.key === "changeAgility");
        const universe = universeData.find(comp => comp.key == "changeAgility");

        const grade = metricUtils.getGroupGradeAndDesc(score, "changeagility");

        return {
            name: metricData.name,
            score: score,
            scoreLabel: 'label_report_score',
            icon: 'https://knolskape-website.s3.amazonaws.com/misc/suyog_patil/2019/06/20/92/change-agility-icon.png',
            desc: 'label_group_comp_chan_agil_desc',
            keytakeways: {
                title: 'label_group_key_takeaways_chan_agil_desc',
                staticInsight: 'label_group_key_takeaways_chan_agil_action',
                points:[
                {
                    desc: 'label_group_key_takeaways_chan_agil_take_1'
                }, 
                {
                    desc: 'label_group_key_takeaways_chan_agil_take_2'
                },
                {
                    desc: 'label_group_key_takeaways_chan_agil_take_3'
                } 
            ],
                   
        },
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
        
       // const compScore = await this.getCompScore(actionOptionImpact);
       const score = await metricUtils.getFinalScore(uliId,metricUserData);
        const grade = metricUtils.getCompScoreGrade(score, "change_agility");
    
        return {
            name: metricData.name,
            score: score,
            id: metricData.metricsId,
            scoreLabel: 'label_report_score',
            icon: 'https://knolskape-website.s3.amazonaws.com/misc/suyog_patil/2019/06/20/92/change-agility-icon.png',
            desc: metricData.description,
            points: [
                {
                    name: 'label_change_agility_point_name_1',
                    desc: 'label_change_agility_point_desc_1'
                },
                {
                    name: 'label_change_agility_point_name_2',
                    desc: 'label_change_agility_point_desc_2'
                },
                {
                    name: 'label_change_agility_point_name_3',
                    desc: 'label_change_agility_point_desc_3'
                }
            ],
            grade: grade.grade,
            gradeDesc: grade.gradeDesc,
            graphData: await metricUserData,
            graphAxisLabels: [
                { axis: 'Y', name: 'label_change_agility' },
                { axis: 'X', name: 'label_report_graph_1_xaxis_label' }
            ],
            descriptionLabel: 'label_description',
            graphDesc: 'label_change_agility_graph_desc',
            insightLabel: 'label_insight',
            insightText: grade.insight        
        }
    }

}


module.exports = new ChangeAgility();