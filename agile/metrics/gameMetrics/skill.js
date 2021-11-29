const TeamMembers = require("@repositories/TeamMembers");
class Skill {

    async getMetrics(metric, uliId, topConstants, now, count) {
        const teamMetrics = await TeamMembers.getTeamMembersMetrics(uliId);
        const memberSkills = teamMetrics.map((member) => {
            const constants = {
                ...metric.constants,
                ...topConstants
            }

            return {
                memberId: member.teamMemberId,
                skill: this.getScore(constants, metric, member.skill, count),
            }

        })
        let skill = memberSkills.reduce((prev, met) => met.skill + prev, 0) / memberSkills.length;
        skill = skill > 100? 100: skill;
        skill = skill < 0 ? 0 : skill;
        return {
            metricId: metric.metricId,
            value: skill,
            diff: (skill - now.value).toFixed(2),
            members: memberSkills
        };
    }

    getScore(constants, metric, currentSkill, count) {
        var direction;
        if(metric.sprintCount && count > metric.sprintCount){
            direction = metric.direction - (count-1);
        }else{
            direction = metric.direction
        }
        const {ks, sm, ds, ls, smax, smin, sz,sc} = constants;

        [ks, sm, ds, ls, smax, smin, sz, direction].forEach((val)=>{
            if(val == void(0)){
                throw "Invalid constant skill"
            }
        });
        // const sc = 1; ///TO BE FIXED BY ASHOK
        const exponent = Math.exp(-1 * ks * (currentSkill - sm));
        const deno = ds + exponent;
        const se = ls / deno;
        const sb = (se - currentSkill + sz) * sc;
        const diff = Math.round(Math.max(Math.min(sb, smax), smin), 0);

        // console.log("ks", ks, "sm", sm, "ds", ds, "ls", ls, "smax", smax, "sc", sc, "smin", smin, "sz", sz, "currentSkill", currentSkill)
        // console.log("exponent---" + exponent + "deno----", deno, "se---", se, "sb----", sb, "diff---", diff);
        return currentSkill + (diff* direction);
    }
}

module.exports = new Skill();