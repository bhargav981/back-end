'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('storyline_events', [
      {
        "id": 1,
        "storyline_id": 1,
        "event_id": 1,
        "sprint_number": 1,
        "sprint_day": 9,
        "type": "generalEvent",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 2,
        "storyline_id": 1,
        "event_id": 2,
        "sprint_number": 1,
        "sprint_day": 5,
        "type": "generalEvent",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 3,
        "storyline_id": 1,
        "event_id": 3,
        "sprint_number": 1,
        "sprint_day": 6,
        "type": "actionsBasedEvent",
        "action_option_id": 3,
        "is_action_taken": 1,
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 4,
        "storyline_id": 1,
        "event_id": 4,
        "sprint_number": 1,
        "sprint_day": 4,
        "type": "actionsBasedEvent",
        "action_option_id": 6,
        "is_action_taken": 1,
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 5,
        "storyline_id": 1,
        "event_id": 5,
        "sprint_number": 1,
        "sprint_day": 7,
        "type": "actionsBasedEvent",
        "action_option_id": 11,
        "is_action_taken": 1,
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 6,
        "storyline_id": 1,
        "event_id": 6,
        "sprint_number": 2,
        "sprint_day": 2,
        "type": "actionsBasedEvent",
        "action_option_id": 1,
        "is_action_taken": 1,
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 7,
        "storyline_id": 1,
        "event_id": 7,
        "sprint_number": 2,
        "sprint_day": 6,
        "type": "actionsBasedEvent",
        "action_option_id": 1,
        "is_action_taken": 1,
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 8,
        "storyline_id": 1,
        "event_id": 8,
        "sprint_number": 2,
        "sprint_day": 5,
        "type": "generalEvent",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 9,
        "storyline_id": 1,
        "event_id": 9,
        "sprint_number": 2,
        "sprint_day": 7,
        "type": "generalEvent",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 10,
        "storyline_id": 1,
        "event_id": 10,
        "sprint_number": 3,
        "sprint_day": 2,
        "type": "actionsBasedEvent",
        "action_option_id": 1,
        "is_action_taken": 1,
        "last_action_duration": 10,
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 11,
        "storyline_id": 1,
        "event_id": 11,
        "sprint_number": 3,
        "sprint_day": 6,
        "type": "actionsBasedEvent",
        "action_option_id": 3,
        "is_action_taken": 1,
        "last_action_duration": 10,
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 12,
        "storyline_id": 1,
        "event_id": 12,
        "sprint_number": 3,
        "sprint_day": 5,
        "type": "actionsBasedEvent",
        "action_option_id": 9,
        "is_action_taken": 1,
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 13,
        "storyline_id": 1,
        "event_id": 13,
        "sprint_number": 3,
        "sprint_day": 8,
        "type": "actionsBasedEvent",
        "action_option_id": 8,
        "is_action_taken": 1,
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 14,
        "storyline_id": 1,
        "event_id": 14,
        "sprint_number": 3,
        "sprint_day": 7,
        "type": "generalEvent",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 15,
        "storyline_id": 1,
        "event_id": 15,
        "sprint_number": 4,
        "sprint_day": 2,
        "type": "actionsBasedEvent",
        "action_option_id": 9,
        "is_action_taken": 1,
        "last_action_duration": 10,
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 16,
        "storyline_id": 1,
        "event_id": 16,
        "sprint_number": 4,
        "sprint_day": 5,
        "type": "actionsBasedEvent",
        "action_option_id": 8,
        "is_action_taken": 1,
        "last_action_duration": 10,
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 17,
        "storyline_id": 1,
        "event_id": 17,
        "sprint_number": 4,
        "sprint_day": 6,
        "type": "actionsBasedEvent",
        "action_option_id": 11,
        "is_action_taken": 1,
        "last_action_duration": 10,
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 18,
        "storyline_id": 1,
        "event_id": 18,
        "sprint_number": 4,
        "sprint_day": 7,
        "type": "generalEvent",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 19,
        "storyline_id": 1,
        "event_id": 19,
        "sprint_number": 5,
        "sprint_day": 6,
        "type": "actionsBasedEvent",
        "action_option_id": 10,
        "is_action_taken": 1,
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 20,
        "storyline_id": 1,
        "event_id": 20,
        "sprint_number": 5,
        "sprint_day": 2,
        "type": "actionsBasedEvent",
        "action_option_id": 10,
        "is_action_taken": 1,
        "last_action_duration": 10,
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 21,
        "storyline_id": 1,
        "event_id": 21,
        "sprint_number": 1,
        "sprint_day": 3,
        "type": "metricsBasedEvent",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 22,
        "storyline_id": 1,
        "event_id": 22,
        "sprint_number": 2,
        "sprint_day": 3,
        "type": "metricsBasedEvent",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 23,
        "storyline_id": 1,
        "event_id": 23,
        "sprint_number": 3,
        "sprint_day": 3,
        "type": "metricsBasedEvent",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 24,
        "storyline_id": 1,
        "event_id": 24,
        "sprint_number": 4,
        "sprint_day": 3,
        "type": "metricsBasedEvent",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 25,
        "storyline_id": 1,
        "event_id": 25,
        "sprint_number": 5,
        "sprint_day": 3,
        "type": "metricsBasedEvent",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('storyline_events', null, {});
  }
};
