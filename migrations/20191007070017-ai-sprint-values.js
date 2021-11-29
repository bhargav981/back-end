'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_action_option_impact_sprint_values', {
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
        },
        unique: 'aiSprintValue'
      },
      sprint_number: {
        type: Sequelize.INTEGER,
        unique: 'aiSprintValue'
      },
      action_option_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'action_options',
          key: 'id'
        },
        unique: 'aiSprintValue'
      },
      value: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('user_action_option_impact_sprint_values');
  }
};