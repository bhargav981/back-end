'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_metrics = sequelize.define('user_metrics', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uliId: {
      field: 'uli_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'uli_id'
      }
    },
    metricsId: {
      field: 'metrics_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'metrics',
        key: 'id'
      }
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sprintNumber: {
      field: 'sprint_number',
      type: DataTypes.INTEGER
    },
    sprintDay: {
      field: 'sprint_day',
      type: DataTypes.INTEGER
    },
    value: {
      type: DataTypes.FLOAT,
      get() {
        const metricsCond =
          ((this.getDataValue("metricsId") == 8)
            || (this.getDataValue("metricsId") == 9)
            || (this.getDataValue("metricsId") == 10));

        if (this.getDataValue("value") == "Infinity" && metricsCond) {
          return 100
        } else {
          return this.getDataValue("value");
        }
      }
    },
    diff: {
      type: DataTypes.FLOAT
    }
  }, {
    underscored: true,
    timestamps: true,
    indexes: [
      {
        fields: ['uli_id']
      },
      {
        fields: ['uli_id', 'metrics_id']
      }
    ]
  });
  user_metrics.associate = function (models) {
    // associations can be defined here
    user_metrics.belongsTo(models.metrics, {
      foreignKey: 'metricsId',
    });
  };
  return user_metrics;
};