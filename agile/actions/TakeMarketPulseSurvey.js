
const Actions = require("./Actions");
const MetricsManager = require("@agile/metrics/MetricsManager");

class TakeMarketPulseSurvey extends Actions{
    // async calculateMetricsImpact(actionOptionId, actionOption,uliId,transaction,sprintDay,sprintNumber,day){
    //     const budget = await MetricsManager.updateBudget(actionOption.cost, uliId, transaction, sprintDay, sprintNumber, day);
    //     const pa = await MetricsManager.calculatePA(uliId, transaction, sprintDay, sprintNumber, day);
    // }
}

module.exports = new TakeMarketPulseSurvey();