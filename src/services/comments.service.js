const Posts = require("../../models/Posts");

exports.Create = async (postId, { author, text }) => {
  try {
    const post = await Posts.findById(postId);
    if (!post) return { error: true, message: "Post n'existe pas", statusCode: 404 };

    post.comments.push({ author: author.trim(), text: text.trim() });
    await post.save();

    return { error: false, message: "Commentaire ajouté avec succès", data: post, statusCode: 201 };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
};

exports.UpdateOne = async (postId, commentId, { text }) => {
  try {
    const post = await Posts.findById(postId);
    if (!post) return { error: true, message: "Post n'existe pas", statusCode: 404 };

    const comment = post.comments.id(commentId);
    if (!comment) return { error: true, message: "Commentaire introuvable", statusCode: 404 };

    comment.text = text ?? comment.text;
    await post.save();

    return { error: false, message: "Commentaire mis à jour avec succès", data: post, statusCode: 200 };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
};

exports.DeleteOne = async (postId, commentId) => {
  try {
    const post = await Posts.findById(postId);
    if (!post) return { error: true, message: "Post n'existe pas", statusCode: 404 };

    const comment = post.comments.id(commentId);
    if (!comment) return { error: true, message: "Commentaire n'existe pas", statusCode: 404 };

    //comment.remove(); probleme ?? 
    post.comments = post.comments.filter(c => c._id.toString() !== commentId);
    await post.save();

    return { error: false, message: "Commentaire supprimé avec succès", data: post, statusCode: 200 };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
};
