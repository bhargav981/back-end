'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('storyline_metrics', 'is_shown_by_default', {
			type: Sequelize.STRING
		});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('storyline_metrics', 'is_shown_by_default');
  }
};
