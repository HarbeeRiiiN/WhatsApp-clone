import ConversationModle from "../models/conversationModel.js";
import createHttpError from "http-errors";
("http-errors");
import {} from "mongoose";
import UserModel from "../models/useModel.js";
export const doesConversationExist = async (sender_id, receiver_id) => {
  let convos = await ConversationModle.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: sender_id } } },
      {
        users: { $elemMatch: { $eq: receiver_id } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (!convos)
    throw createHttpError.BadRequest("Oops... Something went wrong.");
  // populate message model
  convos = await UserModel.populate(convos, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });

  return convos[0];
};

export const createChat = async (data) => {
  const newConvo = await ConversationModle.create(data);
  if (!newConvo) throw createHttpError.BadRequest("Something wrong.");
  return newConvo;
};

export const populateConversation = async (
  id,
  fieldToPopulate,
  filedToRemove
) => {
  const populateConvo = await ConversationModle.findOne({ _id: id }).populate(
    fieldToPopulate,
    filedToRemove
  );

  if (!populateConvo) {
    throw createHttpError.BadRequest("Something wrong.");
  }
  return populateConvo;
};

export const getUserConversations = async (user_id) => {
  let conversations;
  await ConversationModle.find({
    users: { $elemMatch: { $eq: user_id } },
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "name email picture status",
      });
      conversations = results;
    })
    .catch((error) => {
      throw createHttpError.BadRequest("Something wrong.");
    });
  return conversations;
};
