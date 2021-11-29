'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
   [   queryInterface.addColumn(
        'action_options', 'type', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn(
        'action_options', 'route', {
        type: Sequelize.STRING
      })]
      )
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(
     [ queryInterface.removeColumn('action_options', 'type'),
      queryInterface.removeColumn('action_options', 'route')]
      )
  }
};
