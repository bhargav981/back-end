'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('actions', 'sprint_limit', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('actions', 'game_limit', {
        type: Sequelize.INTEGER
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('actions', 'sprint_limit'),
      queryInterface.removeColumn('actions', 'game_limit')
    ])
  }
};
