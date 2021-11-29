'use strict';
module.exports = (sequelize, DataTypes) => {
  const action_options = sequelize.define('action_options', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    actionId: {
      field: 'action_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'actions',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    shouldDisplay: {
      field: 'should_display',
      type: DataTypes.BOOLEAN
    },
    effort: {
      type: DataTypes.INTEGER
    },
    cost: {
      type: DataTypes.INTEGER
    },
    sprintLimit: {
      field: "sprint_limit",
      type: DataTypes.INTEGER
    },
    gameLimit: {
      field: "game_limit",
      type: DataTypes.INTEGER
    },
    messageType: {
      field: "message_type",
      type: DataTypes.STRING
    },
    key: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    route: {
      type: DataTypes.STRING
    },
    throughput: {
      field: "throughput",
      type: DataTypes.FLOAT
    },
    quality: {
      field: "quality",
      type: DataTypes.FLOAT
    },
    cs: {
      field: "cs",
      type: DataTypes.FLOAT
    },
    messageLevelType: {
      field: "message_level_type",
      type: DataTypes.STRING
    },
    responseImageKey: {
      field: "response_image_key",
      type: DataTypes.STRING
    }
  }, {
      underscored: true,
      timestamps: true
    });
  action_options.associate = function (models) {
    // associations can be defined here
    action_options.belongsTo(models.actions);
    action_options.hasMany(models.action_option_metrics_impacts, {

    })
    action_options.hasMany(models.storyline_action_option_constants, {
    })
  };
  return action_options;
};