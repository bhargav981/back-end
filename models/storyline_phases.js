'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_phases = sequelize.define('storyline_phases', {
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
    phaseId: {
      field: 'phase_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'phases',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_phases.associate = function(models) {
    // associations can be defined here
    storyline_phases.belongsTo(models.storylines);
    storyline_phases.belongsTo(models.phases);
  };
  return storyline_phases;
};