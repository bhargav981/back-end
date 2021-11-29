const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, prettyPrint } = format;
const level = process.env.LOG_LEVEL;
const maxSize = process.env.LOG_FILE_SIZE ? process.env.LOG_FILE_SIZE : "50m";
const maxFiles = process.env.LOG_MAX_FILE ? process.env.LOG_MAX_FILE : 10;

//custom level which can be modified according to project requirement
const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 4
  },
  colors: {
    error: "red",
    warn: "green",
    info: "yellow",
    debug: "blue"
  }
};

const logger = createLogger({
  level,
  levels: myCustomLevels.levels,
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss.SSS"
    }),
    prettyPrint()
  ),
  transports: [
    new transports.DailyRotateFile({
      filename: "logs/logFile.log",
      format: format.json(),
      auditFile: "logs/logInfo.json",
      maxSize,
      maxFiles
    }),
    new transports.File({
      filename: "logs/errorFile.log",
      level: "error",
      format: format.json()
    })
  ]
});

//
// If we're in development then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.COMMONDB_LOCAL == "true") {
  logger.add(new transports.Console());
}

module.exports = logger;
