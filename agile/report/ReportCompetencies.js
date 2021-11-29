const agileLeader = require("@agile/metrics/gameMetrics/agileLeader");
const changeAgility = require("@agile/metrics/gameMetrics/changeAgility");
const continuosLearning = require("@agile/metrics/gameMetrics/continuosLearning");
const customerCentricity = require("@agile/metrics/gameMetrics/customerCentricity");
const talentDexterity = require("@agile/metrics/gameMetrics/talentDexterity");
const agileLeadership = require("@agile/metrics/gameMetrics/agileScore");
const metrics = require("@repositories/Metrics");
const models = require('@models');
const _ = require("lodash");

class ReportCompetencies{

    async getUserActionOptionImpact(uliId){
        const data =  await models.user_action_option_impact_sprint_values.findAll({
             where:{
                 uliId
             },
             raw: true
         });
 
         return data;
     }

    async getReportCompetencies(uliId, allMetrics){
        const actionOptionImpact = await this.getUserActionOptionImpact(uliId);
        const comp = [
            this.getCompetencyData(uliId, "centricity",actionOptionImpact, allMetrics),
            this.getCompetencyData(uliId, "changeAgility",actionOptionImpact, allMetrics),
            this.getCompetencyData(uliId, "dexterity",actionOptionImpact, allMetrics),
            this.getCompetencyData(uliId, "learning",actionOptionImpact, allMetrics)
        ];

        const finalComp =  await Promise.all(comp);
        const agileScore = await agileLeadership.getAgileScoreData(uliId, finalComp);

        const competencyValues = await metrics.getUserCompetenciesRawScore(uliId);
        const compValRaw = finalComp.map((finalCompVal) => {
            const v = _.find(competencyValues, (value) => value.metricId == finalCompVal.id);
            finalCompVal.rawScore = v.value;
            return finalCompVal;
        })
        return {
            finalComp: compValRaw,
            agileScore
        };
    }

    async getCompetencyData(uliId, metricKey, actionOptionImpact,allMetrics){
       switch (metricKey) {
           case "centricity":
                return await customerCentricity.getCompetencyData(uliId, metricKey, actionOptionImpact, allMetrics);
            case "changeAgility":
                return await changeAgility.getCompetencyData(uliId, metricKey, actionOptionImpact, allMetrics);
            case "dexterity":
                return await talentDexterity.getCompetencyData(uliId, metricKey, actionOptionImpact, allMetrics);
            case "learning":
                return await continuosLearning.getCompetencyData(uliId, metricKey, actionOptionImpact, allMetrics);        
           default:
               break;
       }
    }

}

module.exports = new ReportCompetencies();