const User = require('@utils/User');
const actions = require('@agile/actions/Actions');
const takeUserSurvey = require('@agile/actions/TakeUserSurvey');
const takeUserInterviews = require('@agile/actions/TakeUserInterviews');
const takeMarketPulseSurvey = require('@agile/actions/TakeMarketPulseSurvey');
const takeMarketPulseSurveyOld = require('@agile/actions/TakeMarketPulseSurveyOld');

const meetTheTeam = require('@agile/actions/MeetTheTeam');
const alignTheTeam = require('@agile/actions/AlignTheTeam');
const retrospect = require('@agile/actions/Retrospect');
const teamHuddle = require('@agile/actions/TeamHuddle');
const teamLunch = require('@agile/actions/TeamLunch');
const teamMoraleSurvey = require('@agile/actions/TeamMoraleSurvey');
const teamMoraleSurveyInterview = require('@agile/actions/TeamMoraleSurveyInterview');

const trainTheTeamInWorkshop = require('@agile/actions/TrainTheTeamInWorkshop');
const trainTheTeamInTechnical = require('@agile/actions/TrainTheTeamInTechnical');
const trainTheTeamInCollaboration = require('@agile/actions/TrainTheTeamInCollaboration');
const updatePrd = require('@agile/actions/UpdatePrd');
const meetDesignTeam = require("@agile/actions/MeetDesignTeam");
const meetTechTeam = require("@agile/actions/MeetTechTeam");
const meetProjectManager = require("@agile/actions/MeetProjectManager");
const rebuildFeature = require("@agile/actions/RebuildFeature");
const makeRelevantUpdate = require("@agile/actions/RelevantPrdUpdate");
const replanSprint = require("@agile/actions/ReplanSprint");
const teamOuting = require("@agile/actions/TeamOuting");
const emailTeam = require("@agile/actions/EmailTeam");
const getCustomerFeedback = require("@agile/actions/GetCustomerFeedback");


const usePrevUserData = require("@agile/actions/UsePrevUserData");
const virtualMeet = require("@agile/actions/VirtualMeet");
const detailed = require("@agile/actions/Detailed");
const justActionable = require("@agile/actions/JustActionable");
const teamDriven = require("@agile/actions/TeamDriven");
const youleadIt = require("@agile/actions/YouLeadIt");
const checkBacklog = require("@agile/actions/CheckBacklog");
const fixNow = require("@agile/actions/FixNow");
const fixLater = require("@agile/actions/FixLater");

const agileConsultantWorkshop = require("@agile/actions/AgileConsultantWorkshop");
const agileConsultantTalk =  require("@agile/actions/AgileConsultantTalk");

const checkTeamActivity =  require("@agile/actions/CheckTeamActivity");
const checkProductUpdates =  require("@agile/actions/CheckProductUpdates");


class ActionController {
  async getActions(ctx) {
    const data = await actions.getResponse(ctx);
    ctx.body = data;
  }

  async takeUserFeedbackSurveys(ctx) {
    const data = await takeUserSurvey.getResponse(ctx);
    ctx.body = data;
  }

  async takeUserFeedbackInterviews(ctx) {
    const data = await takeUserInterviews.getResponse(ctx);
    ctx.body = data;
  }

  async takeMarketPulseSurvey(ctx) {
    const data = await takeMarketPulseSurvey.getResponse(ctx);
    ctx.body = data;
  }

  async takeMarketPulseSurveyOld(ctx) {
    const data = await takeMarketPulseSurveyOld.getResponse(ctx);
    ctx.body = data;
  }

  async meetTheTeam(ctx) {
    const data = await meetTheTeam.getResponse(ctx);
    ctx.body = data;
  }

  async alignTheTeam(ctx) {
    const data = await alignTheTeam.getResponse(ctx);
    ctx.body = data;
  }

  async retrospect(ctx) {
    const data = await retrospect.getResponse(ctx);
    ctx.body = data;
  }

  async teamHuddle(ctx) {
    const data = await teamHuddle.getResponse(ctx);
    ctx.body = data;
  }

