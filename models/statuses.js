'use strict';
module.exports = (sequelize, DataTypes) => {
  const statuses = sequelize.define('statuses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    key: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {
    underscored: true,
    timestamps: true
  });
  statuses.associate = function (models) {
    // associations can be defined here
  };
  return statuses;
};