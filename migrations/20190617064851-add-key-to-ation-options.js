'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'action_options', 'key', {
        type: Sequelize.STRING,
        after: "action_id"
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('action_options', 'key');
  }
};
