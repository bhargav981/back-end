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
      queryInterface.addColumn('events_actions_conditions', 'validator_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'validators',
          key: 'id'
        }
      }),
      queryInterface.addColumn('events_actions_conditions', 'validator_arguments', {
        type: Sequelize.JSON,
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
