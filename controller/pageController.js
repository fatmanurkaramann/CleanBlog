const Post = require('../models/Post')

exports.homePage=async (req,res)=>{
    const blogs = await Post.find()
    res.render("index",{
        blogs
    })
}

exports.getAboutPage=(req,res)=>{
    res.render("about")
}

exports.getAddPostPage=(req,res)=>{
    res.render("add_post")
}

exports.postDetailPage=async (req,res)=>{
    const blog=await Post.findById(req.params.id)
    res.render("post",{blog})
}

exports.postEditPage=async(req,res)=>{
    const blog=await Post.findById(req.params.id)
    res.render('edit',{blog})
}