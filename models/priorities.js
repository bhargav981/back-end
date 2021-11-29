'use strict';
module.exports = (sequelize, DataTypes) => {
  const priorities = sequelize.define('priorities', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    key: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true
  });
  priorities.associate = function(models) {
    // associations can be defined here
  };
  return priorities;
};