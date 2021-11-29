'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('action_option_message_pool', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      action_option_id:{
        type: Sequelize.INTEGER,
        references:{
          model: "action_options",
          field: "id"
        }
      },
      message:{
        type: Sequelize.STRING
      },
      type:{
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('action_option_message_pool');
  }
};