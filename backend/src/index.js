require("module-alias/register");

require("env-smart").load();

const cluster = require("cluster");

const { PORT, SHOULD_CLUSTER, IS_EBS_WORKER } = require("@/config");

const logger = require("@/logger");

async function startWorker() {
  await require("@/database").connect();

  const app = require("./expressApp");

  const server = require("http").createServer(app);

  server.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
    if (IS_EBS_WORKER) {
      logger.info("[server] Running in EBS worker mode");
    }
  });
}

function startMaster() {
  logger.info(`Master process started`);

  const numCPUs = require("os").cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    logger.info(`[server] Worker ${worker.process.pid} died :rip-parrot:`);
    cluster.fork();
  });
}

if (SHOULD_CLUSTER && cluster.isMaster) {
  startMaster();
} else {
  startWorker();
}
