'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('default_strings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      lang: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      value: {
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
    return queryInterface.dropTable('default_strings');
  }
};