'use strict';
module.exports = (sequelize, DataTypes) => {
  const validators = sequelize.define('validators', {
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
  validators.associate = function (models) {
    // associations can be defined here
  };
  return validators;
};