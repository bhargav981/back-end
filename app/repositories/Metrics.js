const models = require('@models');
const user = require('@utils/User');
const _ = require("lodash");

class Metrics {

	async getStorylineMetricsForCmnDB(storylineId) {
		let metrics = await models.metrics.findAll({
			attributes: {
				exclude: ["created_at", "updated_at"]
			},
			raw: true
		});

		const storylineMetrics = await models.storyline_metrics.findAll({
			where: {
				storylineId,
				showInKonsole: true
			},
			attributes: ["metricsId", "isShownByDefault"],
			raw: true
		});


		metrics = _.map(metrics, function(item) {
			return _.assign(item, _.find(storylineMetrics, ['metricsId', item.id]));
		});

		metrics.push({
			'key': 'timeLeft',
			'displayName': "Time Left",
			'isShownByDefault': true
		});

		return metrics;
	}

	async getUserMetricsForCmnDB(uliId) {
		let userMetrics = await this.getRecentUserMetrics(uliId);
		let metrics = await models.metrics.findAll({
			attributes: {
				exclude: ["created_at", "updated_at"]
			},
			raw: true
		});


		userMetrics = _.map(metrics, function(item) {
			return _.assign(item, _.find(userMetrics, ['metricsId', item.id]));
		});

		return userMetrics;
	}

