import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes/index.js";

// create app
const app = express();
// middleware
// cors
app.use(cors());
// morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan());
}

// helmet
app.use(helmet());

// parse json request url
app.use(express.urlencoded({ extended: true }));

// enable cookie parser
app.use(cookieParser());

// parse json request body
app.use(express.json());

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// api

// routes
app.use("/api/v1", routes);

app.post("/", (req, res) => {
  res.send(req.body);
});

app.get("/error", (req, res) => {
  throw createHttpError.BadRequest("this route has an error.");
});

// if the path dose not match any router, automatically throw createHttpError.NotFound
// which would be then catched by the middleware we defined next

// error handling
// 404 -> pass it to the following middleware, arguments: (err, req, res, next)
app.use(async (req, res, next) => {
  console.log("* Not Found Error Handling ... ");
  res.status(404);
  next(createHttpError.NotFound("This route does not exist."));
});

// app.use((err, req, res, next) => {
//   next(err);
// });

app.use(async (err, req, res, next) => {
  console.log("* 500 Error Handling ... ");
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
