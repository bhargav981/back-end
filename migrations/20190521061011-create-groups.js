'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('groups', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      storyline_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "storylines",
          key: "id"
        }
      },
      is_timer_enabled: {
        type: Sequelize.BOOLEAN
      },
      timer_value: {
        type: Sequelize.INTEGER
      },
      is_report_enabled: {
        type: Sequelize.BOOLEAN
      },
      game_complexity: {
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
    return queryInterface.dropTable('groups');
  }
};