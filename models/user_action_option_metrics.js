'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_action_option_metrics = sequelize.define('user_action_option_metrics', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userActionOptionId: {
      field: 'user_action_option_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_action_options',
        key: 'id'
      }
    },
    userMetricsId: {
      field: 'user_metrics_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_metrics',
        key: 'id'
      }
    }
  }, {
    underscored: true,
    timestamps: true,
    indexes: [
      {
        fields: ['user_action_option_id']
      },
      {
        fields: ['user_action_option_id', 'user_metrics_id']
      }
    ]
  });
  user_action_option_metrics.associate = function (models) {
    user_action_option_metrics.belongsTo(models.user_action_options)
  };
  return user_action_option_metrics;
};