'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  Promise.all([
      queryInterface.addColumn('prds', 'cost', {type: Sequelize.FLOAT}),
      queryInterface.addColumn('prds', 'effort', {type: Sequelize.INTEGER}),
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('prds', 'cost'),
      queryInterface.removeColumn('prds', 'effort')
    ]);
  }
};
