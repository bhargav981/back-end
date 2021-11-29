const MetricsRepository = require('@repositories/Metrics');
const ActionsRepository = require('@repositories/Actions');

class CS {

    async getMetrics(metric, pa,constants, uliId, csa = 0, isEventOrBlocker=false) {        
        const {csmax, csmin, css} = metric.constants;
        const current = metric.value;
        let {acsc} = constants;
        
        if(!acsc) {
            acsc = 0;
        }

        [csmax, csmin, css, acsc].forEach((val)=>{
            if(val == void(0)){
                throw "Invalid constant"
            }
        });

        let  acsc1 = 0;  //it is 0 for all. Later the value might be given at action level.
        
        const expo = 0.4 * (Math.pow(acsc*5, 3)/1000);
        // console.log(expo, 'expo')
        
        // const mid = (0.6 * ((1 + (0.1*acsc1)) * pa)) + expo;   //
        const mid = expo;

        const dcs = Math.round(Math.max(Math.min(mid, csmax), csmin), 2);
        return current + dcs;
        return isEventOrBlocker ? current + expo : current+dcs;
    }

    async getCSWithPA(metric, pa,constants, uliId, csa = 0, isEventOrBlocker=false){
        const {csmax, csmin, css} = metric.constants;
        const current = metric.value;
        let {acsc} = constants;

        [csmax, csmin, css, acsc].forEach((val)=>{
            if(val == void(0)){
                throw "Invalid constant"
            }
        });

        let acsc1 = 0;

        const mid = (0.6 * ((1 + (0.1*acsc1)) * pa));
        const dcs = Math.round(Math.max(Math.min(mid, csmax), csmin), 2);
        return current + dcs;
    }
}

module.exports = new CS();