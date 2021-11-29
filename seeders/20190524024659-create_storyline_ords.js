'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('storyline_prds',[
      {
        "id": 1,
        "storyline_id": 1,
        "prd_id": 1,
        "cost": 100,
        "effort": 2,
        "created_at": "2019-05-25 15:31:39",
        "updated_at": "2019-05-25 15:31:39"
      },
      {
        "id": 2,
        "storyline_id": 1,
        "prd_id": 2,
        "cost": 200,
        "effort": 4,
        "created_at": "2019-05-23 15:31:39",
        "updated_at": "2019-05-23 15:31:39"
      },
      {
        "id": 3,
        "storyline_id": 1,
        "prd_id": 3,
        "cost": 300,
        "effort": 6,
        "created_at": "2019-05-24 15:31:39",
        "updated_at": "2019-05-24 15:31:39"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('storyline_prds', null, {});
  }
};
