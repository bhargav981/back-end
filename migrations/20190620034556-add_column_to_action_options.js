'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('action_options', 'throughput', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('action_options', 'quality', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('action_options', 'cs', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
