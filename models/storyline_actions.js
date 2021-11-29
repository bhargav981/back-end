'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_actions = sequelize.define('storyline_actions', {
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
  storyline_actions.associate = function(models) {
    // associations can be defined here
  };
  return storyline_actions;
};