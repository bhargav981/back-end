const user = require('@utils/User');
const EventsRepository = require('@repositories/Events');
const BlockersRepository = require('@repositories/Blockers');
const ActionsRepository = require('@repositories/Actions');
const MetricsRepository = require('@repositories/Metrics');
const Factory = require("./MetricsFactory");
const Throughtput = require("./gameMetrics/throughtput");
const TeamMembers = require("@repositories/TeamMembers");
const models = require('@models');
const _ = require("lodash");
const PA = require("./gameMetrics/pa");
const CS = require("./gameMetrics/cs");
const Accuracy = require("./gameMetrics/accuracy");
const Efficiency = require("./gameMetrics/efficiency");
const Velocity = require("./gameMetrics/velocity");

const CustomerCentricity = require("./gameMetrics/customerCentricity");
const ChangeAgility = require("./gameMetrics/changeAgility");
const TalentDexterity = require("./gameMetrics/talentDexterity");
const ContinuosLearning = require("./gameMetrics/continuosLearning");
const AgileScore = require("./gameMetrics/agileScore");

const comp1Utils = require("@utils/Comp1Utils");


class MetricsManager {

	async getEventMetricsImpact(uliId, eventId, day, sprintNumber, sprintDay) {
		const event = await EventsRepository.getEventInfo(eventId);

		const topConstants = event.eventConstants;
	
		const skillAndMorales = event.impacts.filter((metric) => metric.metricKey == "skill" || metric.metricKey == "morale");

		const prevMetrics = await MetricsRepository.getRecentSkillAndMorale(uliId)
		// first get skill and metrics
		const metricAsyncs = skillAndMorales.map((metric) => {
			const now = prevMetrics.find((pre) => pre.metricKey == metric.metricKey)
			return Factory.getMetricEvents(metric, uliId, topConstants, now, 99999) // send max to avoid direction change
		})
		const metrics = await Promise.all(metricAsyncs);
		if(!metrics.length){
			return[]
		}
		
		const memberScores = _.flatten(metrics.map((met) => met.members))
		// const mergedScores = _.merge(_.keyBy(a, 'userId'), _.keyBy(b, 'userId'));
		await MetricsRepository.saveTeamMetrics(uliId, memberScores, day, sprintNumber, sprintDay);
		const metric = prevMetrics.find((metric) => metric.metricKey === "cs");
		let csObj = {};
		// console.log(metric)
		if(metric){
			const pa = prevMetrics.find((metric) => metric.metricKey === "pa");
			const cs = await CS.getMetrics(metric, pa.value, event.eventConstants, uliId,0,true);
			// console.log(css)
			// console.log(cs, 'cs')
			csObj = {
				metricId: metric.metricId,
				value: cs,
				diff: (cs - metric.value).toFixed(2),
			}

			metrics.push(csObj)
 		}
		return metrics;
	}


	async getBlockerMetricsImpact(uliId, blockerId, day, sprintNumber, sprintDay) {
		const blocker = await BlockersRepository.getBlockerInfo(blockerId);
		const topConstants = blocker.blockerConstants;
	
		const skillAndMorales = blocker.impacts.filter((metric) => metric.metricKey == "skill" || metric.metricKey == "morale");

		const prevMetrics = await MetricsRepository.getRecentSkillAndMorale(uliId)
		// first get skill and metrics
		const metricAsyncs = skillAndMorales.map((metric) => {
			const now = prevMetrics.find((pre) => pre.metricKey == metric.metricKey)
			return Factory.getMetricEvents(metric, uliId, topConstants, now, 99999) // send max to avoid direction change
		})
		const metrics = await Promise.all(metricAsyncs);
		if(!metrics.length){
			return[]
		}
		const memberScores = _.flatten(metrics.map((met) => met.members))
		await MetricsRepository.saveTeamMetrics(uliId, memberScores, day, sprintNumber, sprintDay);

		const metric = prevMetrics.find((metric) => metric.metricKey === "cs");
		let csObj = {};
		// console.log('blocker-constants', blocker)
		if(metric){
			const pa = prevMetrics.find((metric) => metric.metricKey === "pa");
			const cs = await CS.getMetrics(metric, pa.diff, topConstants, uliId,0,true);
			csObj = {
				metricId: metric.metricId,
				value: cs,
				diff: (cs - metric.value).toFixed(2),
			}

			metrics.push(csObj)
		 }
		 
		return metrics;
	}

