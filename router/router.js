const Router = require("koa-router");
const router = new Router();
const HealthController = require("@controllers/HealthController");

router.get("/health", (ctx, next) => {
  return HealthController.checkHealth(ctx);
});

module.exports = {
  router
};
