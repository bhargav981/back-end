'use strict';
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    ta: DataTypes.FLOAT,
    description: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true
  });
  events.associate = function(models) {
    events.hasMany(models.event_metric_impacts, {
      as: "impacts"
    })
    events.hasMany(models.storyline_event_constants, {
    })
  };
  return events;
};