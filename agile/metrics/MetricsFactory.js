const Skill = require("./gameMetrics/skill")
const Morale = require("./gameMetrics/morale")
const Throughput = require("./gameMetrics/throughtput");
const Quality = require('./gameMetrics/quality');

class MetricsFactory {

    async getMetricEvents(metric, uliId, topConstants, now, count) {

        switch (metric.metricKey) {
            case "skill":
                return await Skill.getMetrics(metric, uliId, topConstants, now, count)
                break;
            case "morale":
                return await Morale.getMetrics(metric, uliId, topConstants, now, count)
                break;
            default:
                break;
        }
    }

    async getDerivedMetrics(metric, mergerdMetrcis, action, ta, current) {

        switch (metric.metricKey) {
            case "throughput":
                return await Throughput.getMetrics(metric, mergerdMetrcis, action, ta, current)
                break;
            case "quality":
                return await Quality.getMetrics(metric, mergerdMetrcis, action, ta, current)
                break;
            default:
                break;
        }
    }
}

module.exports = new MetricsFactory()