'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.removeColumn('user_events', 'impact'),
      queryInterface.removeColumn('user_events', 'response')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.addColumn(
        'user_events', 'impact', { type: Sequelize.INTEGER }
      ),
      queryInterface.addColumn(
        'user_events', 'response', { type: Sequelize.INTEGER }
      )
    ]);
  }
};
