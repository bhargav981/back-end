'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'user_states', 'current_phase_id', {
        type: Sequelize.INTEGER,
        references:{
          field: "id",
          model: "phases"
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('user_states', 'current_phase_id');
  }
};