'use strict';
module.exports = (sequelize, DataTypes) => {
  const phases = sequelize.define('phases', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    timestamps: true
  });
  phases.associate = function(models) {
    // associations can be defined here
  };
  return phases;
};