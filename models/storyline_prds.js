'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_prds = sequelize.define('storyline_prds', {
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
    prdId: {
      field: 'prd_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'prds',
        key: 'id'
      }
    },
    cost: {
      type: DataTypes.INTEGER
    },
    effort: {
      type: DataTypes.INTEGER
    }
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_prds.associate = function(models) {
    // associations can be defined here
    storyline_prds.belongsTo(models.storylines);
    storyline_prds.belongsTo(models.prds);
  };
  return storyline_prds;
};