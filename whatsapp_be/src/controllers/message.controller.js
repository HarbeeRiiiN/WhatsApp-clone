import logger from "../configs/logger.config.js";
import {
  createMessage,
  populatedMessage,
  updateLatestMessage,
  getConvoMessage,
} from "../services/message.service.js";
export const sendMessage = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const { message, convo_id, files } = req.body;

    if (!convo_id || (!message && !files)) {
      logger.error("Please provide a conversation id and a valid message.");
      return res.sendStatus(400);
    }

    const msgData = {
      sender: user_id,
      message,
      conversation: convo_id,
      file: files || [],
    };

    let newMsg = await createMessage(msgData);
    let populatedMsg = await populatedMessage(newMsg._id);
    await updateLatestMessage(convo_id, newMsg);
    res.json(populatedMsg);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const convo_id = req.params.convo_id;
    if (!convo_id) {
      logger.error("Please add a conversation id in params.");
      res.sendStatus(400);
    }
    const messages = await getConvoMessage(convo_id);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
