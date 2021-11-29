

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('action_option_message_pool',[
      {
        "id": 1,
        "action_option_id": 1,
        "message": "label_dummy",
        "type": "positive",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      },
      {
        "id": 2,
        "action_option_id": 1,
        "message": "label_dummy",
        "type": "negative",
        "created_at": "2019-05-26 21:01:39",
        "updated_at": "2019-05-26 21:01:39"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('action_option_message_pool', null, {});
  }
};
