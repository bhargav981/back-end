"use strict";
require("module-alias/register");

const koa = require("koa");
// const nr = require('newrelic');
const cors = require("@koa/cors");
const result = require("dotenv").config();
const requestId = require('koa-requestid');
const nr = require('newrelic');

//For report
const render = require("koa-ejs");
const path = require("path");
const serve = require("koa-static");

const router = require("@router/router");
const webRouter = require("@router/webRouter");
const UserRouter = require("@router/userRouter");
const cmndbRouter = require("@router/cmndbRouter");
const adminRoutes = require("@router/adminRouter");

let bodyParser = require("koa-bodyparser");
const PrettyError = require("pretty-error");

const Sentry = require("@sentry/node");

if (result.error) {
  throw result.error;
}

const app = new koa();

const errorMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err, "err");
    Sentry.withScope(function (scope) {
      scope.addEventProcessor(function (event) {
        return Sentry.Handlers.parseRequest(event, ctx.request);
      });
      Sentry.captureException(err);
    });
    ctx.status = err.status || 500;
    ctx.body = {
      status: ctx.status,
      message: err.message
    };
    ctx.app.emit("error", err, ctx);
  }
};


// Sentry.init({ 
//  release: process.env.SENTRY_RELEASE,
//  environment: process.env.SENTRY_ENVIRONMENT,
//  dsn: process.env.SENTRY_DSN,
//  tracesSampleRate: 1.0 
// });

const requestHandler = (ctx, next) => {
  return new Promise((resolve, _) => {
    const local = domain.create();
    local.add(ctx);
    local.on("error", (err) => {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit("error", err, ctx);
    });
    local.run(async () => {
      Sentry.getCurrentHub().configureScope((scope) =>
        scope.addEventProcessor((event) =>
          Sentry.Handlers.parseRequest(event, ctx.request, { user: false })
        )
      );
      await next();
      resolve();
    });
  });
};

// this tracing middleware creates a transaction per request
const tracingMiddleWare = async (ctx, next) => {
  // captures span of upstream app
  const sentryTraceId = ctx.request.get("sentry-trace");
  let traceId;
  let parentSpanId;
  let sampled;
  if (sentryTraceId) {
    const span = Span.fromTraceparent(sentryTraceId);
    if (span) {
      traceId = span.traceId;
      parentSpanId = span.parentSpanId;
      sampled = span.sampled;
    }
  }
  const transaction = Sentry.startTransaction({
    name: `${ctx.method} ${ctx.url}`,
    op: "http.server",
    parentSpanId,
    traceId,
    sampled,
  });
  ctx.__sentry_transaction = transaction;
  await next();

  // if using koa router, a nicer way to capture transaction using the matched route
  if (ctx._matchedRoute) {
    const mountPath = ctx.mountPath || "";
    transaction.setName(`${ctx.method} ${mountPath}${ctx._matchedRoute}`);
  }
  transaction.setHttpStatus(ctx.status);
  transaction.finish();
};

// app.use(requestHandler);


//PrettyError is a small tool to see node.js errors with less clutter in console
const pe = new PrettyError();
pe.start();
app.on("error", function (err) {
  console.log(pe.render(err));
});

app.on("error", (err, ctx) => {
  console.log(pe.render(err));
});

//setup ejs for report
render(app, {
  root: path.join(__dirname, "resources/views"),
  layout: false,
  viewExt: "html",
  cache: false,
  debug: true
});
// app.use(tracingMiddleWare);

app
  .use(requestId())
  .use(tracingMiddleWare)
  .use(errorMiddleware)
  .use(bodyParser())
  .use(
    cors({
      credentials: true
    })
  )
  .use(router.router.routes())
  .use(webRouter.router.routes())
  .use(UserRouter.router.routes())
  .use(adminRoutes.router.routes())
  .use(cmndbRouter.router.routes())
  .use(serve("resources"));


const server = app.listen(3000, () => console.log("running on port 3031"));
server.keepAliveTimeout = 0;

app.on("error", err => {
  Sentry.captureException(err);
});

module.exports = app;
