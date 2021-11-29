'use strict';
module.exports = (sequelize, DataTypes) => {
  const selectors = sequelize.define('selectors', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    arguments: DataTypes.JSON
  }, {
      underscored: true,
      timestamps: true
    });
  selectors.associate = function (models) {
    // associations can be defined here
  };
  return selectors;
};