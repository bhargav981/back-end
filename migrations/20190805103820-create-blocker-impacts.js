'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('blocker_metric_impacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blocker_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'blockers',
          key: 'id'
        }
      },
      metric_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'metrics',
          key: 'id'
        }
      },
      direction: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('blocker_metric_impacts');
  }
};