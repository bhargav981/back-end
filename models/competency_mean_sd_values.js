'use strict';
module.exports = (sequelize, DataTypes) => {
  const competency_mean_sd_values = sequelize.define('competency_mean_sd_values', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    metricId: {
        field: 'metric_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'metrics',
          key: 'id'
        }
    },
    key:{
      field: 'key',
      type: DataTypes.STRING,
    },
    sd:{
        field: 'sd',
        type: DataTypes.FLOAT
    },
    mean:{
        field: 'mean',
        type: DataTypes.FLOAT
    }
  }, {
    underscored: true,
    timestamps: true
  });
  competency_mean_sd_values.associate = function(models) {
    // associations can be defined here
  };
  return competency_mean_sd_values;
};