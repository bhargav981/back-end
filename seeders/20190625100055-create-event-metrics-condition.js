'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('events_metrics_conditions', [
      {
        "id": 1,
        "event_id": 21,
        "metrics_id": 1,
        "value": 20,
        "operator": "greaterThanEqualTo",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 2,
        "event_id": 22,
        "metrics_id": 1,
        "value": 20,
        "operator": "greaterThanEqualTo",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 3,
        "event_id": 23,
        "metrics_id": 1,
        "value": 20,
        "operator": "greaterThanEqualTo",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 4,
        "event_id": 24,
        "metrics_id": 1,
        "value": 20,
        "operator": "greaterThanEqualTo",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      },
      {
        "id": 5,
        "event_id": 25,
        "metrics_id": 1,
        "value": 20,
        "operator": "greaterThanEqualTo",
        "created_at": "2019-05-24 10:58:01",
        "updated_at": "2019-05-24 10:58:01"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('events_metrics_conditions', null, {});    
  }
};
