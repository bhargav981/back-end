const logger = require("@utils/Winston");

module.exports = async function(ctx, next) {
  await next();
  let { req, res } = ctx;
  const url = req.url;
  const cleanup = () => {
    res.removeListener("finish", logFn);
    res.removeListener("close", abortFn);
    res.removeListener("error", errorFn);
  };

  const logFn = () => {
    cleanup();
    logger.info({
      requestID: req.requestId,
      url,
      response: `${res.statusCode} ${res.statusMessage}`,
      memory:{
        rss: Math.round((process.memoryUsage().rss / 1024 / 1024) * 100) / 100 + 'MB',
        heapTotal: Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100 + 'MB',
        heapUsed: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100 + 'MB',
        external: Math.round((process.memoryUsage().external / 1024 / 1024) * 100) / 100 + 'MB'
}
    });
  };

  const abortFn = () => {
    cleanup();
    logger.warn({
      requestID: req.requestId,
      url,
      response: "Request aborted by the client"
    });
  };

  const errorFn = err => {
    cleanup();
    logger.warn({
      requestID: req.requestId,
      url,
      response: `Request pipeline error: ${err}`
    });
  };

  res.on("finish", logFn); // successful pipeline (regardless of its ctx.response)
  res.on("close", abortFn); // aborted pipeline
  res.on("error", errorFn); // pipeline internal error
  ctx.set('Connection','close');
};
