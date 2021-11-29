const models = require ('@models');
const report = require('@agile/report/Report');
const _ = require("lodash");
const userState = require("@repositories/UserState");


class AdminController {
    async saveCompetencyValuesForUsers(ctx){
        const grpIds = ctx.query.grpIds.split (',').map (Number);

        let users = await models.users.findAll({
            where:{
                groupId: {$in : grpIds}
            },
            raw: true
        });

        let userIds = _.map(users, "uliId");

        let userData = await userState.getAllUsersStateDetails(userIds);
        userData.filter((eachUser)=> eachUser.isGameCompleted == true);

        userIds = _.map(users, "uliId");

        console.log(userIds);

        const reports = userIds.forEach(async uliId => {
           await report.getReportData(ctx, uliId);
        });

        console.log(reports);
        await Promise.all(reports);
        
        ctx.body={
            success: true
        };
    }
}

module.exports = new AdminController ();
