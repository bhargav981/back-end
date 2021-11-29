'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('user_metrics', 'diff', {type: Sequelize.FLOAT}),
      queryInterface.changeColumn('user_metrics', 'value', {type: Sequelize.FLOAT})
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('user_metrics', 'diff');
  }
};
