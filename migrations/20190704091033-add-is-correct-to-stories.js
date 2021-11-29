'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('stories', 'is_correct', {
			type: Sequelize.BOOLEAN
		});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('stories', 'is_correct');
  }
};
