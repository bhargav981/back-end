'use strict';
module.exports = (sequelize, DataTypes) => {
  const event_metric_impacts = sequelize.define('event_metric_impacts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    metricsId: {
      field: 'metric_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'metrics',
        key: 'id'
      }
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
    direction: DataTypes.INTEGER
  }, {
    underscored: true,
    timestamps: true
  });
  event_metric_impacts.associate = function(models) {
    event_metric_impacts.belongsTo(models.metrics)
    event_metric_impacts.hasMany(models.storyline_event_constants, {
      foreignKey: 'event_id',
      as: "constants",
    })
  };
  return event_metric_impacts;
};