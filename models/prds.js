'use strict';
module.exports = (sequelize, DataTypes) => {
  const prds = sequelize.define('prds', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imageKey: {
      field: 'image_key',
      type: DataTypes.STRING
    },
    costTitle: {
      field: 'cost_title',
      type: DataTypes.STRING
    },
    costDescription: {
      field: 'cost_description',
      type: DataTypes.STRING
    },
    effortTitle: {
      field: 'effort_title',
      type: DataTypes.STRING
    },
    effortDescription: {
      field: 'effort_description',
      type: DataTypes.STRING
    },
    cost:{
      type: DataTypes.FLOAT
    },
    effort:{
      type: DataTypes.INTEGER
    }
  }, {
    underscored: true,
    timestamps: true
  });
  prds.associate = function(models) {
    // associations can be defined here
  };
  return prds;
};