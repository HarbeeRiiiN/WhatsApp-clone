import mongoose from "mongoose";
import validator from "validator";

// env variables
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      unique: [true, "This email address already exist"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    picture: {
      type: String,
      default: DEFAULT_PICTURE,
    },
    status: {
      type: String,
      default: DEFAULT_STATUS,
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: [6, "Plase make sure your password is atleast 6 chars long"],
      maxLength: [
        32,
        "Plase make sure your password is less than 32 chars long",
      ],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;
