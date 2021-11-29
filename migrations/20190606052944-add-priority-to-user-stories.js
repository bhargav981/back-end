'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {

		return queryInterface.addColumn('user_stories', 'story_priority', {
			type: Sequelize.INTEGER,
			references: {
				model: "priorities",
				key: "id"
			}
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('user_stories', 'story_priority')
	}
};