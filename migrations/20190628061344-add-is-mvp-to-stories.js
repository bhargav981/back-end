'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('stories', 'is_pa', {
			type: Sequelize.BOOLEAN
		});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('stories', 'is_pa');
  }
};
