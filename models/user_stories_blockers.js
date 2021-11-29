'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_stories_blockers = sequelize.define('user_stories_blockers', {
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
    storyId: {
      field: 'story_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stories',
        key: 'id'
      }
    },
    blockerId: {
      field: 'blocker_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'blockers',
        key: 'id'
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
    status: {
      type: DataTypes.INTEGER
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
  user_stories_blockers.associate = function (models) {
    // associations can be defined here
    user_stories_blockers.belongsTo(models.blockers, {
      foreignKey: 'blockerId'
    });
  };
  return user_stories_blockers;
};