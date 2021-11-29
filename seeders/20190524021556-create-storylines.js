'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('storylines', [{
      "id": 1,
      "name": "Agile",
      "description": "",
      "is_demo": false,
      "created_at": "2019-05-23 15:31:39",
      "updated_at": "2019-05-23 15:31:39"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('storylines', null, {});

  }
};