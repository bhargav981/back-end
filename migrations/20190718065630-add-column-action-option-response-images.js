'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('action_options', 'response_image_key', {
			type: Sequelize.STRING
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('action_options', 'response_image_key');
	}
};
