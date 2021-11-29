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
      queryInterface.addColumn(
        'storyline_events', 'sprint_number', { type: Sequelize.INTEGER }
      ),
      queryInterface.addColumn(
        'storyline_events', 'action_option_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'action_options',
            key: 'id'
          }
        }
      ),
      queryInterface.addColumn(
        'storyline_events', 'story_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'stories',
            key: 'id'
          }
        }
      ),
      queryInterface.addColumn(
        'storyline_events', 'type', { type: Sequelize.STRING }
      ),
      queryInterface.addColumn(
        'storyline_events', 'is_action_taken', { type: Sequelize.INTEGER }
      ),
      queryInterface.addColumn(
        'storyline_events', 'last_action_duration', { type: Sequelize.INTEGER }
      ),
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
      queryInterface.removeColumn('storyline_events', 'sprint_number'),
      queryInterface.removeColumn('storyline_events', 'action_option_id'),
      queryInterface.removeColumn('storyline_events', 'story_id'),
      queryInterface.removeColumn('storyline_events', 'type'),
      queryInterface.removeColumn('storyline_events', 'is_action_taken'),
      queryInterface.removeColumn('storyline_events', 'last_action_duration')
    ]);
  }
};
