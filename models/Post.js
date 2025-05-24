const mongoose=require("mongoose")

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Obligatorio"]
    },
    body: {
        type: String,
        required: [true, "Obligatorio"]
    }
}, { timestamp: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

