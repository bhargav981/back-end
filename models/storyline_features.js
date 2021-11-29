'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_features = sequelize.define('storyline_features', {
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
    featureId: {
      field: 'feature_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'features',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_features.associate = function(models) {
    // associations can be defined here
    storyline_features.belongsTo(models.storylines);
    storyline_features.belongsTo(models.features);
  };
  return storyline_features;
};