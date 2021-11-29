'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('storyline_events', 'action_option_id'),
      queryInterface.removeColumn('storyline_events', 'is_action_taken'),
      queryInterface.removeColumn('storyline_events', 'last_action_duration'),
    ]);
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
