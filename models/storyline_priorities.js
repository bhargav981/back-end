'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_priorities = sequelize.define('storyline_priorities', {
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
    priorityId: {
      field: 'priority_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'priorities',
        key: 'id'
      }
    },
    maxTasksAllowedPercentage: {
      field: 'max_tasks_allowed_percentage',
      type: DataTypes.FLOAT
    }
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_priorities.associate = function(models) {
    // associations can be defined here
  };
  return storyline_priorities;
};