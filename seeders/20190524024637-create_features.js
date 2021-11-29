'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('features', [
      {
        "id": 1,
        "name": "label_feature_1_name_cap",
        "description": "label_feature_1_desc",
        "created_at": "2019-05-23 15:31:39",
        "updated_at": "2019-05-23 15:31:39"
      },
      {
        "id": 2,
        "name": "label_feature_2_name_cap",
        "description": "label_feature_2_desc",
        "created_at": "2019-05-24 15:31:39",
        "updated_at": "2019-05-24 15:31:39"
      },
      {
        "id": 3,
        "name": "label_feature_3_name",
        "description": "label_feature_3_desc",
        "created_at": "2019-05-25 15:31:39",
        "updated_at": "2019-05-25 15:31:39"
      },
      {
        "id": 4,
        "name": "label_feature_4_name",
        "description": "label_feature_4_desc",
        "created_at": "2019-05-26 15:31:39",
        "updated_at": "2019-05-26 15:31:39"
      },
      {
        "id": 5,
        "name": "label_feature_5_name_cap",
        "description": "label_feature_5_desc",
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      },
      {
        "id": 6,
        "name": "label_feature_6_name",
        "description": "label_feature_6_desc",
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('features', null, {});
  }
};
