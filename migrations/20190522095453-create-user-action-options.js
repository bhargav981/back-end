'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_action_options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uli_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uli_id'
        }
      },
      day: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sprint_number: {
        type: Sequelize.INTEGER
      },
      sprint_day: {
        type: Sequelize.INTEGER
      },
      story_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stories',
          key: 'id'
        }
      },
      action_option_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'action_options',
          key: 'id'
        }
      },
      impact: {
        type: Sequelize.INTEGER
      },
      response: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('user_action_options');
  }
};