const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({ 
    title: String,
    author: String,
    date: String,
    content: String
})

module.exports = PostSchema