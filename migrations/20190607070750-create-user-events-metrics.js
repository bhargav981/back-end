'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_events_metrics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_events',
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
    return queryInterface.dropTable('user_events_metrics');
  }
};