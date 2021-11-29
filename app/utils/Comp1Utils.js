const models = require('@models');
const _ = require('lodash');

class Comp1Utils {
  async getImpact(uliId, actionOptionIds, sprintNumber, transaction) {
    console.log('--------------------------------------------------------------')
    console.log("Sprint Number" + " " + sprintNumber)
    console.log("--------------------------------------------------------------")
    const constants = await this.getConstants();

    const data = await actionOptionIds.forEach(async actionOptionId => {
      const userActionOptionIds = await this.getUserActionOptionId(
        uliId,
        sprintNumber,
        actionOptionId
      );

      const eventIds = await this.getEventIds(actionOptionIds);
      const userEventIds = await this.getUserEvents(uliId, eventIds, sprintNumber);
      const userEventMetricIds = await this.getUserEventMetricIds(userEventIds);

      let userMetricIds = await this.getUserMetricIds(userActionOptionIds);
      userMetricIds.concat(userEventMetricIds);

      const skill = await this.getSkillImpact(userMetricIds, constants);
      const morale = await this.getMoraleImpact(userMetricIds, constants);
      const cs = await this.getCSImpact(userMetricIds, constants);

      const impactVal = [skill, morale, cs];

      const vals = (impactVal).filter(function (el) {
        return el != null;
      });

      console.log(vals, 'vals in comp')

      let ai = 0;
      if (vals.length) {
        ai = this.sum(vals) / vals.length;
        return await this.saveAI(uliId, sprintNumber, actionOptionId, ai);
      }

      console.log("--------------------------------------------------------------")
      return;

    });
  }

  async saveAI(uliId, sprintNumber, actionOptionId, value) {
    console.log('saving-------------------')
    console.log("action ", actionOptionId, " value", value)

    // change to find hen update for the value
    try {
      let action = await models.user_action_option_impact_sprint_values.findOne({
        where: {
          uliId,
          sprintNumber,
          actionOptionId
        }
      })

      if (!action) {
        // create
        console.log("Creating the value" + uliId + " with value " + value)
        await models.user_action_option_impact_sprint_values.create({
          uliId,
          sprintNumber,
          actionOptionId,
          value
        });
        console.log('saved----------------------')
      } else if (action.value != value) {
        console.log("Updating the value" + uliId + " with value " + value)
        await models.user_action_option_impact_sprint_values.updateField({
          value: value
        }, {
          uliId,
          sprintNumber,
          actionOptionId
        });
        console.log('saved----------------------')
      }
    } catch (err) {
      console.log(err)
      throw err
    }
    // return await models.user_action_option_impact_sprint_values.upsert({
    //   uliId,
    //   sprintNumber,
    //   actionOptionId,
    //   value
    // }, transaction
    // );
  }

  async getSkillImpact(userMetricIds, constants) {
    const metrics = await this.getMetrics(userMetricIds, 1);
    console.log(metrics, 'metrics in skill');
    const impact = metrics.length > 0 ? this.sum(metrics) : null;

    console.log(impact, 'impact in skil');

    const { ssh, ssc, imax, imin } = constants;
    console.log(ssh, ssc, imax, imin, 'constants in skill')

    if (impact) {
      const aimp = (ssh + impact) * ssc;
      const aim = Math.max(Math.min(aimp, imax), imin).toFixed(2);
      console.log(aim, 'final skill');
      return aim;
    }

    return null;
  }

  async getMoraleImpact(userMetricIds, constants) {
    const metrics = await this.getMetrics(userMetricIds, 2);
    console.log(metrics, 'metrics in morale');
    const impact = metrics.length > 0 ? this.sum(metrics) : null;
    console.log(impact, 'impact in morale');

    const { msh, msc, imax, imin } = constants;

    if (impact) {
      const aimp = (msh + impact) * msc;
      const aim = Math.max(Math.min(aimp, imax), imin).toFixed(2);
      console.log(aim, 'final morale');

      return aim;
    }

    return null;
  }

  async getCSImpact(userMetricIds, constants) {
    const metrics = await this.getMetrics(userMetricIds, 5);
    console.log(metrics, 'metrics in cs');
    const impact = metrics.length > 0 ? this.sum(metrics) : null;
    console.log(impact, 'impact in cs');
    const { cssh, cssc, imax, imin } = constants;
    console.log(impact, 'cs impact')

    if (impact) {
      const aimp = (cssh + impact) * cssc;
      const aim = Math.max(Math.min(aimp, imax), imin).toFixed(2);
      console.log(aim, 'final cs');
      return aim;
    }

    return null;
  }

  async getMetrics(userMetricIds, metricId) {
    let metrics = await models.user_metrics.findAll({
      where: {
        id: userMetricIds,
        metrics_id: metricId,
      },
      attributes: {
        exclude: ['created_at', 'updated_at'],
      },
      raw: true,
    });

    let impact = metrics.filter(metric => metric.diff != 0);

    return _.map(impact, 'diff');
  }

  async getUserActionOptionId(uliId, sprintNumber, actionOptionId) {
    let userActionOptionData = await models.user_action_options.findAll({
      where: {
        uliId,
        actionOptionId,
        sprintNumber,
      },
      attributes: {
        exclude: ['created_at', 'updated_at'],
      },
      raw: true,
    });

    return _.map(userActionOptionData, 'id');
  }

  async getUserMetricIds(userActionOptionIds) {
    let userActionOptionMetricData = await models.user_action_option_metrics.findAll(
      {
        where: {
          userActionOptionId: userActionOptionIds,
        },
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        raw: true,
      }
    );

    const metricIds = _.map(userActionOptionMetricData, 'userMetricsId');
    return metricIds;
  }

  async getUserEventMetricIds(userEventIds) {
    let userEventMetricData = await models.user_events_metrics.findAll(
      {
        where: {
          userEventId: userEventIds,
        },
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        raw: true,
      }
    );

    const metricIds = _.map(userEventMetricData, 'userMetricsId');
    return metricIds;
  }

  async getEventIds(actionOptionIds) {
    const eventIds = await models.events_actions_conditions.findAll({
      where: {
        actionOptionId: actionOptionIds
      },
      raw: true
    });

    return _.map(eventIds, "eventId");
  }

  async getUserEvents(uliId, eventIds, sprintNumber) {
    const userEvents = await models.user_events.findAll({
      where: {
        uliId,
        eventId: eventIds,
        sprintNumber
      },
      raw: true
    });

    return _.map(userEvents, 'id');
  }

  sum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += Number(arr[i]);
    }

    return sum;
  }

  async getConstants() {
    const metricConstants = await models.storyline_metric_constants.findAll({
      where: {
        metricId: [1, 2, 5],
      },
      raw: true,
      include: [
        {
          model: models.constants,
          attributes: {
            exclude: ['created_at', 'updated_at'],
          },
          raw: true,
        },
      ],
    });

    let constants = {};

    metricConstants.map(metric => {
      constants[metric['constant.name']] = metric.value;
    });

    return constants;
  }

  async getUserACtionOptionEventId() { }
}

module.exports = new Comp1Utils();
