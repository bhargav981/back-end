'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('storyline_intros', 'intro_video', {type: Sequelize.STRING});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('storyline_intros', 'intro_video')
  }
};
