const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,          
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },
    avatarUrl: {
      type: String,
      default: "",
    },


    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",     
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,         
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
