'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('customers', [
      {
        "id": 1,
        "name": "label_customer_1_name",
        "description": "label_customer_1_desc",
        "image_key": "image_customer_1",
        "created_at": "2019-05-23 15:31:39",
        "updated_at": "2019-05-23 15:31:39"
      },
      {
        "id": 2,
        "name": "label_customer_2_name",
        "description": "label_customer_2_desc",
        "image_key": "image_customer_2",
        "created_at": "2019-05-24 15:31:39",
        "updated_at": "2019-05-24 15:31:39"
      },
      {
        "id": 3,
        "name": "label_customer_3_name",
        "description": "label_customer_3_desc",
        "image_key": "image_customer_3",
        "created_at": "2019-05-25 15:31:39",
        "updated_at": "2019-05-25 15:31:39"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customers', null, {});
  }
};
