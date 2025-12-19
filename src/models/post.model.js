const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true, // createdAt pour trier
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
