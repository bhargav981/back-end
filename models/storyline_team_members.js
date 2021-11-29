'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_team_members = sequelize.define('storyline_team_members', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    storylineId: {
      field: 'storyline_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'storylines',
        key: 'id'
      }
    },
    teamMemberId: {
      field: 'team_member_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'team_members',
        key: 'id'
      }
    },
    skill: DataTypes.INTEGER,
    morale: DataTypes.INTEGER,
    experience: DataTypes.INTEGER,
    avatar:{
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_team_members.associate = function(models) {
    // associations can be defined here
    storyline_team_members.belongsTo(models.storylines);
    storyline_team_members.belongsTo(models.team_members);
  };
  return storyline_team_members;
};