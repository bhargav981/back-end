'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('storyline_features', [
      {
        "id": 1,
        "storyline_id": 1,
        "feature_id": 1,
        "created_at": "2019-05-23 15:31:39",
        "updated_at": "2019-05-23 15:31:39"
      },
      {
        "id": 2,
        "storyline_id": 1,
        "feature_id": 2,
        "created_at": "2019-05-24 15:31:39",
        "updated_at": "2019-05-24 15:31:39"
      },
      {
        "id": 3,
        "storyline_id": 1,
        "feature_id": 3,
        "created_at": "2019-05-25 15:31:39",
        "updated_at": "2019-05-25 15:31:39"
      },
      {
        "id": 4,
        "storyline_id": 1,
        "feature_id": 4,
        "created_at": "2019-05-26 15:31:39",
        "updated_at": "2019-05-26 15:31:39"
      },
      {
        "id": 5,
        "storyline_id": 1,
        "feature_id": 5,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      },
      {
        "id": 6,
        "storyline_id": 1,
        "feature_id": 6,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('storyline_features', null, {});
  }
};
