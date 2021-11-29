'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('storyline_actions', [
      {
        "id": 1,
        "storyline_id": 1,
        "action_id": 1,
        "created_at": "2019-05-23 15:31:39",
        "updated_at": "2019-05-23 15:31:39"
      },
      {
        "id": 2,
        "storyline_id": 1,
        "action_id": 2,
        "created_at": "2019-05-24 15:31:39",
        "updated_at": "2019-05-24 15:31:39"
      },
      {
        "id": 3,
        "storyline_id": 1,
        "action_id": 3,
        "created_at": "2019-05-25 15:31:39",
        "updated_at": "2019-05-25 15:31:39"
      },
      {
        "id": 4,
        "storyline_id": 1,
        "action_id": 4,
        "created_at": "2019-05-26 15:31:39",
        "updated_at": "2019-05-26 15:31:39"
      },
      {
        "id": 5,
        "storyline_id": 1,
        "action_id": 5,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      },
      {
        "id": 6,
        "storyline_id": 1,
        "action_id": 6,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      },
      {
        "id": 7,
        "storyline_id": 1,
        "action_id": 7,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      },
      {
        "id": 8,
        "storyline_id": 1,
        "action_id": 8,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      },
      {
        "id": 9,
        "storyline_id": 1,
        "action_id": 9,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      },
      {
        "id": 10,
        "storyline_id": 1,
        "action_id": 10,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      },
      {
        "id": 11,
        "storyline_id": 1,
        "action_id": 11,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      },
      {
        "id": 12,
        "storyline_id": 1,
        "action_id": 12,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      },
      {
        "id": 13,
        "storyline_id": 1,
        "action_id": 13,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      },
      {
        "id": 14,
        "storyline_id": 1,
        "action_id": 14,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      },
      {
        "id": 15,
        "storyline_id": 1,
        "action_id": 15,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      },
      {
        "id": 16,
        "storyline_id": 1,
        "action_id": 16,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('storyline_actions', null, {});
  }
};
