'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_stories_blockers_metrics = sequelize.define('user_stories_blockers_metrics', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userStoriesBlockerId: {
      field: 'user_stories_blocker_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_stories_blockers',
        key: 'id'
      }
    },
    userMetricsId: {
      field: 'user_metrics_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_metrics',
        key: 'id'
      }
    }
  }, {
      underscored: true,
      timestamps: true
    });
  user_stories_blockers_metrics.associate = function(models) {
    // associations can be defined here
  };
  return user_stories_blockers_metrics;
};