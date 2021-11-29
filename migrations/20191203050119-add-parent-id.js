'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('storylines', 'parent_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'storylines',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('storylines', 'parent_id');
  }
};
