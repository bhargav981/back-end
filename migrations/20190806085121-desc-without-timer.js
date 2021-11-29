'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('storyline_intros', 'playing_conditions_desc_without_timer', {type: Sequelize.STRING});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('storyline_intros', 'playing_conditions_desc_without_timer')
  }
};
