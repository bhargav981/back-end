'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('storyline_blockers', 'sprint_number', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('storyline_blockers', 'sprint_day', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('storyline_blockers', 'action_option_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'action_options',
          key: 'id'
        }
      }),
      queryInterface.addColumn('storyline_blockers', 'type', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_blockers', 'is_action_taken', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('storyline_blockers', 'last_action_duration', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('storyline_blockers', 'validator_id', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('storyline_blockers', 'selector_id', {
        type: Sequelize.INTEGER
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('storyline_blockers', 'sprint_number'),
      queryInterface.removeColumn('storyline_blockers', 'sprint_day'),
      queryInterface.removeColumn('storyline_blockers', 'action_option_id'),
      queryInterface.removeColumn('storyline_blockers', 'type'),
      queryInterface.removeColumn('storyline_blockers', 'is_action_taken'),
      queryInterface.removeColumn('storyline_blockers', 'last_action_duration'),
      queryInterface.removeColumn('storyline_blockers', 'validator_id'),
      queryInterface.removeColumn('storyline_blockers', 'selector_id')
    ]);
  }
};
