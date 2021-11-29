'use strict';
module.exports = (sequelize, DataTypes) => {
  const blocker_actions = sequelize.define('blocker_actions', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    blockerId: {
      field: 'blocker_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'blockers',
        key: 'id'
      }
    },
    actionId: {
      field: 'action_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'actions',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    timestamps: true
  });
  blocker_actions.associate = function(models) {
    // associations can be defined here
  };
  return blocker_actions;
};