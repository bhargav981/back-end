'use strict';
module.exports = (sequelize, DataTypes) => {
  const storylines = sequelize.define('storylines', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isDemo: {
      type: DataTypes.BOOLEAN,
      field: 'is_demo'
    },
    parentId:{
      type: DataTypes.INTEGER,
      field: 'parent_id'
    },
    timerValue:{
      type: DataTypes.INTEGER,
      field: 'timer_value'
    }
  }, {
    timestamps: true,
    underscored: true
  });
  storylines.associate = function (models) {
    // associations can be defined here

    storylines.belongsToMany(models.actions, {
      through: models.storyline_actions,
      as: 'actions',
      foreignKey: 'storylineId',
      otherKey: 'actionId'
    });

    storylines.belongsToMany(models.blockers, {
      through: models.storyline_blockers,
      as: 'blockers',
      foreignKey: 'storylineId',
      otherKey: 'blockerId'
    });

    storylines.belongsToMany(models.customers, {
      through: models.storyline_customers,
      as: 'customers',
      foreignKey: 'storylineId',
      otherKey: 'customerId'
    });

    storylines.belongsToMany(models.events, {
      through: models.storyline_events,
      as: 'events',
      foreignKey: 'storylineId',
      otherKey: 'eventId'
    });

    storylines.belongsToMany(models.features, {
      through: models.storyline_features,
      as: 'features',
      foreignKey: 'storylineId',
      otherKey: 'featureId'
    });

    storylines.belongsToMany(models.priorities, {
      through: models.storyline_priorities,
      as: 'priorities',
      foreignKey: 'storylineId',
      otherKey: 'priorityId'
    });

    storylines.belongsToMany(models.statuses, {
      through: models.storyline_statuses,
      as: 'statuses',
      foreignKey: 'storylineId',
      otherKey: 'statusId'
    });

    storylines.hasMany(models.groups, {
      as: 'groups',
      foreignKey: 'id'
    });

    storylines.belongsToMany(models.metrics, {
      through: models.storyline_metrics,
      as: 'metrics',
      foreignKey: 'storylineId',
      otherKey: 'metricsId'
    });

    storylines.belongsToMany(models.phases, {
      through: models.storyline_phases,
      as: 'phases',
      foreignKey: 'storylineId',
      otherKey: 'phaseId'
    });

    storylines.belongsToMany(models.prds, {
      through: models.storyline_prds,
      as: 'prds',
      foreignKey: 'storylineId',
      otherKey: 'prdId'
    });

    storylines.belongsToMany(models.team_members, {
      through: models.storyline_team_members,
      as: 'teamMembers',
      foreignKey: 'storylineId',
      otherKey: 'teamMemberId'
    });
    
  };
  return storylines;
};