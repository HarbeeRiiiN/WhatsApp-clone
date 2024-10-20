import express from "express";

// create app
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World...");
});

export default app;
