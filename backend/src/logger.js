const { createLogger, format, transports } = require("winston");
const WinstonCloudWatch = require("winston-cloudwatch");

const {
  LOG_LEVEL,
  IN_PRODUCTION,
  ENV_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} = require("@/config");

const logFormat = format.printf(({ level, message, timestamp }) => {
  return `[${process.pid}] ${timestamp} ${level}: ${message}`;
});

const loggerTransports = [
  new transports.Console({
    level: LOG_LEVEL,
    // colors don't play well with EB logs in production mode
    format: IN_PRODUCTION
      ? format.combine(format.timestamp(), logFormat)
      : format.combine(format.timestamp(), format.colorize({}), logFormat),
    handleExceptions: true,
    handleRejections: true,
  }),
];

if (IN_PRODUCTION) {
  loggerTransports.push(
    new WinstonCloudWatch({
      logGroupName: "wolf-api-server",
      logStreamName: ENV_NAME,
      awsAccessKeyId: AWS_ACCESS_KEY_ID,
      awsSecretKey: AWS_SECRET_ACCESS_KEY,
      awsRegion: "us-east-1",
      messageFormatter: ({ level, message }) =>
        `[${process.pid}:${level}] ${message}`,
      handleExceptions: true,
      handleRejections: true,
    })
  );
}

const logger = createLogger({ transports: loggerTransports });

module.exports = logger;
