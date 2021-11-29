'use strict';
module.exports = (sequelize, DataTypes) => {
  const constants = sequelize.define('constants', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    abb: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true
  });
  constants.associate = function(models) {
    // associations can be defined here
  };
  return constants;
};