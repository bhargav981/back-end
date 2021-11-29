'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.describeTable("action_option_message_level").then(tableDefinition => {
        if (tableDefinition.action_option_id) {
          queryInterface.removeColumn('action_option_message_level','action_option_id' );
        }
      }),

      queryInterface.describeTable("action_option_message_level").then(tableDefinition => {
        if (!tableDefinition.action_id) {
          queryInterface.addColumn('action_option_message_level','action_id',{
            type: Sequelize.INTEGER,
            references:{
              model: "actions",
              field: "id"
            }
          });
        }
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn('action_option_message_level','action_option_id' ),
        queryInterface.removeColumn('action_option_message_level', 'action_id')
      ]);
  }
};
