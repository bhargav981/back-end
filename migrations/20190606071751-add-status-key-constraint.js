'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {

		return queryInterface.addColumn('user_stories', 'story_status', {
			type: Sequelize.INTEGER,
			references: {
				model: "statuses",
				key: "id"
			}
		});
	},

	down: (queryInterface, Sequelize) => {

		return queryInterface.removeColumn('user_stories', 'story_status');
	}
};