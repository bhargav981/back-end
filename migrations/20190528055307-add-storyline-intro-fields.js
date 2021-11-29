'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all ([
      queryInterface.describeTable ('storyline_intros').then (tableDefinition => {
        if (tableDefinition.intro_title) {
          queryInterface.removeColumn('storyline_intros', 'intro_title');
        }
      }),
      queryInterface.addColumn('storyline_intros', 'welcome_text_title', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'welcome_text_desc', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'case_study_title', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'case_study_desc', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'about_your_company_title', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'about_your_company_desc', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'about_your_team_title', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'about_your_team_desc', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'objectives_title', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'objectives_desc', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'playing_conditions_title', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'playing_conditions_desc', {
        type: Sequelize.STRING
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('storyline_intros', 'welcome_text_title', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'welcome_text_desc', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'case_study_title', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'case_study_desc', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'about_your_company_title', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'about_your_company_desc', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'about_your_team_title', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'about_your_team_desc', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'objectives_title', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'objectives_desc', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'playing_conditions_title', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('storyline_intros', 'playing_conditions_desc', {
        type: Sequelize.STRING
      })
    ]);
  }
};
