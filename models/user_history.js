'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_history = sequelize.define('user_history', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uliId: {
      field: 'uli_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'uli_id'
      }
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sprintNumber: {
      field: 'sprint_number',
      type: DataTypes.INTEGER
    },
    sprintDay: {
      field: 'sprint_day',
      type: DataTypes.INTEGER
    },
    history: {
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    timestamps: true
  });
  user_history.associate = function(models) {
    // associations can be defined here
  };
  return user_history;
};