import app from "./app.js";
import dotenv from "dotenv";
import logger from "./configs/logger.config.js";

// dotEnv config
dotenv.config();

// dot variables
const PORT = process.env.PORT || 8081;
console.log(process.env.NODE_ENV);

let server;
server = app.listen(PORT, () => {
  logger.info(`serer is listening at ${PORT}...`);
  console.log("process id = ", process.pid);
  // throw new Error("error");
});

// handle server errors

const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (err) => {
  logger.error(err);
  // process.exit(1);
  exitHandler(err);
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  }
});
