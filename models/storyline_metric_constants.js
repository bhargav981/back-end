'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_metric_constants = sequelize.define('storyline_metric_constants', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    storylineId: {
      field: 'storyline_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'storylines',
        key: 'id'
      }
    },
    constantId: {
      field: 'constant_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'constants',
        key: 'id'
      }
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
    value: DataTypes.FLOAT
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_metric_constants.associate = function(models) {
    // associations can be defined here
    storyline_metric_constants.belongsTo(models.constants)
  };
  return storyline_metric_constants;
};