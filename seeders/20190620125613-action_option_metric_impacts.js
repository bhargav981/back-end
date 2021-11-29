'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("action_option_metrics_impacts", [
      {
        "id": 1,
        "metric_id": 1,
        "action_option_id": 1,
        "immediate_impact": "",
        "delayed_impact": "",
        "delay_days": "",
        "created_at": "2019-05-24 16:28:01",
        "updated_at": "2019-05-24 16:28:01",
        "direction": 1
      },
      {
        "id": 2,
        "metric_id": 1,
        "action_option_id": 2,
        "immediate_impact": "",
        "delayed_impact": "",
        "delay_days": "",
        "created_at": "2019-05-24 16:28:01",
        "updated_at": "2019-05-24 16:28:01",
        "direction": 1
      },
      {
        "id": 3,
        "metric_id": 2,
        "action_option_id": 1,
        "immediate_impact": "",
        "delayed_impact": "",
        "delay_days": "",
        "created_at": "2019-05-24 16:28:01",
        "updated_at": "2019-05-24 16:28:01",
        "direction": 1
      },
      {
        "id": 4,
        "metric_id": 3,
        "action_option_id": 1,
        "immediate_impact": "",
        "delayed_impact": "",
        "delay_days": "",
        "created_at": "2019-05-24 16:28:01",
        "updated_at": "2019-05-24 16:28:01",
        "direction": 1
      },
      {
        "id": 5,
        "metric_id": 4,
        "action_option_id": 1,
        "immediate_impact": "",
        "delayed_impact": "",
        "delay_days": "",
        "created_at": "2019-05-24 16:28:01",
        "updated_at": "2019-05-24 16:28:01",
        "direction": 1
      },
      {
        "id": 6,
        "metric_id": 5,
        "action_option_id": 1,
        "immediate_impact": "",
        "delayed_impact": "",
        "delay_days": "",
        "created_at": "2019-05-24 16:28:01",
        "updated_at": "2019-05-24 16:28:01",
        "direction": 1
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('action_option_metrics_impacts', null, {});
  }
};
