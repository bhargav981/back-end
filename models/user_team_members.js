'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_team_members = sequelize.define('user_team_members', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uliId: {
      field: 'uli_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'uli_id'
      }
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sprintNumber: {
      field: 'sprint_number',
      type: DataTypes.INTEGER
    },
    sprintDay: {
      field: 'sprint_day',
      type: DataTypes.INTEGER
    },
    teamMemberId: {
      field: 'team_member_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'team_members',
        key: 'id'
      }
    },
    skill: {
      type: DataTypes.INTEGER
    },
    morale: {
      type: DataTypes.INTEGER
    }
  }, {
    underscored: true,
    timestamps: true,
    indexes: [
      {
        fields: ['uli_id']
      },
      {
        fields: ['uli_id', 'team_member_id']
      }
    ]
  });
  user_team_members.associate = function (models) {
    // associations can be defined here
  };
  return user_team_members;
};