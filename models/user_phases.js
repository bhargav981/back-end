'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_phases = sequelize.define('user_phases', {
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
    phaseId: {
      field: 'phase_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'phases',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    timestamps: true
  });
  user_phases.associate = function(models) {
    // associations can be defined here
  };
  return user_phases;
};