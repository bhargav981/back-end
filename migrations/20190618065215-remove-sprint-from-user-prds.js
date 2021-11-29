'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('user_prds', 'sprint_number'),
      queryInterface.removeColumn('user_prds', 'sprint_day')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('user_prds', 'sprint_number', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('user_prds', 'sprint_day', {
        type: Sequelize.INTEGER
      })
    ]);
  }
};