	async getAllUserMetrics(uliId) {
		let metrics = await models.user_metrics.findAll({
			where: {
				uliId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			order: [
				['id', 'DESC']
			]
		});
		return metrics;
	}

	async getRecentUserMetrics(uliId) {

		let daySpecificUserMetrics = await models.user_metrics.findAll({
			where: {
				uliId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			order: [
				['id', 'DESC']
			],
			raw: true
		});

		daySpecificUserMetrics = _(daySpecificUserMetrics)
			.chain()
			.groupBy("metricsId")
			.values()
			.map(groups => groups[0])
			.value();

		return daySpecificUserMetrics;
	}

	async getRecentUserMetricsOfAllUsers(uliIds) {

		let daySpecificUserMetrics = await models.user_metrics.findAll({
			where: {
				uliId: uliIds,
				metricsId: 6    // product alignment 
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			order: [
				['id', 'DESC']
			],
			raw: true
		});

		daySpecificUserMetrics = _(daySpecificUserMetrics)
			.chain()
			.groupBy("uliId")
			.values()
			.map(groups => groups[0])
			.value();

		return daySpecificUserMetrics;
	}

	async getRecentSkillAndMorale(uliId) {
		let metrics = await models.user_metrics.findAll({
			where: {
				uliId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			order: [
				['id', 'DESC']
			],
			include: [{
				model: models.metrics,
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				include: [{
					model: models.storyline_metric_constants,
					attributes: {
						exclude: ['created_at', 'updated_at']
					},
					include: [
						{
							model: models.constants,
							attributes: {
								exclude: ['created_at', 'updated_at']
							},
						},
					]
				},]
			}]
		});

		metrics = _(metrics)
			.chain()
			.groupBy("metricsId")
			.values()
			.map(groups => groups[0])
			.value();
			// return metrics;


		return metrics.map(met => {
			let obj = {};
			if(!met.metric){
				return {}
			}
			const constants = met.metric.storyline_metric_constants.map((child) => {
				obj[child.constant.abb] = child.value;
			});
			return {
				metricId: met.metricsId,
				value: met.value,
				diff: met.diff,
				name: met.metric.name,
				description: met.metric.description,
				metricKey: met.metric.key,
				constants: obj
			}
		});
	}

	async saveUserMetricsData(userMetricsData) {
		let savedUserMetricsIds = [];
		// console.log(userMetricsData)
		const finalMetricData = userMetricsData.map(metric => {
            const finalMetric =  {
                ...metric,
                metricsId: metric.metricId || metric.metricsId
            };
            delete finalMetric.metricId;
            return finalMetric;
        });
		

		await models.user_metrics.bulkCreate(
			finalMetricData, {
				returning: true
			}
		).then((result) => {
			result.map(data => {
				savedUserMetricsIds.push(data.id);
			});
		});

		return savedUserMetricsIds;
	}

	async getProgressionMetricInfo() {
		const progressionId = 3; //TODO: make dynamic
		const metric = await models.metrics.findOne({
			where: {
				id: progressionId
			},
			include: [{
				model: models.storyline_metric_constants,
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				include: [
					{
						model: models.constants,
						attributes: {
							exclude: ['created_at', 'updated_at']
						},
					},
				]
			},]
		})
		// return metric;

		let obj = {};
		const constants = metric.storyline_metric_constants.map((child) => {
			obj[child.constant.abb] = child.value;
		});
		return {
			metricId: metric.id,
			value: metric.value,
			name: metric.name,
			diff: metric.diff,
			description: metric.description,
			metricKey: metric.key,
			constants: obj
		}

	}

	async getStorylineMetrics(storylineId) {
		let storylineMetrics = await models.storylines.findOne({
			where: {
				id: storylineId
			},
			attributes: [],
			include: [{
				model: models.metrics,
				as: 'metrics',
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				through: {
					attributes: {
						exclude: ['created_at', 'updated_at']
					}
				}
			}]
		});


		storylineMetrics = await this.formatStorylineMetrics(storylineMetrics);

		return storylineMetrics;
	}

	formatStorylineMetrics(storylineMetrics) {
		return storylineMetrics.get({
			plain: true
		}).metrics.map(storylineMetric => {
			let updatedStorylineMetrics = {
				...storylineMetric,
				...storylineMetric.storyline_metrics
			}

			delete updatedStorylineMetrics.storyline_metrics;

			return updatedStorylineMetrics;
		});
		return stmetrics.metrics.map((met) => {
			return met;
		})
	}

	async getMetric(storylineId, metricKey) {
		let stmetrics = await models.storylines.findOne({
			where: {
				id: storylineId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			include: [{
				model: models.metrics,
				as: 'metrics',
				where: {
					key: metricKey
				},
				attributes: {
					exclude: ['created_at', 'updated_at']
				}
			}]
		});
		return stmetrics;
	}

	async getMetricBy(metricId) {
		let stmetrics = await models.user_metrics.findOne({
			where: {
				id: metricId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			orderBy: [
				['id', 'DESC']
			]
		});
		return stmetrics.value;
	}

	async getLastUserMetric(uliId, key) {
		let pa = await models.user_metrics.findOne({
			where: {
				uliId
			},
			raw: true,
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			order: [
				['id', 'DESC']
			],
			include: [{
				model: models.metrics,
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				where: {
					key
				},
				raw: true
			}]
		});

		return pa;
	}

	async updateMetric(key, value, uliId, transaction, sprintDay, sprintNumber, day) {
		// console.log(value)
		const prevMetric = await this.getLastUserMetric(uliId, key);

		return await models.user_metrics.create({
				sprintDay,
				sprintNumber,
				day,
				value: value,
				uliId,
				metricsId: prevMetric['metric.id'],
				diff: value - prevMetric.value
			}), {
				transaction
		}
	}

	async updateOrInsert(key, value, uliId, transaction, sprintDay, sprintNumber, day){
		const prevMetric = await this.getLastUserMetric(uliId, key);

		let metrics = await models.user_metrics.find({
			where: {
				sprintDay,
				sprintNumber,
				day,
				value: value,
				uliId,
				metricsId: prevMetric['metric.id'],
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			order: [
				['id', 'DESC']
			],
			raw: true
		});
		if (metrics){
			await models.user_metrics.update(
				{value: value},
				{
				where: {
					sprintDay,
					sprintNumber,
					day,
					uliId,
					metricsId: prevMetric['metric.id'],
				},
				attributes: {
					exclude: ['created_at', 'updated_at']
				},
				order: [
					['id', 'DESC']
				],
				raw: true
			});
		}else{
			await this.updateMetric(key, value, uliId, transaction, sprintDay, sprintNumber, day);
		}
	}	

	async updateBudget(key, value, uliId, transaction, sprintDay, sprintNumber, day) {
		const prevMetric = await this.getLastUserMetric(uliId, key);

		return await models.user_metrics.create({
				sprintDay,
				sprintNumber,
				day,
				value: prevMetric.value - value,
				uliId,
				metricsId: prevMetric['metric.id'],
				diff: -value
			}), {
				transaction
		}
	}
	async updatePA(pa, uliId, transaction, sprintDay, sprintNumber, day) {
		const lastPA = await this.getLastUserMetric(uliId, "pa");

		return await models.user_metrics.create({
				sprintDay,
				sprintNumber,
				day,
				value: pa,
				uliId,
				metricsId: lastPA['metric.id']
			}), {
				transaction
		}
	}

	async updateAccuracy(accuracy, uliId, transaction, sprintDay, sprintNumber, day) {
		const lastPA = await this.getLastUserMetric(uliId, "accuracy");

		return await models.user_metrics.create({
				sprintDay,
				sprintNumber,
				day,
				value: accuracy,
				uliId,
				metricsId: lastPA['metric.id']
			}), {
				transaction
		}
	}

	async getLatestSprintWiseMetrics(uliId, metricsId) {
		let metrics = await models.user_metrics.findAll({
			where: {
				uliId,
				metricsId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			order: [
				['id', 'DESC']
			],
			raw: true
		});

		metrics = _(metrics)
			.chain()
			.groupBy("sprintNumber")
			.values()
			.map(groups => groups[0])
			.value();

		const metricValues = metrics.map((metric) => {
			return metric.value
		});
		return metricValues;
	}

	async getSavedActionMetricsImpact(metricsData, transaction,uliId) {
		// console.log(metricsData, 'metricsDatametricsData')
		await models.user_metrics.bulkCreate(
			metricsData, {
				transaction
			}
		);

		// console.log(transaction, 'transactiion')
		let metrics = await models.user_metrics.findAll({
			where:{
				uliId
			},
			transaction,
			raw: true
		});

		metrics = _(metrics)
			.chain()
			.orderBy(["id"], ["desc"])
			.groupBy("metricsId")
			.values()
			.map(groups => groups[0])
			.orderBy(["metricsId"], ["desc"])
			.value();


		return metrics;
	}

	async getLatestMetrics(uliId) {
		let metrics = await models.user_metrics.findAll({
			where:{
				uliId
			},
			raw: true
		});

		metrics = _(metrics)
			.chain()
			.orderBy(["id"], ["desc"])
			.groupBy("metricsId")
			.values()
			.map(groups => groups[0])
			.orderBy(["metricsId"], ["desc"])
			.value();

		return metrics;
	}

	async saveTeamMetrics(uliId, metrics, day, sprintNumber, sprintDay) {
		const keyed = _.groupBy(metrics, "memberId")
		const final = Object.keys(keyed).map(key => {
			const obj = keyed[key];
			const mets = obj.reduce((prev, current) => {
				return {...prev, ...current}
			},{});
			return {
				teamMemberId: key,
				skill: mets.skill,
				morale: mets.morale,
				day,
				sprintNumber,
				sprintDay,
				uliId
			}
		});
		await models.user_team_members.bulkCreate(final)
	}

	async createUserCompData(uliId,key,value){
		const metric = await models.metrics.findOne({
			where:{
				key
			},
			raw: true
		});

		await models.user_competency_values.create({
		  uliId,
		  metricId: metric.id,
		  key,
		  sprintNumber,
		  value
		});
	  }

	  async getCompMeanAndSD(key){
		  const comp = await models.competency_mean_sd_values.find({
			  where:{
				  key
			  },
			  raw:  true
		  });

		  return comp;
	  }

	  async getUserCompetenciesRawScore(uliId){
		  const data = await models.user_competency_values.findAll({
			  where: {
				  uliId
			  },
			  raw: true
		  });

		  return data;

	  }

	  async getLatestSprintWiseMetricsForGroup(uliIds, metricsId, meansd) {
		const metricsData = await models.user_metrics.findAll({
			where: {
				uliId: uliIds,
				metricsId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			order: [
				['id', 'DESC']
			],
			raw: true
		});

		if(metricsId == 6) {
			let metrics = _(metricsData)
			.chain()
			.groupBy("uliId")
			.values()
			.map(groups => groups[0])
			.value();


			let sum = 0;
			const metricValues = [];
			metrics.map((lastestSprintMetric) => {
				sum += lastestSprintMetric.value;
				return 1;
			});
			let avg = sum / metrics.length;
			avg = Math.round(avg*100)/100;
	
			metricValues.push(avg);
			
			return {
				metricValues,
				distribution: this.getDistribution(metricsData, meansd, metricsId),
				perfectCount :this.getPerfectScorePercentageInGroup(metricValues)
			};

		} else  {
			let metrics = _(metricsData)
			.chain()
			.groupBy("sprintNumber")
			.values()
			.map(groups => groups)
			.value();

			const metricValues = metrics.map((sprintMetric) => {
				let sum = 0;
	
				for(let i =0; i< sprintMetric.length; i++){
					sum += (sprintMetric[i].value) ? sprintMetric[i].value : 0;
				}
	
				const avg = sum / sprintMetric.length;
				return Math.round(avg*100)/100;
			});
	
			
			return {
				metricValues,
				distribution: this.getDistribution(metricsData, meansd, metricsId),
				perfectCount :this.getPerfectScorePercentageInGroup(metricValues)
			};

		}

	}

	async getLatestSprintWiseMetricsForGroup2(uliIds, metricsId, meansd) {
		const metricsData = await models.user_metrics.findAll({
			where: {
				uliId: uliIds,
				metricsId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			order: [
				['id', 'DESC']
			],
			raw: false
		});

		if(metricsId == 6) {
			let metrics = _(metricsData)
			.chain()
			.groupBy("uliId")
			.values()
			.map(groups => groups[0])
			.value();


			let sum = 0;
			const metricValues = [];
			metrics.map((lastestSprintMetric) => {
				sum += lastestSprintMetric.value;
				return 1;
			});
			let avg = sum / (metrics.length - 1); // exclude sprint 0
			avg = Math.round(avg*100)/100;
	
			metricValues.push(avg);
			
			return {
				metricValues,
				distribution: this.getDistribution(metricsData, meansd, metricsId),
				perfectCount :this.getPerfectScorePercentageInGroup(metricValues)
			};

		} else  {
			let metrics = _(metricsData)
			.chain()
			.groupBy("uliId")
			.map(value => {
				const spWise = _.groupBy(value, "sprintNumber");
				const spWiseLastDay = _.map(spWise, sprintArr => sprintArr[sprintArr.length-1])
				return spWiseLastDay
			})
			.value();
		
			const metricValues = metrics.map((sprintMetric) => {
				let sum = 0;
				for(let i =0; i< sprintMetric.length; i++){
					sum += (sprintMetric[i].value) ? sprintMetric[i].value : 0;
				}
	
				const avg = sum / (sprintMetric.length - 1); // exclude sprint 0
				return Math.round(avg*100)/100;
			});
			// return;
			return {
				metricValues: metricValues.length>0 ? _.mean(metricValues) : 0,
				distribution: this.getDistribution(metricsData, meansd, metricsId),
				perfectCount :this.getPerfectScorePercentageInGroup(metricValues)
			};
		}

	}

	getDistribution(userMetrics, meanSd, metricsId){

		const metricValues = _(userMetrics)
			.chain()
			.groupBy("uliId")
			.values()
			.map(groups => groups[0])
			.value();


		let distribution = {
			'low' :0,
			'medium':0,
			'high':0
		};

		
		const thisMetric = meanSd.find(metric => metric.metricId === metricsId);
		if(thisMetric){
			const {mean, sd} = thisMetric;
			const low = mean - (0.5 * sd);
			const high =  mean + (0.5 * sd);
		
			
			for(let i =0; i< metricValues.length;i++){
				let score = metricValues[i].value;
				if(score <= low){
					distribution['low']++;
				}else if(score > low && score < high){
					distribution['medium']++;
				}else{
					distribution['high']++;
				}
			}

			let distributionArr = [];
			
			Object.keys(distribution).forEach((key, index) => {
				let temp = {};
				temp['key'] = key;
				temp['value'] = distribution[key]/metricValues.length*100;
				temp['value'] = Math.round(temp['value']*100)/100;

				if(key == 'low') {
					temp['legendValue'] = `<${Math.round(low)}`;
				} else if (key == 'medium') {
					temp['legendValue'] = `${Math.round(low)}-${Math.round(high)}`;
				} else if (key == 'high') {
					temp['legendValue'] = `>${Math.round(high)}`;
				}

				distributionArr.push(temp);
			});


		return distributionArr;
	}
	return [];
	}	

	getPerfectScorePercentageInGroup(metricValues){
		let count = 0;

		for(let i =0; i< metricValues.length;i++){
			if(metricValues[i] === 100){
				count++;
			}
		}

		let countPercentage = (count/metricValues.length)*100;
		return Math.round(countPercentage*100)/100;
	}

	async updateMeanSD(uliIds, metricsId){
		
		let metrics = await models.user_metrics.findAll({
			where: {
				uliId: uliIds,
				metricsId,
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			order: [
				['id', 'DESC']
			],
			raw: true
		});

		

		metrics = _(metrics)
			.chain()
			.groupBy("uliId")
			.values()
			.map(groups => groups[0])
			.value();
		
	
		let sum = 0;

		for(let i =0; i< metrics.length; i++){
			let val  = (metrics[i].value) ? metrics[i].value : 0;
			sum += val;
		}
		
		
		const avg = sum / metrics.length;
		const mean =  Math.round(avg*100)/100;

		

		sum = 0;


		for(let i =0; i< metrics.length; i++){
			let val = (metrics[i].value) ? metrics[i].value : 0;
			val = val - mean;  
			sum += val * val;
		}

		let sd = sum / metrics.length;
		sd = Math.sqrt(sd);
		sd =  Math.round(sd*100)/100;


		await models.competency_mean_sd_values.update({
			mean,
			sd,
		}, {
			where: {
				metricId: metricsId
			}
		});

		

		return {mean,sd};
	}

	async getCompAvgOfGroup(uliIds){
		const data = await models.user_competency_values.findAll({
			where:{
				uliId: uliIds
			},
			raw: true
		});

		return data;
	}

	async getCompetencyDistribution(uliIds, metricsId){
		let daySpecificUserMetrics = await models.user_metrics.findAll({
			where: {
				uliId: uliIds,
				metricsId
			},
			attributes: {
				exclude: ['created_at', 'updated_at']
			},
			order: [
				['id', 'DESC']
			],
			raw: true
		});

		daySpecificUserMetrics = _(daySpecificUserMetrics)
			.chain()
			.groupBy("uliId")
			.values()
			.map(groups => groups[0])
			.value();

	
		let distribution = {
			'2' :0,
			'4':0,
			'6':0,
			'8':0,
			'10': 0
		};

	
		for(let i =0; i< daySpecificUserMetrics.length;i++){
			if(daySpecificUserMetrics[i].value <= 2){
				distribution['2']++;
			}else if(daySpecificUserMetrics[i].value > 2 && daySpecificUserMetrics[i].value <= 4){
				distribution['4']++;
			}
			else if(daySpecificUserMetrics[i].value > 4 && daySpecificUserMetrics[i].value <= 6){
				distribution['6']++;
			}
			else if(daySpecificUserMetrics[i].value > 6 && daySpecificUserMetrics[i].value <= 8){
				distribution['8']++;
			}
			else if(daySpecificUserMetrics[i].value > 8 && daySpecificUserMetrics[i].value <= 1){
				distribution['10']++;
			}
		}

		let distributionArr = [];

		Object.keys(distribution).forEach((key, index) => {
			let temp = {};
			temp['key'] = key;
			temp['value'] = (distribution[key]/uliIds.length)*100;
			temp['value'] = Math.round(temp['value']*100)/100;
			distributionArr.push(temp);
		});
		

		return distributionArr;
	}
}

module.exports = new Metrics();