'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_metrics = sequelize.define('storyline_metrics', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
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
    metricsId: {
      field: 'metrics_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'metrics',
        key: 'id'
      },
    },
    isShownByDefault: {
      type: DataTypes.STRING,
      field: "is_shown_by_default"
    },
    showInKonsole: {
      type: DataTypes.BOOLEAN,
      field: "show_in_konsole"
    },
    key:{
      type: DataTypes.STRING
    },
    initialValue: {
      type: DataTypes.FLOAT,
      field: "initial_value"
    }
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_metrics.associate = function(models) {
    // associations can be defined here
  };
  return storyline_metrics;
};