'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_competency_values = sequelize.define('user_competency_values', {
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
    metricId: {
      field: 'metric_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'metrics',
        key: 'id'
      }
    },
    key: {
      field: 'key',
      type: DataTypes.STRING,
    },
    value: {
      field: 'value',
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
        fields: ['uli_id', 'metric_id']
      }
    ]
  });
  user_competency_values.associate = function (models) {
    // associations can be defined here
  };
  return user_competency_values;
};