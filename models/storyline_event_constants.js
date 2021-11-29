'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_event_constants = sequelize.define('storyline_event_constants', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    constantId: {
      field: 'constant_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'constants',
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
    value: DataTypes.FLOAT
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_event_constants.associate = function(models) {
    storyline_event_constants.belongsTo(models.constants)
  };
  return storyline_event_constants;
};