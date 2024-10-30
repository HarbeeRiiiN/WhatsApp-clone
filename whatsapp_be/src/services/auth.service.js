import dotenv from "dotenv";
// dotEnv config
dotenv.config();
import createHttpError from "http-errors";
import validator from "validator";
import UserModel from "../models/useModel.js";
import bcrypt from "bcrypt";

// env variables
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;
  //Validation
  // check if fields are empty
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all fields");
  }

  // check name Length
  if (
    !validator.isLength(name, {
      min: 2,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest(
      "The length of name is between 2 and 16 chars long"
    );
  }

  // check status length
  if (
    !validator.isLength(status, {
      max: 20,
    })
  ) {
    throw createHttpError.BadRequest(
      "The length of name is no longer than 20 chars"
    );
  }

  // check if email address is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest("Please provide correct email address");
  }

  // check if user already exist
  const checkDb = await UserModel.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict(
      "The email has alreay been used, please provide another email "
    );
  }

  if (
    !validator.isLength(password, {
      min: 6,
      max: 32,
    })
  ) {
    // check password length
    throw createHttpError.BadRequest(
      "Make sure the length of the password is between 6 and 32 chars long"
    );
  }

  // hash password ---> to be done in the user mode

  // addingg user to database
  const user = await new UserModel({
    name,
    email,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
    password,
  }).save();

  return user;
};

export const signUser = async (email, password, next) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();
  if (!user) {
    throw createHttpError.NotFound("Invalid Credentials.");
  }
  let passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw createHttpError.NotFound("Invalid Credentials.");
  }
  return user;
};
