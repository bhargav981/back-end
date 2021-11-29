'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_statuses = sequelize.define('storyline_statuses', {
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
    statusId: {
      field: 'status_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'statuses',
        key: 'id'
      }
    },
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_statuses.associate = function(models) {
    // associations can be defined here
  };
  return storyline_statuses;
};