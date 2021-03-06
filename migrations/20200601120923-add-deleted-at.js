'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.addColumn('users', 'deleted_at', {
        type: Sequelize.DATE,
        default: null
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'deleted_at');
  }
};
