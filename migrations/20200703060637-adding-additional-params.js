'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
        'groups', 'is_leaderboard_enabled', {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        }
      ),
      queryInterface.addColumn(
        'groups', 'is_final_report_enabled', {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        }
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('groups', 'is_leaderboard_enabled'),
      queryInterface.removeColumn('groups', 'is_final_report_enabled')
    ]);
  }
};
