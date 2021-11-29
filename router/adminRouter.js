const Router = require("koa-router");
const router = new Router();

const StringsController = require("@controllers/StringsController")
const syncLabelsErrorHandler = require("@errorHandlers/get/syncLabelsErrorHandler");
const AnalyticsController = require("@controllers/AnalyticsController");
const AdminController = require("@controllers/AdminController");


router.get("/agile-sync-lables", syncLabelsErrorHandler, (ctx, next) => {
    return StringsController.syncContentFromSheetToDb(ctx);
});

router.post("/send-data-for-old-users", (ctx, next) => {
    return AnalyticsController.sendDataForOldUsers(ctx);
});

router.get("/save-comp-values",(ctx, next)=>{
    return AdminController.saveCompetencyValuesForUsers(ctx);
});


module.exports = {
    router
};
