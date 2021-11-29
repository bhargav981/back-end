const ActionsRepository = require('@repositories/Actions');
const EventsRepository = require('@repositories/Events');
class Throughtput {

    async getMetrics(throughPutMetric, mergerdMetrcis, action, uliId) {
        const {ti, tmax} = throughPutMetric.constants;
        const {atc} = action.actionConstants;
        const ta = await ActionsRepository.getUserThroughPutCummulative(uliId);
        const eta = await EventsRepository.getEventsTa(uliId);
        const oms = mergerdMetrcis.reduce((prev, met) => {
            return prev + met.value;
        }, 0);
        const tp = oms/2;
        const tb = atc * (((tp * ti) / 100) + ta + eta);
        const mintp = 2;
        const dt = Math.round(Math.min(Math.max(tb, mintp), tmax), 2);
        // console.log("throughput", "dt ",dt, "tb ",tb, "tp ",tp, "ta ", ta ,"eta ",eta, "ti ", ti, "tmax ",tmax);
        return {
            metricId: throughPutMetric.metricId,
            value: dt,
            diff: 0
        };
    }   
}

module.exports = new Throughtput();