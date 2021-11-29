const nodeloginwrapper = require('node-login-wrapper');
const loginConfig = require("@config/loginmodule");

module.exports = async function (ctx, next){
    let req = ctx.req;
    let res = ctx.res;

    await nodeloginwrapper.initialize(loginConfig);
    let continueUrl = 'https://' + ctx.headers['host'] + ctx.url;
    try{
       let response = await nodeloginwrapper.login(req,res,{
           needNoCache: false,
           continueUrl
       });
       if(response.type=='redirect'){
          ctx.redirect(response.url);
        return;
      }

      if(response.type=='proceedToNext'){
        ctx.loggedInUserObject = response.data;
       // ctx.nodeLoginWrapper = nodeloginwrapper;
      }

    }catch(err){
        // handle/format error received from nodeloginwrapper here and throw it global error handler
        throw err;
    }
    await next();
}
