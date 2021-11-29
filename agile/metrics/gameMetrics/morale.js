const TeamMembers = require("@repositories/TeamMembers");
const _ = require("lodash");
class Morale {

    async getMetrics(metric, uliId, topConstants, now, count) {
        
        const teamMetrics = await TeamMembers.getTeamMembersMetrics(uliId);
        // console.log("now", now)
        const memberMorales = teamMetrics.map((member) => {
            const constants = {
                ...metric.constants,
                ...topConstants
            }
            return {
                memberId: member.teamMemberId,
                morale: this.getScore(constants, metric, member.morale, count),
            }

        })
        let morale = memberMorales.reduce((prev, met) => met.morale + prev, 0) / memberMorales.length;
        morale = morale > 100? 100: morale;
        morale = morale < 0 ? 0 : morale;
        return {
            metricId: metric.metricId,
            value: morale,
            diff: (morale - now.value).toFixed(2),
            members: memberMorales
        };
    }

   
    getScore(constants, metric, currentMorale, count) {
        // console.log(constants, 'constants in morale')
        var direction;
        var impactForNegative = 1;
        if(metric.sprintCount && count > metric.sprintCount){
            direction = metric.direction - (count-1);
            if(count - 1 > metric.sprintCount){
                direction = -1;
                impactForNegative = 0.4;
            }else if(count - 1 == metric.sprintCount){
                direction = 0;
            }else{
                direction = 1
            }
        }else{
            direction = metric.direction
        }
        const {lm, dm, km, mm, mamxp, mamxn, mminn, mzp, mzn, mc, mminp} = constants;

        [lm, dm, km, mm, mamxp, mamxn, mminn, mzp, mzn, mc, mminp].forEach((val)=>{
            if(val == void(0)){
                throw "Invalid constant"
            }
        });

        const exponent = Math.exp(-1 * km * (currentMorale - mm));
        const deno = dm + exponent;
        const me = lm / deno;
        const mz = direction == 1 ? mzp : mzn;
        const mb = (me - currentMorale + mz) * mc * impactForNegative;
        let diff;


        
        if (direction > 0) {
            // console.log(mb,mamxp, mminp)
            diff = Math.round(Math.max(Math.min(mb, mamxp), mminp), 0);
        } else {
            // console.log(mb,mminn,mamxn)
            diff = Math.round(Math.min(Math.min(mb, mminn), mamxn), 0);
        }

        // console.log(diff)
        // console.log('----------------------------')
        // console.log("MORALLLEEEE")
        // console.log("currentMorale ",currentMorale, "diff ",diff, "direction ",direction,"count ", count,"mb ",mb,"mc ",mc, "impactForNegative ",impactForNegative);
        return currentMorale + ( Math.abs(diff) * direction);
    }
}

module.exports = new Morale();