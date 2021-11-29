'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_timer = sequelize.define('storyline_timer', {
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
    timerValue: {
      type: DataTypes.INTEGER
    },
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_timer.associate = function(models) {
   
  };
  return storyline_timer;
};