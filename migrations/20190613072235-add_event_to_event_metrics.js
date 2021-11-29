'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('event_metric_impacts', 'event_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      }
    })
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
