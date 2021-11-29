'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('prds', [
      {
        "id": 1,
        "name": "label_prd_1_name",
        "description": "label_prd_1_desc",
        "image_key": "image_prd_1",
        "cost_title": "label_cost_title",
        "cost_description": "label_cost_desc",
        "effort_title": "label_effort_title",
        "effort_description": "label_effort_desc",
        "created_at": "2019-05-25 15:31:39",
        "updated_at": "2019-05-25 15:31:39"
      },
      {
        "id": 2,
        "name": "label_prd_2_name",
        "description": "label_prd_2_desc",
        "image_key": "image_prd_2",
        "cost_title": "label_cost_title",
        "cost_description": "label_cost_desc",
        "effort_title": "label_effort_title",
        "effort_description": "label_effort_desc",
        "created_at": "2019-05-23 15:31:39",
        "updated_at": "2019-05-23 15:31:39"
      },
      {
        "id": 3,
        "name": "label_prd_3_name",
        "description": "label_prd_3_desc",
        "image_key": "image_prd_3",
        "cost_title": "label_cost_title",
        "cost_description": "label_cost_desc",
        "effort_title": "label_effort_title",
        "effort_description": "label_effort_desc",
        "created_at": "2019-05-24 15:31:39",
        "updated_at": "2019-05-24 15:31:39"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('prds', null, {});
  }
};
