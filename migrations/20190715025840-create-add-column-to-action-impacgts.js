'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.addColumn('action_option_metrics_impacts', 'sprint_count', {type: Sequelize.INTEGER});
  },
  down: (queryInterface, Sequelize) => {
    
  }
};