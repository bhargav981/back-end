'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'user_metrics', 'metrics_id', {
        type: Sequelize.INTEGER,
        after: 'uli_id',
        references: {
          model: 'metrics',
          key: 'id'
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('user_metrics', 'metrics_id');
  }
};
