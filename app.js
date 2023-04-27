const express= require('express')
const mongoose = require('mongoose')
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

const port=3000
app.listen(port,()=>{
    console.log('3000 portunda başladı')
})
