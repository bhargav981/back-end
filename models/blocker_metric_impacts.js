'use strict';
module.exports = (sequelize, DataTypes) => {
  const blocker_metric_impacts = sequelize.define('blocker_metric_impacts', {
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
    blockerId: {
      field: 'blocker_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'blockers',
        key: 'id'
      }
    },
    direction: DataTypes.INTEGER
  }, {});
  blocker_metric_impacts.associate = function(models) {
    blocker_metric_impacts.belongsTo(models.metrics)
    blocker_metric_impacts.hasMany(models.storyline_blocker_constants, {
      foreignKey: 'blocker_id',
      as: "constants",
    })
  };
  return blocker_metric_impacts;
};