'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {

		return queryInterface.bulkInsert('phases',[
      {
        "id": 1,
        "name": "label_phase_1_name",
        "description": "",
        "created_at": "2019-05-25 15:31:39",
				"updated_at": "2019-05-25 15:31:39"
      },
      {
        "id": 2,
        "name": "label_phase_2_name",
        "description": "",
        "created_at": "2019-05-25 15:31:39",
				"updated_at": "2019-05-25 15:31:39"
      }
    ] , {});
	},

	down: (queryInterface, Sequelize) => {		
		return queryInterface.bulkDelete('phases', null, {});
	}
};
