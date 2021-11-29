'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_states', {
      uli_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'uli_id'
        }
      },
      is_game_started: {
        type: Sequelize.BOOLEAN
      },
      is_game_completed: {
        type: Sequelize.BOOLEAN
      },
      current_day: {
        type: Sequelize.INTEGER
      },
      current_sprint_number: {
        type: Sequelize.INTEGER
      },
      current_sprint_day: {
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
    return queryInterface.dropTable('user_states');
  }
};