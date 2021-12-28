const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({ 
    title: String,
    author: String,
    date: String,
    content: String,
    meta: {
        views: Number
    }
})

module.exports = PostSchema