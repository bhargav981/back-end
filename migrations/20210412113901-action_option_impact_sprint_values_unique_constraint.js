'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    // delete duplicate rows--todo 
   queryInterface.sequelize.query(`DELETE FROM user_action_option_impact_sprint_values 
                                          where id not in (
                                              SELECT MIN(id) as RowId 
                                              FROM user_action_option_impact_sprint_values 
                                              GROUP BY (uli_id ,sprint_number, action_option_id)
                                          )`)

   return Promise.all([
    queryInterface.addConstraint("user_action_option_impact_sprint_values", 
                                 ['uli_id' ,'sprint_number', 'action_option_id'],
                                 { type: 'unique', name: 'action_option_sprint_user_unique_constraint' })
   ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
