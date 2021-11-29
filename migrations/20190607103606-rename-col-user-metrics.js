'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('user_metrics', 'progress', 'value');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('user_metrics', 'value', 'progress');
  }
};
