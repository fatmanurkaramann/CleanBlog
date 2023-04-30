const express= require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const path=require('path')
const ejs = require('ejs')
const Post = require('./models/Post')

const app = express()

mongoose.connect('mongodb://localhost/cleanblog-test-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))

app.get("/",async (req,res)=>{
    const blogs = await Post.find()
    res.render("index",{
        blogs
    })
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/add-post",(req,res)=>{
    res.render("add_post")
})
app.get("/post/:id",async (req,res)=>{
    const blog=await Post.findById(req.params.id)
    res.render("post",{blog})
})
app.post("/blogs",async (req,res)=>{
   await Post.create(req.body)
    res.redirect("/")
})
app.get('/post/edit/:id',async(req,res)=>{
    const blog=await Post.findById(req.params.id)
    console.log(blog.id)
    res.render('edit',{blog})
})
app.put('/post/:id',async(req,res)=>{
    const blog=await Post.findById(req.params.id)

    await Post.findByIdAndUpdate(blog, {
        title: req.body.title,
        blogDetail: req.body.blogDetail,
        createdBy:req.body.createdBy,
        contents:req.body.contents
    })
    blog.save()
    res.redirect(`/post/${req.params.id}`)
})


const port=3000
app.listen(port,()=>{
    console.log('3000 portunda başladı')
})
