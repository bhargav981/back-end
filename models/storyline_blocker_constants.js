'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_blocker_constants = sequelize.define('storyline_blocker_constants', {
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
    value: DataTypes.FLOAT
  }, {});
  storyline_blocker_constants.associate = function(models) {
    storyline_blocker_constants.belongsTo(models.constants)
  };
  return storyline_blocker_constants;
};