'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_action_option_constants = sequelize.define('storyline_action_option_constants', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    constantId: {
      field: 'constant_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'constants',
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
    value: DataTypes.FLOAT
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_action_option_constants.associate = function(models) {
    // associations can be defined here
    storyline_action_option_constants.belongsTo(models.constants)
  };
  return storyline_action_option_constants;
};