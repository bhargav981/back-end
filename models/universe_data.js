'use strict';
module.exports = (sequelize, DataTypes) => {
  const universe_data = sequelize.define('universe_data', {
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
    value:{
        field: 'value',
        type: DataTypes.FLOAT
    }
  }, {
    underscored: true,
    timestamps: true
  });
  universe_data.associate = function(models) {
    // associations can be defined here
  };
  return universe_data;
};