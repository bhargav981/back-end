'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('user_action_options','action_id',{
        type: Sequelize.INTEGER,
        references:{
          model: "actions",
          field: "id"
        }
      });
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('user_action_options', "action_id");
  }
};
