import app from "./app.js";
import dotenv from "dotenv";

// dotEnv config
dotenv.config();

// dot variables
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`serer is listening at ${PORT}...`);
});
