'use strict';
module.exports = (sequelize, DataTypes) => {
  const features = sequelize.define('features', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    imageKey: {
      field: 'image_key',
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    timestamps: true
  });
  features.associate = function(models) {
    // associations can be defined here
  };
  return features;
};