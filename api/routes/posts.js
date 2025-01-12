const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcryptjs=require("bcryptjs");


//CREATE POST

router.post("/", async(req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    }catch(err){
        res.status(500).json(err);
    }
    
});

//UPDATE POST
router.patch("/:id", async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        
        if(post.username === req.body.username)
        {
            try{
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set: req.body,},{ new:true });
                res.status(200).json(updatedPost);
            }catch(err)
            {
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("You can only update your post!");
            }
    }catch(err){
        res.status(500).json(err)
    }
});


//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json("Post not found!");
        }
        
        if (post.username === req.body.username) {
            try {
                await Post.findByIdAndDelete(req.params.id); 
                res.status(200).json("Your post has been deleted!");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can only delete your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});



//GET POST
router.get("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    }catch(err){
        res.status(500).json(err);    }
})

//GET ALL POSTS
router.get("/", async (req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if(username)
        {
            posts = await Post.find({username});
        }else if(catName){
                posts = await Post.find({categories:{
                    $in:[catName]
                }})
            }else{
                posts = await Post.find();
            }
            res.status(200).json(posts);

    }catch(err){
        res.status(500).json(err);    }
})

router.put('/:id/like', async (req, res) => {
    const { username } = req.body;
    try {
        
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json('Post not found.');
        }

        const hasLiked = post.likes.includes(username);

        if (hasLiked) {
            post.likes = post.likes.filter(user => user !== username);
            post.likeCount -= 1;
        } else {
            
            post.likes.push(username);
            post.likeCount += 1;
        }
        await post.save();
        res.status(200).json({ likes: post.likes, likeCount: post.likeCount });
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error.');
    }
});

// GET ALL POSTS BY USERNAME
router.get("/user/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const posts = await Post.find({ username });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id/likes', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('likes', 'username profilePic');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Assuming likes contain usernames, we find user details
        const likesDetails = await User.find({ username: { $in: post.likes } }, 'username profilePic');
        res.status(200).json(likesDetails);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch like details', error: err.message });
    }
});
module.exports = router