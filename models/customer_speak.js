'use strict';
module.exports = (sequelize, DataTypes) => {
	const customer_speaks = sequelize.define('customer_speaks', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		sprintNumber: {
			field: 'sprint_number',
			type: DataTypes.INTEGER
		},
		message: {
			field: 'message',
			type: DataTypes.STRING
		},
		storylineId: {
			field: 'storyline_id',
			type: DataTypes.INTEGER,
			references: {
				model: 'storylines',
				key: 'id'
			}
		},
		customerId: {
			field: 'customer_id',
			type: DataTypes.INTEGER,
			references: {
				model: 'customers',
				key: 'id'
			}
		},
	}, {
			underscored: true,
			timestamps: true
		});
	customer_speaks.associate = function (models) {
		// associations can be defined here
	};
	return customer_speaks;
};