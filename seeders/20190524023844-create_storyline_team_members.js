'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('storyline_team_members', [
      {
        "id": 1,
        "storyline_id": 1,
        "team_member_id": 1,
        "skill": 10,
        "morale": 10,
        "experience": 10,
        "created_at": "2019-05-23 15:31:39",
        "updated_at": "2019-05-23 15:31:39"
      },
      {
        "id": 2,
        "storyline_id": 1,
        "team_member_id": 2,
        "skill": 10,
        "morale": 10,
        "experience": 10,
        "created_at": "2019-05-24 15:31:39",
        "updated_at": "2019-05-24 15:31:39"
      },
      {
        "id": 3,
        "storyline_id": 1,
        "team_member_id": 3,
        "skill": 10,
        "morale": 10,
        "experience": 10,
        "created_at": "2019-05-25 15:31:39",
        "updated_at": "2019-05-25 15:31:39"
      },
      {
        "id": 4,
        "storyline_id": 1,
        "team_member_id": 4,
        "skill": 10,
        "morale": 10,
        "experience": 10,
        "created_at": "2019-05-26 15:31:39",
        "updated_at": "2019-05-26 15:31:39"
      },
      {
        "id": 5,
        "storyline_id": 1,
        "team_member_id": 5,
        "skill": 10,
        "morale": 10,
        "experience": 10,
        "created_at": "2019-05-27 15:31:39",
        "updated_at": "2019-05-27 15:31:39"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('storyline_team_members', null, {});
  }
};
