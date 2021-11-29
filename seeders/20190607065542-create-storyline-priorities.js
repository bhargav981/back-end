'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {

		return queryInterface.bulkInsert('storyline_priorities', [
			{
				"id": 1,
				"storyline_id": 1,
				"priority_id": 1,
				"max_tasks_allowed_percentage": 33.33,
				"created_at": "2019-05-25 15:31:39",
				"updated_at": "2019-05-25 15:31:39"
			},
			{
				"id": 2,
				"storyline_id": 1,
				"priority_id": 2,
				"max_tasks_allowed_percentage": 33.33,
				"created_at": "2019-05-25 15:31:39",
				"updated_at": "2019-05-25 15:31:39"
			},
			{
				"id": 3,
				"storyline_id": 1,
				"priority_id": 3,
				"max_tasks_allowed_percentage": 33.33,
				"created_at": "2019-05-25 15:31:39",
				"updated_at": "2019-05-25 15:31:39"
			},
		], {});
	},

	down: (queryInterface, Sequelize) => {
		
		return queryInterface.bulkDelete('storyline_priorities', null, {});
	}
};
