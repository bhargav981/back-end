'use strict';
module.exports = (sequelize, DataTypes) => {
  const action_option_metrics_impacts = sequelize.define('action_option_metrics_impacts', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    metricId: {
      field: 'metric_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'metrics',
        key: 'id'
      }
    },
    actionOptionId: {
      field: 'action_option_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'action_options',
        key: 'id'
      }
    },
    immediateImpact: {
      field: 'immediate_impact',
      type: DataTypes.INTEGER
    },
    delayedImpact: {
      field: 'delayed_impact',
      type: DataTypes.INTEGER
    },
    delayDays: {
      field: 'delay_days',
      type: DataTypes.INTEGER
    },
    direction: {
      field: 'direction',
      type: DataTypes.INTEGER
    },
    sprintCount: {
      field: 'sprint_count',
      type: DataTypes.INTEGER
    }
  }, {
    underscored: true,
    timestamps: true
  });
  action_option_metrics_impacts.associate = function(models) {
    action_option_metrics_impacts.belongsTo(models.metrics)
  // action_option_metrics_impacts.hasMany(models.storyline_event_constants, {
  //   foreignKey: 'action_option_id',
  //   as: "constants",
  // })
  }
  return action_option_metrics_impacts;
};