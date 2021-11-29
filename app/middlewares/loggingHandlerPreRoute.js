const logger = require("@utils/Winston");

module.exports = async function(ctx, next) {
  let { req } = ctx;
  req.requestId = ctx.state.id;
  const url = req.url;
  logger.info({
    requestID: req.requestId,
    client: req.headers.origin,
    userAgent: req.headers["user-agent"],
    url,
    memory:{
            rss: Math.round((process.memoryUsage().rss / 1024 / 1024) * 100) / 100 + 'MB',
            heapTotal: Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100 + 'MB',
            heapUsed: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100 + 'MB',
            external: Math.round((process.memoryUsage().external / 1024 / 1024) * 100) / 100 + 'MB'
    }
  });
  await next();
};
