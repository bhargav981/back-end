'use strict';
module.exports = (sequelize, DataTypes) => {
  const team_members = sequelize.define('team_members', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    designation: DataTypes.STRING,
    imageKey: {
      field: 'image_key',
      type: DataTypes.STRING
    },
    role: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: true
  });
  team_members.associate = function(models) {
    // associations can be defined here
  };
  return team_members;
};