  async teamLunch(ctx) {
    const data = await teamLunch.getResponse(ctx);
    ctx.body = data;
  }

  async teamMoraleSurvey(ctx) {
    const data = await teamMoraleSurvey.getResponse(ctx);
    ctx.body = data;
  }

  async teamMoraleSurveyInterview(ctx) {
    const data = await teamMoraleSurveyInterview.getResponse(ctx);
    ctx.body = data;
  }

  async trainTheTeamInWorkshop(ctx) {
    const data = await trainTheTeamInWorkshop.getResponse(ctx);
    ctx.body = data;
  }

  async trainTheTeamInTechnical(ctx) {
    const data = await trainTheTeamInTechnical.getResponse(ctx);
    ctx.body = data;
  }

  async trainTheTeamInCollaboration(ctx) {
    const data = await trainTheTeamInCollaboration.getResponse(ctx);
    ctx.body = data;
  }

  async updatePrd(ctx) {
    const data = await updatePrd.getResponse(ctx);
    ctx.body = data;
  }

  async meetDesignTeam(ctx) {
    const data = await meetDesignTeam.getResponse(ctx);
    ctx.body = data;
  }

  async meetTechTeam(ctx) {
    const data = await meetTechTeam.getResponse(ctx);
    ctx.body = data;
  }

  async meetProjectManager(ctx) {
    const data = await meetProjectManager.getResponse(ctx);
    ctx.body = data;
  }

  async rebuildFeature(ctx) {
    const data = await rebuildFeature.getResponse(ctx);
    ctx.body = data;
  }

  async makeRelevantUpdateToPrd(ctx) {
    const data = await makeRelevantUpdate.getResponse(ctx);
    ctx.body = data;
  }

  async replanProductionCycle(ctx){
    const data = await replanSprint.getResponse(ctx);
    ctx.body = data;
  }

  async teamOuting(ctx){
    const data = await teamOuting.getResponse(ctx);
    ctx.body = data;
  }

  async emailTeam(ctx){
    const data = await emailTeam.getResponse(ctx);
    ctx.body = data;
  }

  async getCustomerFeedback(ctx){
    const data = await getCustomerFeedback.getResponse(ctx);
    ctx.body = data;
  }

  async fixLater(ctx){
    const data = await fixLater.getResponse(ctx);
    ctx.body = data;
  }
  
  async fixNow(ctx){
    const data = await fixNow.getResponse(ctx);
    ctx.body = data;
  }
  
  async checkBacklog(ctx){
    const data = await checkBacklog.getResponse(ctx);
    ctx.body = data;
  }
  
  async youleadIt(ctx){
    const data = await youleadIt.getResponse(ctx);
    ctx.body = data;
  }
  
  async teamDriven(ctx){
    const data = await teamDriven.getResponse(ctx);
    ctx.body = data;
  }
  
  
  async justActionable(ctx){
    const data = await justActionable.getResponse(ctx);
    ctx.body = data;
  }
  
  
  async detailed(ctx){
    const data = await detailed.getResponse(ctx);
    ctx.body = data;
  }
  
  async virtualMeet(ctx){
    const data = await virtualMeet.getResponse(ctx);
    ctx.body = data;
  }
  
  async usePrevUserData(ctx){
    const data = await usePrevUserData.getResponse(ctx);
    ctx.body = data;
  }

  async agileConsultantWorkshop(ctx){
    const data = await agileConsultantWorkshop.getResponse(ctx);
    ctx.body = data;
  }

  async agileConsultantTalk(ctx){
    const data = await agileConsultantTalk.getResponse(ctx);
    ctx.body = data;
  } 

  async checkTeamActivity(ctx){
    const data = await checkTeamActivity.getResponse(ctx);
    ctx.body = data;
  } 

  async checkProductUpdates(ctx){
    const data = await checkProductUpdates.getResponse(ctx);
    ctx.body = data;
  } 
  

}

module.exports = new ActionController();
