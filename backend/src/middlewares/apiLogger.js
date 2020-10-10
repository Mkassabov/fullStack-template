const logger = require("@/logger");

function generateRequestId() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return Array(8)
    .fill(null)
    .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
    .join("");
}

const apiLogger = (req, res, next) => {
  const reqId = generateRequestId();
  const startTime = Date.now();

  logger.info(`[req ${reqId}] ${req.method} ${req.url}`);

  req.id = reqId;

  res.on("finish", () => {
    logger.info(
      `[req ${reqId}] Completed with status ${res.statusCode} in ${
        Date.now() - startTime
      }ms`
    );
  });

  next();
};

module.exports = apiLogger;
