'use strict';
module.exports = (sequelize, DataTypes) => {
  const events_actions_conditions = sequelize.define('events_actions_conditions', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    eventId: {
      field: 'event_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    actionOptionId: {
      field: 'action_option_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'action_options',
        key: 'id'
      }
    },
    isActionTaken: {
      field: 'is_action_taken',
      type: DataTypes.INTEGER
    },
    lastActionDuration: {
      field: 'last_action_duration',
      type: DataTypes.INTEGER
    },
    validatorId: {
      field: 'validator_id',
      type: DataTypes.INTEGER,
      references: {
        model: 'validators',
        key: 'id'
      }
    },
    validatorArguments: {
      field: 'validator_arguments',
      type: DataTypes.JSON
    }
  }, {
      underscored: true,
      timestamps: true
    });
  events_actions_conditions.associate = function (models) {
    // associations can be defined here
  };
  return events_actions_conditions;
};