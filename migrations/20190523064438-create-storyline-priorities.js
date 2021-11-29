'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('storyline_priorities', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      storyline_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'storylines',
          key: 'id'
        }
      },
      priority_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'priorities',
          key: 'id'
        }
      },
      max_tasks_allowed_percentage: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('storyline_priorities');
  }
};