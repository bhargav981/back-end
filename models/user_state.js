'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_state = sequelize.define('user_state', {
    uliId: {
      field: 'uli_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'uli_id'
      }
    },
    isGameStarted: {
      field: 'is_game_started',
      type: DataTypes.BOOLEAN
    },
    isGameCompleted: {
      field: 'is_game_completed',
      type: DataTypes.BOOLEAN
    },
    currentDay: {
      field: 'current_day',
      type: DataTypes.INTEGER
    },
    currentSprintNumber: {
      field: 'current_sprint_number',
      type: DataTypes.INTEGER
    },
    currentSprintState: {
      field: 'current_sprint_state',
      type: DataTypes.INTEGER
    },
    currentSprintDay: {
      field: 'current_sprint_day',
      type: DataTypes.INTEGER
    },
    currentPhaseId: {
      field: 'current_phase_id',
      type: DataTypes.INTEGER
    },
    timerValue: {
      field: 'timer_value',
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: true,
    underscored: true
  });
  user_state.associate = function (models) {
    // associations can be defined here
    user_state.belongsTo(models.users, { foreignKey: "uliId" });
  };
  return user_state;
};