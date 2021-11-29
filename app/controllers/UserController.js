const User = require('@utils/User');
const userState = require("@agile/userState/UserState");


class UserController {
  async getUser(ctx) {
    const user = await User.getUser(ctx);
    ctx.body = user;
  }

  async updatePhaseId(ctx) {
    const data = await userState.updatePhaseId(ctx);
    ctx.body = data;
  }
}

module.exports = new UserController();