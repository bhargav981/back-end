'use strict';
module.exports = (sequelize, DataTypes) => {
  const action_option_message_level = sequelize.define('action_option_message_level', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    actionId:{
        field: "action_id",
        type: DataTypes.INTEGER
    },
    level:{
        type: DataTypes.INTEGER
    },
    message:{
        type: DataTypes.STRING
    },
    type:{
      type: DataTypes.STRING
    }
  }, {
      underscored: true,
      timestamps: true,
      freezeTableName: true
    });
  action_option_message_level.associate = function (models) {
    // associations can be defined here
  };
  return action_option_message_level;
};