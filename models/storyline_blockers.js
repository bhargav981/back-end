'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_blockers = sequelize.define('storyline_blockers', {
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
    sprintDay: {
      field: 'sprint_day',
      type: DataTypes.INTEGER
    },
    sprintNumber: {
      field: 'sprint_number',
      type: DataTypes.INTEGER
    },
    type: {
      field: 'type',
      type: DataTypes.STRING
    },
    selectorId: {
      field: 'selector_id',
      type: DataTypes.INTEGER,
      references: {
        model: 'selectors',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_blockers.associate = function(models) {
    // associations can be defined here
    storyline_blockers.belongsTo(models.blockers, {
      foreignKey: 'blockerId'
    });
  };
  return storyline_blockers;
};