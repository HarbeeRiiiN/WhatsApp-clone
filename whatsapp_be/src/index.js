import app from "./app.js";
import dotenv from "dotenv";
import logger from "./configs/logger.config.js";

// dotEnv config
dotenv.config();

// dot variables
const PORT = process.env.PORT || 8081;
console.log(process.env.NODE_ENV);

app.listen(PORT, () => {
  logger.info(`serer is listening at ${PORT}...`);
});
