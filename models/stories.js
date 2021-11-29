'use strict';
module.exports = (sequelize, DataTypes) => {
  const stories = sequelize.define('stories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    featureId: {
      field: 'feature_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'features',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    valuePointTitle: {
      field: 'value_point_title',
      type: DataTypes.STRING
    },
    valuePointDescription: {
      field: 'value_point_description',
      type: DataTypes.STRING
    },
    valuePoint: {
      field: 'value_point',
      type: DataTypes.INTEGER
    },
    storyPointTitle: {
      field: 'story_point_title',
      type: DataTypes.STRING
    },
    storyPointDescription: {
      field: 'story_point_description',
      type: DataTypes.STRING
    },
    storyPoint: {
      field: 'story_point',
      type: DataTypes.INTEGER
    },
    mvpBucketId: {
      field: 'mvp_bucket_id',
      type: DataTypes.INTEGER
    },
    isPA:{
      field: 'is_pa',
      type: DataTypes.BOOLEAN
    },
    isCorrect:{
      field: "is_correct",
      type: DataTypes.BOOLEAN
    }
  }, {
    underscored: true,
    timestamps: true
  });
  stories.associate = function(models) {
    // associations can be defined here
    stories.belongsTo(models.features);
  };
  return stories;
};