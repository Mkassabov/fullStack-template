const logger = require("@/logger");
const { IN_PRODUCTION, ENV_NAME } = require("@/config");

function errorHandler(err, req, res, next) {
  logger.error(
    `[req ${req.id}] An unexpected error occurred while handling request`
  );
  logger.error(err.stack);
  res.serverError();
}

module.exports = errorHandler;
