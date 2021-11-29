'use strict';
module.exports = (sequelize, DataTypes) => {
  const events_metrics_conditions = sequelize.define('events_metrics_conditions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    eventId: {
      field: 'event_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    metricsId: {
      field: 'metrics_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'metrics',
        key: 'id'
      }
    },
    value: DataTypes.INTEGER,
    operator: DataTypes.STRING,
  }, {
      underscored: true,
      timestamps: true
    });
  events_metrics_conditions.associate = function (models) {
    // associations can be defined here
    events_metrics_conditions.belongsTo(models.events, {
      foreignKey: 'eventId'
    });
    events_metrics_conditions.belongsTo(models.metrics, {
      foreignKey: 'metricsId'
    });
  };
  return events_metrics_conditions;
};