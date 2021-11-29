'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_action_option_impact_sprint_values = sequelize.define('user_action_option_impact_sprint_values', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    uliId:{
        field: "uli_id",
        type: DataTypes.INTEGER
    },
    sprintNumber:{
        type: DataTypes.INTEGER,
        field: "sprint_number"
    },
    actionOptionId:{
        type: DataTypes.INTEGER,
        field: "action_option_id",
        unique: true
    },
    value:{
        type: DataTypes.FLOAT
    }
  }, {
      underscored: true,
      timestamps: true,
      freezeTableName: true
    });
  user_action_option_impact_sprint_values.associate = function (models) {
    // associations can be defined here
  };
  return user_action_option_impact_sprint_values;
};