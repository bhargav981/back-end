'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('storyline_intros', {
      storyline_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'storylines',
          key: 'id'
        }
      },
      intro_title: {
        type: Sequelize.STRING
      },
      company_name: {
        type: Sequelize.STRING
      },
      competitor_name: {
        type: Sequelize.STRING
      },
      tracker_name: {
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
    return queryInterface.dropTable('storyline_intros');
  }
};