	async getActionMetricsImpact(uliId, actionOptionId, day, sprintNumber, sprintDay, count) {
		
		const action = await ActionsRepository.getActionInfo(actionOptionId);
		const topConstants = action.actionConstants;

		// first get skill and metrics
		const prevMetrics = await MetricsRepository.getRecentSkillAndMorale(uliId);

		const skillAndMorales = action.impacts.filter((metric) => ["skill", "morale"].includes(metric.metricKey));
		
		const prevMetricskillAndMorales = prevMetrics.filter((metric) => ["skill", "morale"].includes(metric.metricKey));
		const metricAsyncs = skillAndMorales.map((metric) => {
			const now = prevMetrics.find((pre) => pre.metricKey == metric.metricKey)
			return Factory.getMetricEvents(metric, uliId, topConstants, now, count)
		})
		const metrics = await Promise.all(metricAsyncs);
		// no metrics to impact condition
		if(!metrics.length){
			return[]
		}
		const memberScores = _.flatten(metrics.map((met) => met.members))
		// const mergedScores = _.merge(_.keyBy(a, 'userId'), _.keyBy(b, 'userId'));
		await MetricsRepository.saveTeamMetrics(uliId, memberScores, day, sprintNumber, sprintDay);
		const mergerdMetrcis = _.flatten(this.mergeMetrics(prevMetricskillAndMorales, metrics));

		// get rest excluding skill and morale
		// const ta = await ActionsRepository.getUserThroughPut(uliId); // calculate this
		const otherMetrics = action.impacts.filter((metric) => ["throughput", "quality"].includes(metric.metricKey));
		const metricAsyncsOth = otherMetrics.map((metric) => {
			// const current = prevMetrics.find((prev) => prev.metricId == metric.metricId).value;
			return Factory.getDerivedMetrics(metric, mergerdMetrcis, action, uliId)
		})

		const metricsOth = await Promise.all(metricAsyncsOth)

		return [...metrics, ...metricsOth];
	}

	mergeMetrics(prev, now) {
		return prev.map((pre) => {
			const isThereNow = now.find((n) => n.metricId == pre.metricId);
			if (isThereNow) {
				return {
					metricId: pre.metricId,
					value: isThereNow.value
				}
			} else {
				return {
					metricId: pre.metricId,
					value: pre.value
				}
			}
		});
	}


	async calculateQuality() {}

	async getSavedActionMetricsImpact(metricsData, transaction,uliId) {
		const metrics = await MetricsRepository.getSavedActionMetricsImpact(metricsData, transaction,uliId);
		return metrics;
	}

	async getLatestMetrics(uliId) {
		let userMetrics = await models.user_metrics.findAll({
			where: {
				uliId
			  },
			  raw: true,
		});

		userMetrics = _(userMetrics)
			.chain()
			.orderBy(["id"], ["desc"])
			.groupBy("metricsId")
			.values()
			.map(groups => groups[0])
			.orderBy(["metricsId"], ["desc"])
			.value();
		
		return userMetrics;
	}

	async calculateCS(actionId, uliId, transaction, sprintDay, sprintNumber, day) {
		const action = await ActionsRepository.getActionInfo(actionId);
		const prevMetrics = await MetricsRepository.getRecentSkillAndMorale(uliId);

		// const quality = prevMetrics.find((metric) => metric.metricKey === "quality").value;
		const pa = prevMetrics.find((metric) => metric.metricKey === "pa").diff;
		const metric = prevMetrics.find((metric) => metric.metricKey === "cs");
		const csa = await ActionsRepository.getUserCSummulative(uliId);
		const cs = await CS.getMetrics(metric, pa, action.actionConstants, uliId, csa);

		// console.log("CS IN mm actiosn",cs);
		// console.log(metric, 'metric')

		await MetricsRepository.updateMetric("cs", cs, uliId, transaction, sprintDay, sprintNumber, day);
		// console.log({
		// 	metricsId: metric.metricId,
		// 	value: cs,
		// 	diff: (cs - metric.value).toFixed(2),
		// })
		return {
			metricsId: metric.metricId,
			value: cs,
			diff: (cs - metric.value).toFixed(2),
		};
		return await CS.getMetrics(metric, pa, quality, action, uliId)
	}

