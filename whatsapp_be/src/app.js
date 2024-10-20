import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
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

// parse json request body
app.use(express.json());

// parse json request url
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// enable cookie parser
app.use(cookieParser());

// gzip compression
app.use(compression());

// file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
// api
app.post("/", (req, res) => {
  res.send(req.body);
});

app.get("/error", (req, res) => {
  throw createHttpError.BadRequest("this route has an error.");
});

// error handling
app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist."));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
