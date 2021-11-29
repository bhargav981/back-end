'use strict';
module.exports = (sequelize, DataTypes) => {
  const actions = sequelize.define('actions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imageKey: {
      field: 'image_key',
      type: DataTypes.STRING
    },
    sprintLimit:{
      field: 'sprint_limit',
      type: DataTypes.INTEGER
    },
    gameLimit:{
      field: 'game_limit',
      type: DataTypes.INTEGER
    },
    isGlobal:{
      field: 'is_global',
      type: DataTypes.BOOLEAN
    }
  }, {
    underscored: true,
    timestamps: true
  });
  actions.associate = function(models) {
    actions.belongsToMany(models.storylines, {
      through: models.storyline_actions,
      as: 'storylines',
      foreignKey: 'actionId',
      otherKey: 'storylineId'
    });
  };
  return actions;
};