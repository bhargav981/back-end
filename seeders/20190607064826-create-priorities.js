'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {

		return queryInterface.bulkInsert('priorities', [
			{
				"id": 1,
				"key": "label_priority_1_name",
				"name": "label_priority_1_desc",
				"created_at": "2019-05-25 15:31:39",
				"updated_at": "2019-05-25 15:31:39"
			},
			{
				"id": 2,
				"key": "label_priority_2_name",
				"name": "label_priority_2_desc",
				"created_at": "2019-05-25 15:31:39",
				"updated_at": "2019-05-25 15:31:39"
			},
			{
				"id": 3,
				"key": "label_priority_3_name",
				"name": "label_priority_3_desc",
				"created_at": "2019-05-25 15:31:39",
				"updated_at": "2019-05-25 15:31:39"
			}
		], {});
	},

	down: (queryInterface, Sequelize) => {
		
		return queryInterface.bulkDelete('priorities', null, {});
	}
};
