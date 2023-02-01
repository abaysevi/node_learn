
const mongoose = require('mongoose')


const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, },
    email: { type: String, },
    password: { type: String, },
    role: { type: String, enum:["admin","client"]}
}));

const Post = mongoose.model('Post',new mongoose.Schema({
    user_id: { type: String },
    post_media_url: { type: String },
    created_date: { type: String },
    updated_date: { type: String },
    post_title: { type: String },
    post_descri: { type: String }

}))

module.exports = {
    User, Post
}

