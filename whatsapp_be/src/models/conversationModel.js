import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const ConversationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Conversation name is required."],
      trim: true,
    },
    isGroup: {
      type: Boolean,
      require: true,
      default: false,
    },
    users: [{ type: ObjectId, ref: "UserModel" }],
    latestMessage: {
      type: ObjectId,
      ref: "MessageModel",
    },
    admin: {
      type: ObjectId,
      ref: "UserModel",
    },
  },
  { collection: "conversations", timestamps: true }
);

const ConversationModel =
  mongoose.ConversationModel ||
  mongoose.model("ConversationModel", ConversationSchema);

export default ConversationModel;
