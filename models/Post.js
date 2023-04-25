const mongoose = require('mongoose')
const Schema =mongoose.Schema

const blogSchema=new Schema({
    title:String,
    blogDetail:String,
    createdDate:{
        type:Date,
        default:Date.now
    },
    createdBy:String
})


const Post=mongoose.model('Post',blogSchema);

module.exports=Post;