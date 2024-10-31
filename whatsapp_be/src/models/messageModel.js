import mongoose, { Collection } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const MessageSchema = mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "UserModel",
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: {
      type: ObjectId,
      ref: "ConversationModel",
    },
    files: [],
  },
  { collection: "messages", timestamps: true }
);

const MessageModel =
  mongoose.MessageModel || mongoose.model("MessageModel", MessageSchema);

export default MessageModel;
