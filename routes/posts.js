const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js");

router.post("/create", async (req,res) =>{
    try{
        const post = await Post.create(req.body);
        res.status(201).send(post);
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Problem to create post"});
    }
});

router.get("/", async (req,res) =>{
    try{
        const post = await Post.find()
        res.json(post)
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Problem to see all posts"});
    }
});


router.get("/id/:_id", async (req,res) =>{
    try{
        const post = await Post.findById(req.params._id)
        if(!post) return res.status(404).json({message: "Post not found"})
        res.json(post)
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Problem to see posts"});
    }
});

router.get("/title/:title", async (req,res) =>{
   try{
        const post = await Post.findOne({title: req.params.title})
        if(!post) return res.status(404).json({message: "Post not found"})
        res.json(post)
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Problem to see posts"});
    }
});

router.get("/postWithPagination", async (req,res)=>{
    const page=parseInt(req.query.page) || 1;

    try{
        const post = await Post.find().skip((page -1)*10).limit(10);
        res.json(post);
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Problem to see posts"});
    }
})

router.put("/id/:_id", async (req,res) =>{
   try{
        const post = await Post.findByIdAndUpdate(req.params._id,
            {title: req.body.title,
            body: req.body.body},
            {new: true}
        );
        if(!post) return res.status(404).json({message: "Post not found"})
        res.json(post)
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Problem to see posts"});
    }
});

router.delete("/id/:_id", async (req,res) =>{
   try{
        const result = await Post.findByIdAndDelete(req.params.title)
        if(!result) return res.status(404).json({message: "Post not found"})
        res.json(result)
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Problem to see posts"});
    }
});


module.exports = router;