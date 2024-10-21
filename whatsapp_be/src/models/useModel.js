import mongoose from "mongoose";
import validator from "validator";
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
      default:
        "https://media.pitchfork.com/photos/65dfd21824cf8305d775f0cd/1:1/w_320,c_limit/Charli-XCX-Brat.jpg",
    },
    status: {
      type: String,
      default: "Hey there! I'm using whatsapp!",
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
    timeStamps: true,
  }
);

const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;
