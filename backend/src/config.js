module.exports = {
  PORT: process.env.PORT,

  SHOULD_CLUSTER: process.env.SHOULD_CLUSTER,

  IS_EBS_WORKER: process.env.IS_EBS_WORKER,

  ENABLE_MONGOOSE_DEBUG_MODE: process.env.ENABLE_MONGOOSE_DEBUG_MODE,

  DB_URI: process.env.DB_URI || process.env.MONGO_URL,
  DB_NAME: process.env.DB_NAME,
};
