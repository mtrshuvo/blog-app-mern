const {Schema, model} = require("mongoose");

const commentSchema = new Schema({
    postId: {type: String, required:true},
    userId: {type: String, required: true},
    comment: {type: String, required: true}
});

module.exports.Comment = model("Comment", commentSchema);