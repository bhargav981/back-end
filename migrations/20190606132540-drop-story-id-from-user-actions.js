'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('user_action_options','story_id'),
      queryInterface.removeColumn('user_action_options','response'),
      queryInterface.removeColumn('user_action_options','impact'),
      queryInterface.addColumn('user_action_options', 'message', {type: Sequelize.STRING}),
      queryInterface.addColumn('user_action_options', 'type', {type: Sequelize.STRING})
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('user_action_options','story_id',{
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('user_action_options','response',{
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('user_action_options','impact',{
        type: Sequelize.INTEGER
      }),
      queryInterface.removeColumn('user_action_options','message'),
      queryInterface.removeColumn('user_action_options','type')
    ])

  }
};
