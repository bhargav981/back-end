'use strict';
module.exports = (sequelize, DataTypes) => {
  const default_strings = sequelize.define('default_strings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    value: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true
  });
  default_strings.associate = function(models) {
    // associations can be defined here
  };
  return default_strings;
};