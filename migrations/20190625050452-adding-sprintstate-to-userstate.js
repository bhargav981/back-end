'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('user_states', 'current_sprint_state', {
			type: Sequelize.INTEGER
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('user_states', 'current_sprint_state');
	}
};
