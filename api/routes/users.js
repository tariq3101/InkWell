const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcryptjs=require("bcryptjs");

//Update
router.patch("/:id", async(req,res)=>{
    if(req.body.userId===req.params.id)
    {
        if(req.body.password)
        {
            const salt =await bcryptjs.genSalt(10);
            req.body.password = await bcryptjs.hash(req.body.password,salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },{new:true} );
                res.status(200).json(updatedUser);                
        }catch(err){
            console.log(err)
            res.status(500).json(err);}
    }else{
        res.status(401).json("You can only update your own account!!");
    }
});

//Delete
router.delete("/:id", async (req, res) => {
    
    if (req.body.userId === req.params.id) {
      try {
        
        const user = await User.findById(req.params.id);
        
        if (!user) {
          return res.status(404).json("User not found");
        }
  
       
        await Post.deleteMany({ username: user.username });
  
        
        await User.findByIdAndDelete(req.params.id);
        
        res.status(200).json("User and associated posts have been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only delete your own account!");
    }
  });
  

//GET USER
router.get("/:id", async (req,res)=>{
    try{
        const user= await User.findById(req.params.id);
        const {password,...others}=user._doc;
        res.status(200).json(others);

    }catch(err){
        res.status(500).json(err);    }
})

module.exports = router