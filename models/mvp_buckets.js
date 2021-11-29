'use strict';
module.exports = (sequelize, DataTypes) => {
  const mvp_buckets = sequelize.define('mvp_buckets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true
  });
  mvp_buckets.associate = function(models) {
    // associations can be defined here
  };
  return mvp_buckets;
};