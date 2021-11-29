'use strict';
module.exports = (sequelize, DataTypes) => {
  const metrics = sequelize.define('metrics', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    key: DataTypes.STRING,
    name: DataTypes.STRING,
    displayName: {
      field: 'display_name',
      type: DataTypes.STRING
    },
    description: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true
  });
  metrics.associate = function(models) {
    metrics.hasMany(models.storyline_metric_constants)
  };
  return metrics;
};