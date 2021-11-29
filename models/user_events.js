'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_events = sequelize.define('user_events', {
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
    eventId: {
      field: 'event_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    // impact: {
    //   type: DataTypes.INTEGER
    // },
    // response: {
    //   type: DataTypes.STRING
    // }
  }, {
    underscored: true,
    timestamps: true,
    indexes: [
      {
        fields: ['uli_id']
      },
      {
        fields: ['uli_id', 'event_id']
      }
    ]
  });
  user_events.associate = function (models) {
    // associations can be defined here
    user_events.belongsToMany(models.user_metrics, {
      through: models.user_events_metrics,
      foreignKey: 'userEventId',
      otherKey: 'userMetricsId'
    });

    user_events.belongsTo(models.events);
  };
  return user_events;
};