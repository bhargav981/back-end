'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_events = sequelize.define('storyline_events', {
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
    eventId: {
      field: 'event_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'events',
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
    storyId: {
      field: 'story_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'stories',
        key: 'id'
      }
    },
    type: {
      field: 'type',
      type: DataTypes.STRING
    }
  }, {
      underscored: true,
      timestamps: true
    });
  storyline_events.associate = function (models) {
    // associations can be defined here
    storyline_events.belongsTo(models.events, {
      foreignKey: 'eventId'
    });
  };
  return storyline_events;
};