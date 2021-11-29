const Router = require("koa-router");
const router = new Router();

const CommonDBController = require("@app/controllers/CommonDBController");
const ReportController = require("@controllers/ReportController")

const loggerPre = require("@middlewares/loggingHandlerPreRoute");
const loggerPost = require("@middlewares/loggingHandlerPostRoute");
router.use(loggerPre);
router.use(loggerPost);

router.get("/cmndb/storyline", (ctx, next) => {
  return CommonDBController.getStorylineById(ctx);
});

router.get("/cmndb/status/user/:uliId", (ctx, next) => {
  return CommonDBController.getUserStatus(ctx);
});

router.get("/cmndb/status/user", (ctx, next) => {
  return CommonDBController.getUserStatusForUliIds(ctx);
});

router.get("/cmndb/status/group", (ctx, next) => {
  return CommonDBController.getGroupUserStatusByGoupIdsArray(ctx);
});

router.get("/cmndb/status/group/:groupId", (ctx, next) => {
  return CommonDBController.getGroupUserStatusByGroupId(ctx);
});

router.get("/cmndb/metrics", (ctx, next) => {
  return CommonDBController.getMetrics(ctx);
});

router.get("/cmndb/metrics/user/:uliId", (ctx, next) => {
  return CommonDBController.getUserMetrics(ctx);
});

router.get("/cmndb/metrics/group/:grpId", (ctx, next) => {
  return CommonDBController.getGroupMetrics(ctx);
});

router.get("/cmndb/report/group/:grpId", (ctx, next) => {
  return CommonDBController.getGroupUsersReport(ctx);
});

router.get("/cmndb/report/user/:uliId", (ctx, next) => {
  return CommonDBController.getUserReport(ctx);
});

router.get("/cmndb/report/user", (ctx, next) => {
  return CommonDBController.getUsersReport(ctx);
});

router.get ('/cmndb/storylines', (ctx, next) => {
  return CommonDBController.getStorylines (ctx);
});

router.delete ('/cmndb/user-license', (ctx, next) => {
  return CommonDBController.softDeleteUsers (ctx);
});

router.get("/cmndb/report/group/:grpId/aggregate", (ctx, next) => {
  return CommonDBController.getGroupAggregateReport(ctx);
});

router.get("/report/group/html/:grpId", (ctx, next) => {
  return CommonDBController.getGroupReportHtml(ctx);
});

router.post("/update-mean-sd", (ctx, next) => {
  return CommonDBController.getMean(ctx);
});



//for batch report download
router.get("/report/batch/pdf", (ctx, next) => {
  return ReportController.getBatchReportPdf(ctx);
});

//script
router.get("/script", (ctx, next) => {
  return ReportController.executeScipt(ctx);
});

module.exports = {
  router
};
