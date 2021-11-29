'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  Promise.all([
      queryInterface.addColumn('storyline_team_members', 'avatar', {type: Sequelize.STRING}),
      queryInterface.addColumn('storyline_customers', 'avatar', {type: Sequelize.STRING}),
      queryInterface.addColumn('storyline_customers', 'designation', {type: Sequelize.STRING})
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('storyline_team_members', 'avatar'),
      queryInterface.removeColumn('storyline_customers', 'avatar'),
      queryInterface.removeColumn('storyline_customers', 'designation')
    ]);
  }
};
