'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {

		return queryInterface.bulkInsert('action_option_message_level', [
      {
        "id": 1,
        "action_id": 1,
        "message": "label_user_feedack_survey_ level_1",
        "level": 1,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 2,
        "action_id": 1,
        "message": "label_user_feedack_survey_ level_2",
        "level": 2,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 3,
        "action_id": 1,
        "message": "label_user_feedack_survey_ level_3",
        "level": 3,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 4,
        "action_id": 1,
        "message": "label_user_feedack_survey_ level_4",
        "level": 4,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 5,
        "action_id": 2,
        "message": "label_user_feedack_interview_level_1",
        "level": 1,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 6,
        "action_id": 2,
        "message": "label_user_feedack_interview_level_2",
        "level": 2,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 7,
        "action_id": 2,
        "message": "label_user_feedack_interview_level_3",
        "level": 3,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 8,
        "action_id": 2,
        "message": "label_user_feedack_interview_level_4",
        "level": 4,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 9,
        "action_id": 3,
        "message": "label_market_pulse_survey_level_1",
        "level": 1,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 10,
        "action_id": 3,
        "message": "label_market_pulse_survey_level_2",
        "level": 2,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 11,
        "action_id": 3,
        "message": "label_market_pulse_survey_level_3",
        "level": 3,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 12,
        "action_id": 3,
        "message": "label_market_pulse_survey_level_4",
        "level": 4,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 13,
        "action_id": 4,
        "message": "label_meet_the_team_level_1",
        "level": 1,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 14,
        "action_id": 4,
        "message": "label_meet_the_team_level_2",
        "level": 2,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 15,
        "action_id": 4,
        "message": "label_meet_the_team_level_3",
        "level": 3,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 16,
        "action_id": 4,
        "message": "label_meet_the_team_level_4",
        "level": 4,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 17,
        "action_id": 5,
        "message": "label_align_the_team_level_1",
        "level": 1,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 18,
        "action_id": 5,
        "message": "label_align_the_team_level_2",
        "level": 2,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 19,
        "action_id": 5,
        "message": "label_align_the_team_level_3",
        "level": 3,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 20,
        "action_id": 7,
        "message": "label_retrospect_level_1",
        "level": 1,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 21,
        "action_id": 7,
        "message": "label_retrospect_level_2",
        "level": 2,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 22,
        "action_id": 7,
        "message": "label_retrospect_level_3",
        "level": 3,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 23,
        "action_id": 8,
        "message": "label_team_lunch_level_1",
        "level": 1,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 24,
        "action_id": 8,
        "message": "label_team_lunch_level_2",
        "level": 2,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 25,
        "action_id": 9,
        "message": "label_team_morale_survey_level_1",
        "level": 1,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 26,
        "action_id": 9,
        "message": "label_team_morale_survey_level_2",
        "level": 2,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 27,
        "action_id": 10,
        "message": "label_train_the_team_level_1",
        "level": 1,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 28,
        "action_id": 10,
        "message": "label_train_the_team_level_2",
        "level": 2,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 29,
        "action_id": 10,
        "message": "label_train_the_team_level_3",
        "level": 3,
        "type": "",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 30,
        "action_id": 11,
        "message": "label_update_prd_level_1",
        "level": 1,
        "type": "",
        "created_at": "2019-05-27 21:01:39",
        "updated_at": "2019-05-27 21:01:39"
      },
      {
        "id": 31,
        "action_id": 11,
        "message": "label_update_prd_level_2",
        "level": 2,
        "type": "",
        "created_at": "2019-05-28 21:01:39",
        "updated_at": "2019-05-28 21:01:39"
      }
    ], {});
	},

	down: (queryInterface, Sequelize) => {		
		return queryInterface.bulkDelete('action_option_message_level', null, {});
	}
};
