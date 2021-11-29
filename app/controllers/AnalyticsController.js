var anlyticsWrapper = require ('analytics-data-collection-wrapper');
const report = require ('@agile/report/Report');
const user = require ('@utils/User');
const models = require('@models');
const userState = require("@repositories/UserState");
const _ = require("lodash");


class AnalyticsController {
  async sendData (ctx) {
    const streamName = process.env.ANALYTICS_STREAMNAME;
    const credentials = {
      accessKeyID: process.env.ANALYTICS_CREDENTIALS_KEY,
      secretAccessKey: process.env.ANALYTICS_CREDENTIALS_SECRET,
      version: process.env.ANALYTICS_CREDENTIALS_VERSION,
      region: process.env.ANALYTICS_CREDENTIALS_REGION,
    };
    const record = await this.formatData (ctx);
    // console.log("analytics_data = "+JSON.stringify(record));
    anlyticsWrapper.createStream (streamName, credentials);
    anlyticsWrapper.putRecord (record);
  }

  async formatData (ctx) {
    const uliId = await user.getUserId (ctx);
    let {loggedInUserObject} = ctx;

    const eventData = await report.getReportData (ctx, uliId);
    const {userDetails} = eventData;
    const {groupId, email} = userDetails;

    let data = {
      productUserID:uliId,
      productGrpID: groupId,
      commonDBGroupID: groupId,
      emailID: email,
      eventData,
      eventName: 'USER_REPORT_DATA',
      eventSchemaVersion: process.env.ANALYTICS_EVENTSCHEMAVERSION,
      productModelVersion: process.env.ANALYTICS_PRODCTMODELVERSION,
      productServiceName: process.env.COMMONDB_SERVICE_NAME,
      productVariant: process.env.ANALYTICS_PRODUCTVARIANT,
      productVersion: process.env.ANALYTICS_PRODUCTVERSION,
      timestamp: Date.now (),
      userID: loggedInUserObject.userID,
      userLicenseID: loggedInUserObject.userLicenseID,
    };

    

    return data;
  }

   async sendDataForOldUsers (ctx) {
      // console.log('here');
        await this.syncData(ctx);
  }

  async syncData(ctx){
    const {grpId} = ctx.request.body;
    const users = await models.users.findAll({
      where:{
        groupId: grpId
      },
      raw: true
    });

    const userIds = _.map(users, "uliId");
    // console.log("userIds");
    // console.log(userIds.toString());
    let userData = await userState.getAllUsersStateDetails(userIds);
    // userData = _.filter(userData, Boolean);
    const streamName = process.env.ANALYTICS_STREAMNAME;
    const credentials = {
      accessKeyID: process.env.ANALYTICS_CREDENTIALS_KEY,
      secretAccessKey: process.env.ANALYTICS_CREDENTIALS_SECRET,
      version: process.env.ANALYTICS_CREDENTIALS_VERSION,
      region: process.env.ANALYTICS_CREDENTIALS_REGION,
    };
    console.log("length of userData = %d", userData.length);

    const promises = [];
    anlyticsWrapper.createStream (streamName, credentials);
    userData.forEach(async user => {
       promises.push(this.sendDataSingle(user, users, streamName, credentials, ctx));
    });

    Promise.all(promises)
    .then((results) => {
      console.log("All users synced", results);
    })
    .catch((e) => {
        console.log(e)
    });
    ctx.body = {
      success: true
    }
    
  }

  async sendDataSingle(user, users, streamName, credentials, ctx){
    const thisUser = users.find(u => u.uliId === user.uliId);
        let eventData = await report.getReportData (ctx, thisUser.uliId);   
        let data = {
            productUserID:thisUser.uliId,
            productGrpID: thisUser.groupId,
            commonDBGroupID: thisUser.groupId,
            emailID: thisUser.emailID,
            eventData,
            eventName: 'USER_REPORT_DATA',
            eventSchemaVersion: process.env.ANALYTICS_EVENTSCHEMAVERSION,
            productModelVersion: process.env.ANALYTICS_PRODCTMODELVERSION,
            productServiceName: process.env.COMMONDB_SERVICE_NAME,
            productVariant: process.env.ANALYTICS_PRODUCTVARIANT,
            productVersion: process.env.ANALYTICS_PRODUCTVERSION,
            timestamp: Date.now (),
            userID: thisUser.uliId,
            userLicenseID: user.uliId
          }; 
          anlyticsWrapper.putRecord (data);
  }

  pushDataToJob(){
    const data = {
      "url":"http://konsole.site1.com/test-job-service-url",
      "method":"GET",
      "queryParams":{
          "continueUrl":"http://konsole.site1.com/",
          "message":"hello world"
      },
      "header":{
          "emailId":"dharmik.jampala@knolksape.com"
      },
      "payload":{
          "userId":5,
          "groupId":231,
          "uliId":422
      }
    }
  }
}

module.exports = new AnalyticsController ();
