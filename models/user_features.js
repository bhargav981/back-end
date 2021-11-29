'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_features = sequelize.define('user_features', {
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
    featureId: {
      field: 'feature_id',
      type: DataTypes.INTEGER,
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
  user_features.associate = function(models) {
    // associations can be defined here
  };
  return user_features;
};