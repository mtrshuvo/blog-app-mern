const {Comment} = require("../models/CommentModel");
const Post = require("../models/Post");
const User = require("../models/User");
const router = require("express").Router();

 router.post("/:postid", async(req, res)=> {
    try {
        const post_id = req.params.postid;
        const post = await Post.findOne({_id: post_id});
        if(!post) return res.status(400).json({"message": "Post not found"});
        const comment = new Comment(req.body);
        await comment.save();
        return res.status(200).json({"message" : "successfully comment"})
    }catch(err){
        return res.status(400).json({"message": "Something wrong in comment"})
    }
})

router.delete("/:postid", async(req, res)=> {
    try {
        const post_id = req.params.postid;
        const post = await Post.findOne({_id: post_id});
        if(!post) return res.status(400).json({"message": "Post not found"});
        const comment_id = req.params.commentid;
        const comment = await Comment.findOne({_id: comment_id});
        if(!comment) return res.status(400).json({"message": "Comment not found"});
        
        if(comment.userId !== req.user._id){
            return res.status(400).json({"message" : "you cannot delete another user comment"})
        }
        if(comment.userId === req.user._id){
            await Comment.findOneAndDelete({_id: comment_id, userId: req.user._id});
            return res.status(200).json({"message": "Successfully deleted your comment"});
        }
    }catch(err){
        console.log(err);
        return res.status(400).json({"message": "Something wrong in delete comment"})
    }
})

router.get("/comment/:postid",async(req, res)=> {
    try{
        const post_id = req.params.postid;
        const post = await Post.findOne({_id: post_id});
        if(!post) return res.status(400).json({"message": "Post not found"});
        const allComments = await Comment.find({postId: post._id});
        return res.status(200).json(allComments);   
    }catch(err){
        console.log(err)
        return res.status(400).json({"message": "Something wrong in all comment"})

    }
})
module.exports = router;