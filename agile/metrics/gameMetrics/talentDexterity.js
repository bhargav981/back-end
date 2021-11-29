const _ = require("lodash");
const metricUtils = require("./metricUtils");
const utils = require("@utils/Utils");
const actions = require("@repositories/Actions");
const metrics = require("@repositories/Metrics");
const UserState = require("@repositories/UserState");
const user = require("@utils/User");
const metricRepo = require("@repositories/Metrics");

class TalentDexterity{
    async getCompScore(actionOptionImpact,sprintNumer){
        const m1 = await metricUtils.getMeasuresImpact(actionOptionImpact,{5:3,24:2,20:1,9:2,22:3,11:2,12:3,13:1,34:2,35:1,27:2,28:1,10:1,33:2},sprintNumer);
        const m2 = await metricUtils.getMeasuresImpact(actionOptionImpact,{5:3,24:2,20:1,16:1,17:1,18:1},sprintNumer);
        const m3 = await metricUtils.getMeasuresImpact(actionOptionImpact,{7:2},sprintNumer);
        const m4 = await metricUtils.getMeasuresImpact(actionOptionImpact,{27:2,28:1},sprintNumer);
        // console.log('m1 ',m1,'m2 ',m2,'m3 ',m3,'m4 ',m4)
        // console.log('TalentDexterity', (m1+m2+m3+m4)/4)
        return (m1+m2+m3+m4)/4;
    }

    async getMetrics(uliId, sprintNumer,actionOptionImpact){
        const compScore = await this.getCompScore(actionOptionImpact,sprintNumer);        
        await user.createUserCompData(uliId,"dexterity", compScore.toFixed(2));
        const compData = await metricRepo.getCompMeanAndSD("dexterity"); 
        const {mean, sd} = compData;
        const score = metricUtils.getFinalCompScore(compScore,mean,sd);
        return score;
    }
    
    async getGroupMetrics(competencyAvg,completedUserIds,metricId,allMetrics,universeData){
        const compAvg = competencyAvg.filter(comp => comp.key == "dexterity");
        const compScore = await metricUtils.getGroupCompAvg(compAvg);        
        const compData = await metricRepo.getCompMeanAndSD("dexterity"); 
        const {mean, sd} = compData;
        const score = metricUtils.getFinalCompScore(compScore,mean,sd);
        const metricData = allMetrics.find(metric => metric.key === "dexterity");
        const universe = universeData.find(comp => comp.key == "dexterity");
        const grade = metricUtils.getGroupGradeAndDesc(score, "dexterity");

        return {
            name: metricData.name,
            score: score,
            scoreLabel: 'label_report_score',
            icon: 'https://knolskape-website.s3.amazonaws.com/misc/suyog_patil/2019/06/20/35/talent-dexterity.png',
            desc: 'label_group_comp_coll_desc',
            keytakeways: {
                title: 'label_group_key_takeaways_coll_desc',
                staticInsight: 'label_group_key_takeaways_coll_action',
                points:[
                {
                    desc: 'label_group_key_takeaways_coll_take_1'
                }, 
                {
                    desc: 'label_group_key_takeaways_coll_take_2'
                },
                {
                    desc: 'label_group_key_takeaways_coll_take_3'
                },
                {
                    desc: 'label_group_key_takeaways_coll_take_4'
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
       
        //const compScore = await this.getCompScore(actionOptionImpact);
        const score = await metricUtils.getFinalScore(uliId,metricUserData);
        const grade = metricUtils.getCompScoreGrade(score, "talent_dexterity");
        console.log(score);
        return {
            name: metricData.name,
            score: score,
            id: metricData.metricsId,
            scoreLabel: 'label_report_score',
            icon: 'https://knolskape-website.s3.amazonaws.com/misc/suyog_patil/2019/06/20/35/talent-dexterity.png',
            desc: metricData.description,
            points: [
                {
                    name: 'label_talent_dexterity_point_name_1',
                    desc: 'label_talent_dexterity_point_desc_1'
                },
                {
                    name: 'label_talent_dexterity_point_name_2',
                    desc: 'label_talent_dexterity_point_desc_2'
                },
                {
                    name: 'label_talent_dexterity_point_name_3',
                    desc: 'label_talent_dexterity_point_desc_3'
                },
                {
                    name: 'label_talent_dexterity_point_name_4',
                    desc: 'label_talent_dexterity_point_desc_4'
                }  
            ],
            grade: grade.grade,
            gradeDesc: grade.gradeDesc,
            graphData: await metricUserData,
            graphAxisLabels: [
                { axis: 'Y', name: 'label_talent_dexterity' },
                { axis: 'X', name: 'label_report_graph_talent_dexterity_xaxis_label' }
            ],
            descriptionLabel: 'label_description',
            graphDesc: 'label_talent_dexterity_graph_desc',
            insightLabel: 'label_insight',
            insightText: grade.insight        
        }
    }

}


module.exports = new TalentDexterity();