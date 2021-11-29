'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('actions', 'is_global', {
			type: Sequelize.BOOLEAN
		});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('actions', 'is_global');
  }
};
