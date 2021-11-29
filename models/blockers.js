'use strict';
module.exports = (sequelize, DataTypes) => {
  const blockers = sequelize.define('blockers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true
  });
  blockers.associate = function(models) {
    blockers.hasMany(models.blocker_metric_impacts, {
      as: "impacts"
    })
    blockers.hasMany(models.storyline_blocker_constants, {
    })
  };
  return blockers;
};