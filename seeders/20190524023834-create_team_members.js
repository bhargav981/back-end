'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('team_members', [
        {
          "id": 1,
          "name": "label_team_member_1_name",
          "description": "label_team_member_1_desc",
          "designation": "label_team_member_1_designation",
          "image_key": "image_tm_1",
          "created_at": "2019-05-23 15:31:39",
          "updated_at": "2019-05-23 15:31:39"
        },
        {
          "id": 2,
          "name": "label_team_member_2_name",
          "description": "label_team_member_2_desc",
          "designation": "label_team_member_2_designation",
          "image_key": "image_tm_2",
          "created_at": "2019-05-24 15:31:39",
          "updated_at": "2019-05-24 15:31:39"
        },
        {
          "id": 3,
          "name": "label_team_member_3_name",
          "description": "label_team_member_3_desc",
          "designation": "label_team_member_3_designation",
          "image_key": "image_tm_3",
          "created_at": "2019-05-25 15:31:39",
          "updated_at": "2019-05-25 15:31:39"
        },
        {
          "id": 4,
          "name": "label_team_member_4_name",
          "description": "label_team_member_4_desc",
          "designation": "label_team_member_4_designation",
          "image_key": "image_tm_4",
          "created_at": "2019-05-26 15:31:39",
          "updated_at": "2019-05-26 15:31:39"
        },
        {
          "id": 5,
          "name": "label_team_member_5_name",
          "description": "label_team_member_5_desc",
          "designation": "label_team_member_5_designation",
          "image_key": "image_tm_5",
          "created_at": "2019-05-27 15:31:39",
          "updated_at": "2019-05-27 15:31:39"
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('team_members', null, {});
  }
};
