const nodeLoginWrapper = require("node-login-wrapper");

class LoginController {
  async login(ctx) {
    try {
      await nodeLoginWrapper.started(ctx.req, ctx.res);
      ctx.redirect(`${process.env.APP_URL}`);
    } catch (error) {
      console.log(error);
      ctx.body = error;
    }
  }

  async logout(ctx) {
    let response = await nodeLoginWrapper.logout(ctx.req,ctx.res);
    if(response.type=='redirect'){
      ctx.redirect(response.url);
      return;
    }
  }
}

module.exports = new LoginController();
