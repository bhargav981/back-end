'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.addColumn('storyline_metrics', 'show_in_konsole', {
        type: Sequelize.BOOLEAN
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('storyline_metrics', 'show_in_konsole')
      
  }
};
