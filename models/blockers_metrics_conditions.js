'use strict';
module.exports = (sequelize, DataTypes) => {
  const blockers_metrics_conditions = sequelize.define('blockers_metrics_conditions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
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
  blockers_metrics_conditions.associate = function(models) {
    // associations can be defined here
    blockers_metrics_conditions.belongsTo(models.blockers, {
      foreignKey: 'blockerId'
    });
    blockers_metrics_conditions.belongsTo(models.metrics, {
      foreignKey: 'metricsId'
    });
  };
  return blockers_metrics_conditions;
};