const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: 
    {   type: String, 
        required: true 
    },
    content:
    {   type: String,
        required: true
    },
    image: { 
        type: String, 
        default: null 
    },
    comments: [ // faire un modele comments a part??? 
      {
        author: 
        {   type: String, 
            required: true 
        },
        text: 
        {   type: String, 
            required: true 
        },
        createdAt: 
        {   type: Date, 
            default: Date.now },
        },
    ],
    // eventuellement ajouter des likes??
  },
  { timestamps: true } // ajouter les champs CreatedAt et UpdatedAt
);

const Posts = mongoose.model("Posts", postSchema);
module.exports = Posts;