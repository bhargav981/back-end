const models = require("@models");
const user = require("@utils/User");
const utils = require("@utils/Utils");
const metricsRepo = require("@repositories/Metrics");

class AllMetrics {
  async getAllMetrics(storylineId) {
    const metrics = await metricsRepo.getStorylineMetricsForCmnDB(storylineId)
    return metrics;
  }

  async getMetricKeys(storylineId) {
    let metrics = await this.getAllMetrics(storylineId);
    metrics = metrics.reduce((prev,metric) => {
      if(metric.key !== 'quality'){
        prev.push({
          key: metric.key,
          name: metric.displayName,
          isShownByDefault: metric.isShownByDefault || 'false'
        })
      }
      return prev
    },[])

    return metrics;
  }

  async getMetrics(ctx) {
    //METRIC - STORYLINE ID TO BE MADE DYNAMIC
    const metrics = await this.getMetricKeys(1);
    return {
      hasReport: "true",
      hasAggregateReport: "true",
      metrics
    };
  }
}

module.exports = new AllMetrics();
