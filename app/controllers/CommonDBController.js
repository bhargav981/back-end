const models = require ('@models');

const metrics = require ('@agile/cmndb/AllMetrics');
const userMetrics = require ('@agile/cmndb/UserMetrics');
const status = require ('@agile/cmndb/UserStatus');
const report = require ('@agile/cmndb/UserReports');
const groupReport = require ('@agile/cmndb/GroupReports');
const storyline = require("@agile/cmndb/Storylines");
const user = require ('@utils/User');

class CommonDBController {
  async getGroupUsersReport (ctx) {
    const response = await report.getGroupUsersReport (ctx);
    ctx.body = response;
  }

  async getUserReport (ctx) {
    const response = await report.getUserReport (ctx);
    ctx.body = response;
  }

  async getUsersReport (ctx) {
    const response = await report.getUsersReport (ctx);
    ctx.body = response;
  }

  async getUserStatus (ctx) {
    const response = await status.getUserStatus (ctx);
    ctx.body = response;
  }

  async getUserStatusForUliIds (ctx) {
    const response = await status.getUserStatusForUliIds (ctx);
    ctx.body = response;
  }

  async getGroupUserStatusByGroupId (ctx) {
    const response = await status.getGroupUserStatusByGroupId (ctx);
    ctx.body = response;
  }

  async getGroupUserStatusByGoupIdsArray (ctx) {
    const response = await status.getGroupUserStatusByGoupIdsArray (ctx);
    ctx.body = response;
  }

  async getMetrics (ctx) {
    const response = await metrics.getMetrics (ctx);
    ctx.body = response;
  }

  async getUserMetrics (ctx) {
    const response = await userMetrics.getUserMetrics (ctx);
    ctx.body = response;
  }


  async getGroupMetrics (ctx) {
    // console.log("hh")
    const response = await userMetrics.getGroupMetrics (ctx);
    ctx.body = response;
  }

  async getStorylines (ctx) {
    const data = await storyline.getStorylines (ctx);
    ctx.body = data;
  }

  async getStorylineById (ctx) {
    const data = await storyline.getStorylineById(ctx);
    ctx.body = data;
  }

  async softDeleteUsers(ctx){
    const { uliIds } = ctx.query;
    ctx.body = await user.softDeleteUsers(uliIds);
  }

  async getGroupAggregateReport (ctx) {
    const response = await groupReport.getGroupAggregateReportData (ctx);
    ctx.body = response;
  }

  async getGroupReportHtml(ctx){
    const response = await groupReport.returnHtmlView (ctx);
    ctx.body = response;
  }

  async getAdditionalParams () {
    
  }

  async getMean(ctx){
    const response = await groupReport.mean (ctx);
    ctx.body = response;
  }
}

module.exports = new CommonDBController ();
