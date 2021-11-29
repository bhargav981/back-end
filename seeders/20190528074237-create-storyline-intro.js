'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('storyline_intros', [{
          "storyline_id": 1,
          "company_name": "label_company_name",
          "competitor_name": "label_competitor_name",
          "tracker_name": "label_tracker_name",
          "welcome_text_title": "label_welcome_title",
          "case_study_title": "label_case_title",
          "about_your_company_title": "label_about_company_title",
          "about_your_team_title": "label_about_team_title",
          "objectives_title": "label_objectives_title",
          "playing_conditions_title": "label_playing_conditions_title",
          "welcome_text_desc": "label_welcome_desc",
          "case_study_desc": "label_case_description",
          "about_your_company_desc": "label_about_company_desc",
          "about_your_team_desc": "label_about_team_desc",
          "objectives_desc": "label_objectives_desc",
          "playing_conditions_desc": "label_playing_conditions_desc",
          "created_at": "2019-05-24 15:31:39",
           "updated_at": "2019-05-24 15:31:39"
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('storyline_intros', null, {});
  }
};
