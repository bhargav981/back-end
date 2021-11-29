'use strict';
module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define('groups', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    storylineId: {
      field: 'storyline_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "storylines",
        key: "id"
      }
    },
    lang:{
      type: DataTypes.STRING
    },
    isTimerEnabled: {
      field: 'is_timer_enabled',
      type: DataTypes.BOOLEAN
    },
    isFeedbackEnabled: {
      field: 'is_feedback_enabled',
      type: DataTypes.BOOLEAN
    },
    isLeaderboardEnabled: {
      field: 'is_leaderboard_enabled',
      type: DataTypes.BOOLEAN
    },
    isFinalReportEnabled: {
      field: 'is_final_report_enabled',
      type: DataTypes.BOOLEAN
    },
    timerValue: {
      field: 'timer_value',
      type: DataTypes.INTEGER
    },
    isReportEnabled: {
      field: 'is_report_enabled',
      type: DataTypes.BOOLEAN
    },
    gameComplexity: {
      field: 'game_complexity',
      type: DataTypes.STRING
    }
  }, {
      timestamps: true,
      underscored: true
    });
  groups.associate = function (models) {
    // associations can be defined here
    groups.belongsTo(models.storylines);
  };
  return groups;
};