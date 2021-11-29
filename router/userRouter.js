const Router = require("koa-router");
const router = new Router();

const cmnDBApi = require("@middlewares/cmnDBApi");
const userCreator = require("@middlewares/userCreate");

const UserController = require("@controllers/UserController");
const StringsController = require("@controllers/StringsController");
const GameController = require("@controllers/GameController");
const ActionController = require("@controllers/ActionController");
const ReportController = require("@controllers/ReportController")
const LeaderBoardController = require("@controllers/LeaderBoardController")
const TimerController = require("@controllers/TimerController")


const EventsManager = require("@agile/metrics/MetricsManager");
const SentryUserContext = require("@middlewares/SentryUserContext");
const SprintController = require("@controllers/SprintController");
const BlockersManager = require("@agile/blockers/BlockersManager");
const loggerPre = require("@middlewares/loggingHandlerPreRoute");
const loggerPost = require("@middlewares/loggingHandlerPostRoute");
// router.use(loggerPre);
// router.use(loggerPost);

router.use(cmnDBApi);
router.use(userCreator);
router.use(SentryUserContext);

router.get("/user", (ctx, next) => {
    return UserController.getUser(ctx);
});

router.get("/labels", (ctx, next) => {
    return StringsController.getLabels(ctx);
});

router.get("/game", (ctx, next) => {
    return GameController.getGameData(ctx);
});

router.post("/choose-prd", (ctx, next) => {
    return GameController.saveSelectedPrd(ctx);
});

router.put("/update-phase", (ctx, next) => {
    return UserController.updatePhaseId(ctx);
});

router.get("/events", (ctx, next) => {
    return EventsManager.getActionMetricsImpact(ctx);
});
router.get("/blockers", (ctx, next) => {
    return BlockersManager.getBlockers(ctx);
});

router.get("/actions", (ctx, next) => {
    return EventsManager.getActionMetricsImpact(ctx);
});


router.post("/save-action", (ctx, next) => {
    return ActionController.getActions(ctx);
});

router.post("/take-user-feedback-survey", (ctx, next) => {
    return ActionController.takeUserFeedbackSurveys(ctx);
});

router.post("/take-user-feedback-interviews", (ctx, next) => {
    return ActionController.takeUserFeedbackInterviews(ctx);
});

router.post("/take-market-pulse-survey", (ctx, next) => {
    return ActionController.takeMarketPulseSurvey(ctx);
});

router.post("/replan-prod-cycle", (ctx, next) => {
    return ActionController.replanProductionCycle(ctx);
});

router.post("/meet-the-team", (ctx, next) => {
    return ActionController.meetTheTeam(ctx);
});

router.post("/align-the-team", (ctx, next) => {
    return ActionController.alignTheTeam(ctx);
});

router.post("/team-huddle", (ctx, next) => {
    return ActionController.teamHuddle(ctx);
});

router.post("/retrospect", (ctx, next) => {
    return ActionController.retrospect(ctx);
});

router.post("/team-lunch", (ctx, next) => {
    return ActionController.teamLunch(ctx);
});

router.post("/team-morale-survey", (ctx, next) => {
    return ActionController.teamMoraleSurvey(ctx);
});

router.post("/train-the-team-workshop", (ctx, next) => {
    return ActionController.trainTheTeamInWorkshop(ctx);
});

router.post("/train-the-team-technical", (ctx, next) => {
    return ActionController.trainTheTeamInTechnical(ctx);
});

router.post("/train-the-team-collaboration", (ctx, next) => {
    return ActionController.trainTheTeamInCollaboration(ctx);
});

router.post("/update-prd", (ctx, next) => {
    return ActionController.updatePrd(ctx);
});

router.post("/get-customer-feedback", (ctx,next) =>{
    return ActionController.getCustomerFeedback(ctx);
});

router.post("/email-team", (ctx,next) =>{
    return ActionController.emailTeam(ctx);
});

router.post("/team-outing", (ctx,next) =>{
    return ActionController.teamOuting(ctx);
});

router.post("/use-prev-user-data", (ctx,next) =>{
    return ActionController.usePrevUserData(ctx);
});

router.post("/virtual-meet", (ctx,next) =>{
    return ActionController.virtualMeet(ctx);
});

router.post("/detailed", (ctx,next) =>{
    return ActionController.detailed(ctx);
});

router.post("/just-actionable", (ctx,next) =>{
    return ActionController.justActionable(ctx);
});

router.post("/team-driven", (ctx,next) =>{
    return ActionController.teamDriven(ctx);
});

router.post("/you-lead-it", (ctx,next) =>{
    return ActionController.youleadIt(ctx);
});

router.post("/check-backlog", (ctx,next) =>{
    return ActionController.checkBacklog(ctx);
});

router.post("/fix-now", (ctx,next) =>{
    return ActionController.fixNow(ctx);
});

router.post("/fix-later", (ctx,next) =>{
    return ActionController.fixLater(ctx);
});

router.post("/agile-consultant-workshop", (ctx,next) =>{
    return ActionController.agileConsultantTalk(ctx);
});

router.post("/agile-consultant-talk", (ctx,next) =>{
    return ActionController.agileConsultantWorkshop(ctx);
});

router.post("/check-team-activity", (ctx,next) =>{
    return ActionController.checkTeamActivity(ctx);
});

router.post("/check-product-updates", (ctx,next) =>{
    return ActionController.checkProductUpdates(ctx);
});

// SPRINT API ENDPOINTS

router.post("/start-sprint", (ctx, next) => {
    return SprintController.startSprint(ctx);
});

router.post("/add-stories-to-sprint", (ctx, next) => {
    return SprintController.addSprintStories(ctx);
});

router.post("/set-priority-for-stories", (ctx, next) => {
    return SprintController.addPriorityForTasks(ctx);
});

router.post("/end-sprint", (ctx, next) => {
    return SprintController.endSprint(ctx);
});

router.post("/replan-sprint", (ctx, next) => {
    return ActionController.replanSprint(ctx);
});

router.post("/rebuild-feature", (ctx, next) => {
    return ActionController.rebuildFeature(ctx);
});

router.post("/meet-tech-team", (ctx, next) => {
    return ActionController.meetTechTeam(ctx);
});

router.post("/meet-design-team", (ctx, next) => {
    return ActionController.meetDesignTeam(ctx);
});

router.post("/meet-project-manager", (ctx, next) => {
    return ActionController.meetProjectManager(ctx);
});

router.post("/make-relevant-update", (ctx, next) => {
    return ActionController.makeRelevantUpdateToPrd(ctx);
});

router.post("/take-market-pulse-survey-old", (ctx, next) => {
    return ActionController.takeMarketPulseSurveyOld(ctx);
});

router.post("/team-morale-survey-interview", (ctx, next) => {
    return ActionController.teamMoraleSurveyInterview(ctx);
});

router.get("/report-data", (ctx, next) => {
    return ReportController.getReportData(ctx);
});


// REPORT API

router.get("/user-report", (ctx, next) => {
    return ReportController.getUserReportHtml(ctx);
});

router.get("/user-report-pdf", (ctx, next) => {
    return ReportController.getUserReportPdf(ctx);
});

router.post("/mail-report-pdf", (ctx, next) => {
    return ReportController.sendUserReportMail(ctx);
});

router.get("/leaderboard", (ctx, next) => {
    return LeaderBoardController.get(ctx);
});

router.post("/save-user-timer", (ctx, next) => {
    return TimerController.saveTimer(ctx);
});


module.exports = {
    router
};
