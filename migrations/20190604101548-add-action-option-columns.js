'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('action_options', 'game_limit', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('action_options', 'sprint_limit', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('action_options', 'cost', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('action_options', 'message_type', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('action_options', 'game_limit'),
      queryInterface.removeColumn('action_options', 'sprint_limit'),
      queryInterface.removeColumn('action_options', 'cost'),
      queryInterface.removeColumn('action_options', 'message_type')
    ])
  }
};
