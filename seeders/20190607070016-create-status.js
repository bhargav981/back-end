'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {

		return queryInterface.bulkInsert('statuses', [
			{
				"id": 1,
				"key": "label_status_1_name",
				"name": "label_status_1_desc",
				"created_at": "2019-05-25 15:31:39",
				"updated_at": "2019-05-25 15:31:39"
			},
			{
				"id": 2,
				"key": "label_status_2_name",
				"name": "label_status_2_desc",
				"created_at": "2019-05-25 15:31:39",
				"updated_at": "2019-05-25 15:31:39"
			},
			{
				"id": 3,
				"key": "label_status_3_name",
				"name": "label_status_3_desc",
				"created_at": "2019-05-25 15:31:39",
				"updated_at": "2019-05-25 15:31:39"
			},
			{
				"id": 4,
				"key": "label_status_4_name",
				"name": "label_status_4_desc",
				"created_at": "2019-05-25 15:31:39",
				"updated_at": "2019-05-25 15:31:39"
			}
		], {});
	},

	down: (queryInterface, Sequelize) => {
		
		return queryInterface.bulkDelete('statuses', null, {});
	}
};
