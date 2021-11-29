'use strict';
module.exports = (sequelize, DataTypes) => {
  const storyline_intro = sequelize.define('storyline_intro', {
    storylineId: {
      field: 'storyline_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'storylines',
        key: 'id'
      }
    },
    introVideo:{
      field:'intro_video',
      type: DataTypes.STRING
    },
    companyName: {
      field: 'company_name',
      type: DataTypes.STRING
    },
    competitorName: {
      field: 'competitor_name',
      type: DataTypes.STRING
    },
    trackerName: {
      field: 'tracker_name',
      type: DataTypes.STRING
    },
    welcomeTextTitle: {
      field: 'welcome_text_title',
      type: DataTypes.STRING
    },
    caseStudyTitle:{
      field: 'case_study_title',
      type: DataTypes.STRING
    },
    aboutYourCompanyTitle:{
      field: 'about_your_company_title',
      type: DataTypes.STRING
    },
    aboutYourTeamTitle:{
      field: 'about_your_team_title',
      type: DataTypes.STRING
    },
    objectivesTitle:{
      field: 'objectives_title',
      type: DataTypes.STRING
    },
    playingConditionsTitle:{
      field: 'playing_conditions_title',
      type: DataTypes.STRING
    },
    welcomeTextDesc: {
      field: 'welcome_text_desc',
      type: DataTypes.STRING
    },
    caseStudyDesc:{
      field: 'case_study_desc',
      type: DataTypes.STRING
    },
    aboutYourCompanyDesc:{
      field: 'about_your_company_desc',
      type: DataTypes.STRING
    },
    aboutYourTeamDesc:{
      field: 'about_your_team_desc',
      type: DataTypes.STRING
    },
    objectivesDesc:{
      field: 'objectives_desc',
      type: DataTypes.STRING
    },
    playingConditionsDesc:{
      field: 'playing_conditions_desc',
      type: DataTypes.STRING
    },
    playingConditionsDescWithoutTimer:{
      field: 'playing_conditions_desc_without_timer',
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    timestamps: true
  });
  storyline_intro.associate = function(models) {
    // associations can be defined here
  };
  return storyline_intro;
};