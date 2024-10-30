import createHttpError from "http-errors";
import UserModel from "../models/useModel.js";

export const findUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user)
    throw createHttpError.BadRequest("Please fill all required fields.");
  return user;
};
