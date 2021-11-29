const _ = require("lodash");
const metricUtils = require("./metricUtils");
const utils = require("@utils/Utils");
const actions = require("@repositories/Actions");
const metrics = require("@repositories/Metrics");
const UserState = require("@repositories/UserState");
const models = require('@models');
const user = require("@utils/User");

class AgileScore{

    async getScore(uliId){
        // console.log('agile')
        const userMetrics = await metrics.getRecentUserMetrics(uliId);
        const userState =  await this.getUserState(uliId);
        const pa = await this.getPCF(uliId,userMetrics,userState);
        const cs = await this.getCS(uliId, userMetrics);
        let comp = await metrics.getUserCompetenciesRawScore(uliId);
        
        comp = comp.filter(eachComp => eachComp.key !== 'agileleader'); 
        const avg = this.otherCompAverage(comp);
        
        
        const compData = await metrics.getCompMeanAndSD("agileleader"); 

        const {mean, sd} = compData;
       
        const compScore =  utils.convertToDecimal((0.5*avg) + 0.5*(0.8*pa + 0.2*cs));
        await user.createUserCompData(uliId, "agileleader",compScore.toFixed(2));
       

        const score = metricUtils.getFinalCompScore(compScore,mean,sd);
        
        return {
            score,
            rawScore: compScore
        };
    }


    async getAgileScoreData(uliId) {
        const userState =  await this.getUserState(uliId);

        const {score, rawScore} = await this.getScore(uliId);

        const grade = metricUtils.getCompScoreGradeOnSten(score, "agile_leadership");

        await this.saveAgileScore(uliId,userState,score);

        return {
            pageTitle: 'label_report_agilescore_page_title',
            agileLeaderTitle: 'label_report_agile_leader_title',
            agileLeaderDesc: 'label_report_agile_leader_desc',
            agileLeadershipScoreTitle: 'label_report_agile_leadership_score_title',
            agileLeadershipScore: score,
            agileLeadershipScoreRaw: rawScore,
            gradeNames: ['label_comp_grade_novice', 'label_comp_grade_emerging', 'label_comp_grade_competent', 'label_comp_grade_proficient', 'label_comp_grade_rolemodel'],
            agileLeadershipGrade: grade.grade,
            agileLeadershipGradeDesc: grade.gradeDesc,
            agileCompetenciesTitle: 'label_report_agile_comp_title'
        }
    }

    async getAgileScoreDataForGroup(comp, pa , cs,completedUserIds,metricId,universeData){
        //raw score of agile
        comp = comp.filter(eachComp => eachComp.key =='agileleader');
        const avg = this.otherCompAverage(comp);
        
        const meansd = await metrics.getCompMeanAndSD("agileleader"); 
        const {mean, sd} = meansd;
        const score = metricUtils.getFinalCompScore(avg,mean,sd);
                
        const grade = metricUtils.getGroupGradeAndDesc(score,'agileleader');
        const universe = universeData.find(comp => comp.key == "agileleader");

        
        return {
            agileLeaderTitle: 'label_group_agile_score_title',
            agileLeaderDesc: 'label_group_agile_score_text',
            agileLeadershipScore: score,
            gradeNames: ['label_comp_grade_novice', 'label_comp_grade_emerging', 'label_comp_grade_competent', 'label_comp_grade_proficient', 'label_comp_grade_rolemodel'],
            agileLeadershipGrade: grade.grade,
            agileLeadershipGradeDesc: grade.insight,
            distribution: await metrics.getCompetencyDistribution(completedUserIds,metricId),
            universe: universe.value,
            marginLeftGroup: (score * 54.5) +'px',
            marginLeftUniverse: (universe.value * 54.5) +'px'
        }
    }

    otherCompAverage(comp){
        let score  = 0;
        for (let i =0;i<comp.length;i++){
            score += comp[i].value;
        }
        score =  utils.convertToDecimal(score/comp.length);
        return (score) ? score : 0;
    }

    async getPCF(uliId, userMetrics,userState){
        const pa  = userMetrics.find(metric => metric.metricsId == 6);
        
        const paVal = pa.value;
        const day = userState.currentDay;        

        if (paVal == 100 && day <= 35){
            return 10;
        }
        else if(paVal == 100 && day >35 ){
            return 9;
        }else{
            return  utils.convertToDecimal(paVal/100*8.5);
        }
        
    }

    async getUserState(uliId){
        const userState = await models.user_state.find({
            where:{
                uliId
            },
            raw: true
        });

        return userState;
    }

    getCS(uliId, userMetrics){
        const cs  = userMetrics.find(metric => metric.metricsId == 5);
        return (cs.value) ? cs.value/10 : 0;
    }

    async saveAgileScore(uliId, userState, value){
        const userMetrics = await models.user_metrics.find({
            where:{
                uliId,
                metricsId: 11,
                sprintNumber:userState.currentSprintNumber
            },
            raw: true
        });

        // console.log(userMetrics, 'us')

        if (!userMetrics){
            await models.user_metrics.create({
				sprintDay: userState.currentSprintDay,
				sprintNumber: userState.currentSprintNumber,
				day: userState.currentDay,
				value,
                uliId,
                diff: value,
				metricsId: 11
			});
        }

        return;
    }
}


module.exports = new AgileScore();