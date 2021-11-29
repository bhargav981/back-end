'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_stories = sequelize.define('user_stories', {
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
    storyId: {
      field: 'story_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stories',
        key: 'id'
      }
    },
    progress: {
      field: 'progress',
      type: DataTypes.FLOAT
    },
    storyPriority: {
      field: 'story_priority',
      type: DataTypes.INTEGER,
      references: {
        model: 'priorities',
        key: 'id'
      }
    },
    storyStatus: {
      field: 'story_status',
      type: DataTypes.INTEGER,
      references: {
        model: 'statuses',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    timestamps: true,
    indexes: [
      {
        fields: ['uli_id']
      },
      {
        fields: ['uli_id', 'story_id']
      }
    ]
  });
  user_stories.associate = function (models) {
    // associations can be defined here
  };
  return user_stories;
};