	async calculateCSForPA(actionId, uliId,transaction, sprintDay, sprintNumber, day) {
		const action = await ActionsRepository.getActionInfo(actionId);
		const prevMetrics = await MetricsRepository.getRecentSkillAndMorale(uliId);

		const pa = prevMetrics.find((metric) => metric.metricKey === "pa").diff;
		const metric = prevMetrics.find((metric) => metric.metricKey === "cs");
		const csa = await ActionsRepository.getUserCSummulative(uliId);
		const cs = await CS.getCSWithPA(metric, pa, action.actionConstants, uliId, csa);

		// console.log("CS IN mm",cs);
		// console.log('metric', metric);

		await MetricsRepository.updateMetric("cs", cs, uliId,transaction, sprintDay, sprintNumber, day);
		return {
			metricsId: metric.metricId,
			value: cs,
			diff: (cs - metric.value).toFixed(2),
		};
	}

	async calculatePA(uliId, transaction, sprintDay, sprintNumber, day) {
		const pa = await PA.getMetrics(uliId);
		await MetricsRepository.updateMetric("pa", pa, uliId, transaction, sprintDay, sprintNumber, day);
		return pa;
	}

	async calculateAccuracy(uliId, transaction, sprintDay, sprintNumber, day) {
		const accuracy = await Accuracy.getMetrics(uliId,sprintNumber);
		await MetricsRepository.updateMetric("accuracy", accuracy, uliId, transaction, sprintDay, sprintNumber, day);
		return accuracy;
	}

	async calculateVelocity(uliId, transaction, sprintDay, sprintNumber, day){
		const velocity = await Velocity.getMetrics(uliId,sprintNumber);
		await MetricsRepository.updateMetric("velocity",velocity, uliId, transaction, sprintDay, sprintNumber, day);
		return velocity;
	}

	async calculateEfficiency(uliId, transaction, sprintDay, sprintNumber, day){
		const efficiency = await Efficiency.getMetrics(uliId,sprintNumber);
		await MetricsRepository.updateMetric("efficiency",efficiency, uliId, transaction, sprintDay, sprintNumber, day);
		return efficiency;
	}

	async calculateCustomerCentricity(uliId, transaction, sprintDay, sprintNumber, day,actionOptionImpact){
		const customerCentricity = await CustomerCentricity.getMetrics(uliId,sprintNumber,actionOptionImpact);
		await MetricsRepository.updateOrInsert("centricity",customerCentricity, uliId, transaction, sprintDay, sprintNumber, day);
		return customerCentricity;
	}

	async calculateChangeAgility(uliId, transaction, sprintDay, sprintNumber, day,actionOptionImpact){
		const changeAgility = await ChangeAgility.getMetrics(uliId,sprintNumber,actionOptionImpact);
		await MetricsRepository.updateOrInsert("changeAgility",changeAgility, uliId, transaction, sprintDay, sprintNumber, day);
		return changeAgility;
	}

	async calculateTalentDexterity(uliId, transaction, sprintDay, sprintNumber, day,actionOptionImpact){
		const talentDexterity = await TalentDexterity.getMetrics(uliId,sprintNumber,actionOptionImpact);
		await MetricsRepository.updateOrInsert("dexterity",talentDexterity, uliId, transaction, sprintDay, sprintNumber, day);
		return talentDexterity;
	}
	
	async calculateContinuosLearning(uliId, transaction, sprintDay, sprintNumber, day,actionOptionImpact){
		const learning = await ContinuosLearning.getMetrics(uliId,sprintNumber,actionOptionImpact);
		await MetricsRepository.updateOrInsert("learning",learning, uliId, transaction, sprintDay, sprintNumber, day);
		return learning;
	}

	async calculateAgileLedaershipScore(uliId, transaction, sprintDay, sprintNumber, day,actionOptionImpact){
		const {score} = await AgileScore.getScore(uliId);
		await MetricsRepository.updateOrInsert("agileleader",score, uliId, transaction, sprintDay, sprintNumber, day);
		return score;
	}

	async updateBudget(cost, uliId, transaction, sprintDay, sprintNumber, day) {
		return await MetricsRepository.updateBudget("budget", cost, uliId, transaction, sprintDay, sprintNumber, day);
	}

	async calculateActionOptionAI(uliId, sprintNumber, transaction){
		const actionOptions = await models.user_action_options.findAll({
			where:{
				uliId,
				sprintNumber
			},
			raw: true
		});

		const actionOptionIds = _.map(actionOptions, 'actionOptionId');
		
		await comp1Utils.getImpact(uliId,actionOptionIds, sprintNumber,transaction);

	}
}

module.exports = new MetricsManager();