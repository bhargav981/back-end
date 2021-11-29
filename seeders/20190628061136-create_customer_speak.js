'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('customer_speaks', [
			{
				"id": 1,
				"sprint_number": 1,
				"message": "label_customer_speak_sprint_1_message_1",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 2,
				"sprint_number": 1,
				"message": "label_customer_speak_sprint_1_message_2",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 3,
				"sprint_number": 1,
				"message": "label_customer_speak_sprint_1_message_3",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 4,
				"sprint_number": 1,
				"message": "label_customer_speak_sprint_1_message_4",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 5,
				"sprint_number": 2,
				"message": "label_customer_speak_sprint_2_message_1",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 6,
				"sprint_number": 2,
				"message": "label_customer_speak_sprint_2_message_2",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 7,
				"sprint_number": 2,
				"message": "label_customer_speak_sprint_2_message_3",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 8,
				"sprint_number": 2,
				"message": "label_customer_speak_sprint_2_message_4",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 9,
				"sprint_number": 3,
				"message": "label_customer_speak_sprint_3_message_1",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 10,
				"sprint_number": 3,
				"message": "label_customer_speak_sprint_3_message_2",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 11,
				"sprint_number": 3,
				"message": "label_customer_speak_sprint_3_message_3",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 12,
				"sprint_number": 3,
				"message": "label_customer_speak_sprint_3_message_4",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 13,
				"sprint_number": 4,
				"message": "label_customer_speak_sprint_4_message_1",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 14,
				"sprint_number": 4,
				"message": "label_customer_speak_sprint_4_message_2",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 15,
				"sprint_number": 4,
				"message": "label_customer_speak_sprint_4_message_3",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 16,
				"sprint_number": 4,
				"message": "label_customer_speak_sprint_4_message_4",
				"storyline_id": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			}
		], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('customer_speaks', null, {});
	}
};
