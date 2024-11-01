import UserModel from "../models/useModel.js";
import MessageModel from "../models/messageModel.js";
import ConversationModel from "../models/conversationModel.js";
import createHttpError from "http-errors";

export const createMessage = async (msg) => {
  let newMsg = await MessageModel.create(msg);
  if (!newMsg) {
    throw createHttpError.BadRequest("Something went wrong.");
  }
  return newMsg;
};

export const populatedMessage = async (id) => {
  let msg = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "name picture",
      model: "UserModel",
    })
    .populate({
      path: "conversation",
      select: "name isGroup users",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "name email picture status",
        model: "UserModel",
      },
    });
  if (!msg) {
    throw createHttpError.BadRequest("Something went wrong.");
  }
  return msg;
};

export const updateLatestMessage = async (convo_id, newMsg) => {
  const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_id, {
    latestMessage: newMsg,
  });
  if (!updatedConvo) {
    throw createHttpError.BadRequest("Something went wrong.");
  }
  return updatedConvo;
};

export const getConvoMessage = async (convo_id) => {
  const messages = await MessageModel.find({ conversation: convo_id })
    .populate("sender", "name picture email status")
    .populate("conversation");
  if (!messages) {
    throw (createHttpError, BadRequest("Something went wrong."));
  }
  return messages;
};
