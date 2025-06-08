import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

// timestamp
// 1 -> record the time of user creation
/// 2-> record the time of the update -> helpful in the sorting
