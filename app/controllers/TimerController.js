const User = require('@utils/User');
const userState = require("@agile/userState/UserState");


class TimerController {
  async saveTimer(ctx) {
    const response = await userState.updateTimerValue(ctx);
    ctx.body = response;
  }
}

module.exports = new TimerController();