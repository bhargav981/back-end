'use strict';
module.exports = (sequelize, DataTypes) => {
  const action_option_message_pool = sequelize.define('action_option_message_pool', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    actionOptionId: {
      field: "action_option_id",
      type: DataTypes.INTEGER
    },
    message: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    timestamps: true,
    freezeTableName: true
  });
  action_option_message_pool.associate = function (models) {
    // associations can be defined here
  };
  return action_option_message_pool;
};