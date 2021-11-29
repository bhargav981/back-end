'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_action_options = sequelize.define('user_action_options', {
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
    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sprintNumber: {
      field: 'sprint_number',
      type: DataTypes.INTEGER
    },
    sprintDay: {
      field: 'sprint_day',
      type: DataTypes.INTEGER
    },
    actionOptionId: {
      field: 'action_option_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'action_options',
        key: 'id'
      }
    },
    actionId: {
      field: 'action_id',
      type: DataTypes.INTEGER,
      references: {
        model: 'actions',
        key: 'id'
      }
    },
    message: {
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    timestamps: true,
    indexes: [
      {
        fields: ['uli_id']
      },
      {
        fields: ['uli_id', 'action_option_id']
      }
    ]
  });
  user_action_options.associate = function (models) {
    // associations can be defined here
    user_action_options.belongsTo(models.users, {
      foreignKey: 'uliId'
    });
    user_action_options.belongsTo(models.action_options, {
      foreignKey: 'actionOptionId'
    });

    // user_action_options.hasMany(models.user_action_option_metrics)
    user_action_options.belongsToMany(models.user_metrics, {
      through: models.user_action_option_metrics,
      // as: 'metrics',
      foreignKey: 'userActionOptionId',
      otherKey: 'userMetricsId'
    });

  };
  return user_action_options;
};