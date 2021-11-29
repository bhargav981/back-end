const ActionsRepository = require('@repositories/Actions');

class Quality {

    async getMetrics(metric, mergerdMetrcis, action, uliId) {
        const {qmax, qmin, qi} = metric.constants;
        const {aqc} = action.actionConstants;
        const ta = await ActionsRepository.getUserQualityCummulative(uliId);
        const oms = mergerdMetrcis.reduce((prev, met) => {
            return prev + met.value;
        }, 0);

        const qa = qi + ta;
        const qb = aqc * ((oms + qa) / 3);
        const qr = Math.round(Math.max(Math.min(qb, qmax), qmin), 2)
        return {
            metricId: metric.metricId,
            value: qr
        };
    }
}

module.exports = new Quality();