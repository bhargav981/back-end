const Router = require("koa-router");
const router = new Router();

const cmnDB = require("@middlewares/cmnDB");
const userCreator = require("@middlewares/userCreate");

const LoginController = require("@controllers/LoginController");
const GameController = require("@controllers/GameController");

const SentryUserContext = require("@middlewares/SentryUserContext");
// router.use(loggerPre);
// router.use(loggerPost);

router.use(cmnDB);
router.use(userCreator);
router.use(SentryUserContext);

router.get("/login", (ctx, next) => {
    return LoginController.login(ctx);
});

router.post("/game-started", (ctx, next) => {
    return GameController.gameStarted(ctx);
});


router.post("/game-completed", (ctx, next) => {
    return GameController.gameCompleted(ctx);
});

router.get("/logout", (ctx, next) => {
    return LoginController.logout(ctx);
});


module.exports = {
    router
};
