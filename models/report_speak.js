'use strict';
module.exports = (sequelize, DataTypes) => {
	const report_speaks = sequelize.define('report_speaks', {
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
		metricId: {
			field: 'metric_id',
			type: DataTypes.INTEGER,
			references: {
				model: 'metrics',
				key: 'id'
			}
		},
		metricChange: {
			field: 'metric_change',
			type: DataTypes.INTEGER
		}
	}, {
			underscored: true,
			timestamps: true
		});
	report_speaks.associate = function (models) {
		// associations can be defined here
	};
	return report_speaks;
};