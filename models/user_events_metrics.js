'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_events_metrics = sequelize.define('user_events_metrics', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userEventId: {
      field: 'user_event_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_events',
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
    timestamps: true,
    indexes: [
      {
        fields: ['user_event_id']
      },
      {
        fields: ['user_metrics_id']
      },
      {
        fields: ['user_event_id', 'user_metrics_id']
      }
    ]
  });
  user_events_metrics.associate = function (models) {
    // associations can be defined here
  };
  return user_events_metrics;
};