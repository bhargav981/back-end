'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('storyline_blockers', 'action_option_id'),
      queryInterface.removeColumn('storyline_blockers', 'is_action_taken'),
      queryInterface.removeColumn('storyline_blockers', 'last_action_duration'),
      queryInterface.removeColumn('storyline_blockers', 'validator_id'),
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
