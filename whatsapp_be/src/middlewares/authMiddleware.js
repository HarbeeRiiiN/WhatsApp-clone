import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
export default async function (req, res, next) {
  if (!req.headers["authorization"]) {
    return next(createHttpError.Unauthorized());
  }
  const bearerToken = req.headers["authorization"];
  const token = brearerToken.split(" ")[1];
  res.send(token);
  json.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      console.log(err.name);
      console.log(err.message);
      return next(createHttpError.Unauthorized());
    }
    req.user = payload;
    next();
  });
}
