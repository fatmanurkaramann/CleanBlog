const express= require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const path=require('path')
const ejs = require('ejs')
const pageController=require('./controller/pageController')
const blogController=require('./controller/blogController')

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

app.get("/",pageController.homePage)
app.get("/about",pageController.getAboutPage)
app.get("/add-post",pageController.getAddPostPage)
app.get("/post/:id",pageController.postDetailPage)
app.get('/post/edit/:id',pageController.postEditPage)

app.post("/blogs",blogController.addPost)
app.put('/post/:id',blogController.editPost)
app.delete('/post/:id',blogController.deletePost)


const port=3000
app.listen(port,()=>{
    console.log('3000 portunda başladı')
})
