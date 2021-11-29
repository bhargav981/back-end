'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('report_speaks', [
			{
				"id": 1,
				"sprint_number": 1,
				"message": "label_report_speak_sprint_1_tm_change_positive",
				"storyline_id": 1,
				"metric_id": 2,
				"metric_change": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 2,
				"sprint_number": 2,
				"message": "label_report_speak_sprint_2_tm_change_positive",
				"storyline_id": 1,
				"metric_id": 2,
				"metric_change": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 3,
				"sprint_number": 3,
				"message": "label_report_speak_sprint_3_tm_change_positive",
				"storyline_id": 1,
				"metric_id": 2,
				"metric_change": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 4,
				"sprint_number": 4,
				"message": "label_report_speak_sprint_4_tm_change_positive",
				"storyline_id": 1,
				"metric_id": 2,
				"metric_change": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 5,
				"sprint_number": 1,
				"message": "label_report_speak_sprint_1_tm_change_negative",
				"storyline_id": 1,
				"metric_id": 2,
				"metric_change": -1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 6,
				"sprint_number": 2,
				"message": "label_report_speak_sprint_2_tm_change_negative",
				"storyline_id": 1,
				"metric_id": 2,
				"metric_change": -1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 7,
				"sprint_number": 3,
				"message": "label_report_speak_sprint_3_tm_change_negative",
				"storyline_id": 1,
				"metric_id": 2,
				"metric_change": -1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 8,
				"sprint_number": 4,
				"message": "label_report_speak_sprint_4_tm_change_negative",
				"storyline_id": 1,
				"metric_id": 2,
				"metric_change": -1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 9,
				"sprint_number": 1,
				"message": "label_report_speak_sprint_1_ts_change_positive",
				"storyline_id": 1,
				"metric_id": 1,
				"metric_change": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 10,
				"sprint_number": 2,
				"message": "label_report_speak_sprint_2_ts_change_positive",
				"storyline_id": 1,
				"metric_id": 1,
				"metric_change": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 11,
				"sprint_number": 3,
				"message": "label_report_speak_sprint_3_ts_change_positive",
				"storyline_id": 1,
				"metric_id": 1,
				"metric_change": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 12,
				"sprint_number": 4,
				"message": "label_report_speak_sprint_4_ts_change_positive",
				"storyline_id": 1,
				"metric_id": 1,
				"metric_change": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 13,
				"sprint_number": 1,
				"message": "label_report_speak_sprint_1_cs_change_positive",
				"storyline_id": 1,
				"metric_id": 5,
				"metric_change": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 14,
				"sprint_number": 2,
				"message": "label_report_speak_sprint_2_cs_change_positive",
				"storyline_id": 1,
				"metric_id": 5,
				"metric_change": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 15,
				"sprint_number": 3,
				"message": "label_report_speak_sprint_3_cs_change_positive",
				"storyline_id": 1,
				"metric_id": 5,
				"metric_change": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 16,
				"sprint_number": 4,
				"message": "label_report_speak_sprint_4_cs_change_positive",
				"storyline_id": 1,
				"metric_id": 5,
				"metric_change": 1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 17,
				"sprint_number": 1,
				"message": "label_report_speak_sprint_1_cs_change_negative",
				"storyline_id": 1,
				"metric_id": 5,
				"metric_change": -1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 18,
				"sprint_number": 2,
				"message": "label_report_speak_sprint_2_cs_change_negative",
				"storyline_id": 1,
				"metric_id": 5,
				"metric_change": -1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 19,
				"sprint_number": 3,
				"message": "label_report_speak_sprint_3_cs_change_negative",
				"storyline_id": 1,
				"metric_id": 5,
				"metric_change": -1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			},
			{
				"id": 20,
				"sprint_number": 4,
				"message": "label_report_speak_sprint_4_cs_change_negative",
				"storyline_id": 1,
				"metric_id": 5,
				"metric_change": -1,
				"created_at": "2019-05-24 10:58:01",
				"updated_at": "2019-05-24 10:58:01"
			}
		], {});
	},

	down: (queryInterface, Sequelize) => {
		/*
		  Add reverting commands here.
		  Return a promise to correctly handle asynchronicity.
	
		  Example:
		  return queryInterface.bulkDelete('People', null, {});
		*/
		return queryInterface.bulkDelete('report_speaks', null, {});
	}
};
