const mongoose = require("mongoose");
const logger = require("@/logger");
const { DB_URI, DB_NAME, ENABLE_MONGOOSE_DEBUG_MODE } = require("@/config");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: DB_NAME,
};

mongoose.set("debug", ENABLE_MONGOOSE_DEBUG_MODE);

async function connect() {
  logger.info("[db] Connecting to database...");
  await mongoose.connect(DB_URI, options);
  logger.info("[db] Database connection established");
}

async function disconnect() {
  logger.info("[db] Disconnecting from database...");
  await mongoose.connection.close();
  logger.info("[db] Successfully disconnected from database");
}

module.exports = { connect, disconnect };
