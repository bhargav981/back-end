'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('actions', [{
        "id": 1,
        "name": "label_action_1_title",
        "description": "label_action_1_desc",
        "image_key": "image_key",
        "created_at": "2019-05-23 21:01:39",
        "updated_at": "2019-05-23 21:01:39",
        "sprint_limit": null,
        "game_limit": null
      },
      {
        "id": 2,
        "name": "label_action_2_title",
        "description": "label_action_2_desc",
        "image_key": "image_key",
        "created_at": "2019-05-23 21:01:39",
        "updated_at": "2019-05-23 21:01:39",
        "sprint_limit": 1,
        "game_limit": null
      },
      {
        "id": 3,
        "name": "label_action_3_title",
        "description": "label_action_3_desc",
        "image_key": "image_key",
        "created_at": "2019-05-23 21:01:39",
        "updated_at": "2019-05-23 21:01:39",
        "sprint_limit": null,
        "game_limit": null
      },
      {
        "id": 4,
        "name": "label_action_4_title",
        "description": "label_action_4_desc",
        "image_key": "image_key",
        "created_at": "2019-05-23 21:01:39",
        "updated_at": "2019-05-23 21:01:39",
        "sprint_limit": null,
        "game_limit": null
      },
      {
        "id": 5,
        "name": "label_action_5_title",
        "description": "label_action_5_desc",
        "image_key": "image_key",
        "created_at": "2019-05-23 21:01:39",
        "updated_at": "2019-05-23 21:01:39",
        "sprint_limit": null,
        "game_limit": null
      },
      {
        "id": 6,
        "name": "label_action_6_title",
        "description": "label_action_6_desc",
        "image_key": "image_key",
        "created_at": "2019-05-23 21:01:39",
        "updated_at": "2019-05-23 21:01:39",
        "sprint_limit": null,
        "game_limit": null
      },
      {
        "id": 7,
        "name": "label_action_7_title",
        "description": "label_action_7_desc",
        "image_key": "image_key",
        "created_at": "2019-05-23 21:01:39",
        "updated_at": "2019-05-23 21:01:39",
        "sprint_limit": null,
        "game_limit": null
      },
      {
        "id": 8,
        "name": "label_action_8_title",
        "description": "label_action_8_desc",
        "image_key": "image_key",
        "created_at": "2019-05-23 21:01:39",
        "updated_at": "2019-05-23 21:01:39",
        "sprint_limit": 1,
        "game_limit": 2
      },
      {
        "id": 9,
        "name": "label_action_9_title",
        "description": "label_action_9_desc",
        "image_key": "image_key",
        "created_at": "2019-05-23 21:01:39",
        "updated_at": "2019-05-23 21:01:39",
        "sprint_limit": 1,
        "game_limit": 2
      },
      {
        "id": 10,
        "name": "label_action_10_title",
        "description": "label_action_10_desc",
        "image_key": "image_key",
        "created_at": "2019-05-23 21:01:39",
        "updated_at": "2019-05-23 21:01:39",
        "sprint_limit": null,
        "game_limit": null
      },
      {
        "id": 11,
        "name": "label_action_11_title",
        "description": "label_action_11_desc",
        "image_key": "image_key",
        "created_at": "2019-05-23 21:01:39",
        "updated_at": "2019-05-23 21:01:39",
        "sprint_limit": null,
        "game_limit": null
      },
      {
        "id": 12,
        "name": "label_action_12_title",
        "description": "label_action_12_desc",
        "image_key": "image_key",
        "created_at": "2019-05-25 21:01:39",
        "updated_at": "2019-05-25 21:01:39",
        "sprint_limit": null,
        "game_limit": null
      },
      {
        "id": 13,
        "name": "label_action_13_title",
        "description": "label_action_13_desc",
        "image_key": "image_key",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39",
        "sprint_limit": null,
        "game_limit": null
      },
      {
        "id": 14,
        "name": "label_action_14_title",
        "description": "label_action_14_desc",
        "image_key": "image_key",
        "created_at": "2019-05-27 21:01:39",
        "updated_at": "2019-05-27 21:01:39",
        "sprint_limit": null,
        "game_limit": null
      },
      {
        "id": 15,
        "name": "label_action_15_title",
        "description": "label_action_15_desc",
        "image_key": "image_key",
        "created_at": "2019-05-28 21:01:39",
        "updated_at": "2019-05-28 21:01:39",
        "sprint_limit": null,
        "game_limit": null
      },
      {
        "id": 16,
        "name": "label_action_16_title",
        "description": "label_action_16_desc",
        "image_key": "image_key",
        "created_at": "2019-05-29 21:01:39",
        "updated_at": "2019-05-29 21:01:39",
        "sprint_limit": null,
        "game_limit": null
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('actions', null, {});
  }
};