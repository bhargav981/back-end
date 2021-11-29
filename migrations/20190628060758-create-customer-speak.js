'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('customer_speaks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			sprint_number: {
				type: Sequelize.INTEGER
			},
			message: {
				type: Sequelize.STRING
			},
			storyline_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'storylines',
					key: 'id'
				}
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
		return queryInterface.dropTable('customer_speaks');
	}
};