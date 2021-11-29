'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.addColumn('action_options', 'message_level_type', {type: Sequelize.STRING});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('action_options', 'type');
  }
};
