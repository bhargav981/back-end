const nodeloginwrapper = require('node-login-wrapper');
const loginConfig = require("@config/loginmodule"); // here above created config file should be imported
module.exports = async function (ctx, next){
    await nodeloginwrapper.initialize(loginConfig);
    try{
       let response = await nodeloginwrapper.apiLogin(ctx.req,ctx.res);
       if(response.type=='proceedToNext'){
        ctx.loggedInUserObject = response.data;
       // ctx.nodeLoginWrapper = nodeloginwrapper;
      }
    }catch(err){
        // handle/format error received from nodeloginwrapper here or throw it global error handler
        throw err;
    }
    await next();
}
