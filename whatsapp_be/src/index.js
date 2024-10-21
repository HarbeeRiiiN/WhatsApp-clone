import dotenv from "dotenv";
import app from "./app.js";
import logger from "./configs/logger.config.js";
import mongoose from "mongoose";

// dotEnv config
dotenv.config();

// dot variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8081;

// exit on mongodb error
mongoose.connection.on("error", (error) => {
  logger.error(`Mongodb connection error : ${error}`);
  process.exit(1);
});

// mongodb debug mode
if (process.env.NODE_ENV === "debug") {
  mongoose.set("debug", true);
}

// mongodb connection
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to Mongodb.");
  });

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
