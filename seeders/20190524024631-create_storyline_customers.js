'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('storyline_customers', [
      {
        "id": 1,
        "storyline_id": 1,
        "customer_id": 1,
        "created_at": "2019-05-23 15:31:39",
        "updated_at": "2019-05-23 15:31:39"
      },
      {
        "id": 2,
        "storyline_id": 1,
        "customer_id": 2,
        "created_at": "2019-05-24 15:31:39",
        "updated_at": "2019-05-24 15:31:39"
      },
      {
        "id": 3,
        "storyline_id": 1,
        "customer_id": 3,
        "created_at": "2019-05-25 15:31:39",
        "updated_at": "2019-05-25 15:31:39"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('storyline_customers', null, {});
  }
};
