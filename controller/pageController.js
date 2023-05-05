const Post = require('../models/Post')

exports.homePage=async (req,res)=>{

    const page=req.query.page || 1
    const blogPerPage=2
    const totalBlogs=await Post.find().countDocuments()
    const showPreviousPageLink = page > 1 && page !== '1';
    const blogs = await Post.find()
    .sort('-createdDate')
    .skip((page-1)*blogPerPage)
    .limit(blogPerPage)

    res.render("index",{
        blogs:blogs,
        current:page,
        pages:Math.ceil(totalBlogs/blogPerPage),
        showPreviousPageLink: showPreviousPageLink
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