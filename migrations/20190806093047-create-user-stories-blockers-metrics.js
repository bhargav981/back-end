'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_stories_blockers_metrics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_stories_blocker_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_stories_blockers',
          key: 'id'
        }
      },
      user_metrics_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_metrics',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_stories_blockers_metrics');
  }
};