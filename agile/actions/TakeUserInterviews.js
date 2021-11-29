
const Actions = require("./Actions");
const MetricsManager = require("@agile/metrics/MetricsManager");

class TakeUserInterviews extends Actions{
    // async calculateMetricsImpact(actionOptionId, actionOption,uliId,transaction,sprintDay,sprintNumber,day){
    //     const budget = await MetricsManager.updateBudget(actionOption.cost, uliId, transaction, sprintDay, sprintNumber, day);
    //     const cs = await MetricsManager.calculateCS(actionOptionId, uliId, transaction, sprintDay, sprintNumber, day);
    //     const pa = await MetricsManager.calculatePA(uliId, transaction, sprintDay, sprintNumber, day);
    // }
}

module.exports = new TakeUserInterviews();