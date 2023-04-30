const Post = require('../models/Post')

exports.addPost=async (req,res)=>{
    await Post.create(req.body)
     res.redirect("/")
 }

exports.editPost=async(req,res)=>{
    const blog=await Post.findById(req.params.id)

    await Post.findByIdAndUpdate(blog, {
        title: req.body.title,
        blogDetail: req.body.blogDetail,
        createdBy:req.body.createdBy,
        contents:req.body.contents
    })
    blog.save()
    res.redirect(`/post/${req.params.id}`)
}

exports.deletePost=async(req,res)=>{
    const blog=await Post.findOne({_id:req.params.id})
   await Post.findOneAndRemove(req.params.id)
   res.redirect('/')
}