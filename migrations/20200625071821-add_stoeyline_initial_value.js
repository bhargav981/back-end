'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('storyline_metrics', 'initial_value', {
        type: Sequelize.FLOAT
      }),
      queryInterface.addColumn('storyline_metrics', 'key', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('storyline_metrics', 'initial_value'),
      queryInterface.removeColumn('storyline_metrics', 'initial_value')
    ])
  }
};
