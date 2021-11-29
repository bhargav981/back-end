'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'groups', 'is_feedback_enabled', {
        type: Sequelize.BOOLEAN,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('groups', 'is_feedback_enabled');
  }
};
