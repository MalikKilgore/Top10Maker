const mongoose = require('mongoose')
const listSchema = mongoose.Schema;

let listPost = new listSchema({
    _id: String,
    date: Date,
    title: String,
    user: String,
    list: Array,
    url: String,
    likes: Number,
});

let List = module.exports = mongoose.model("listPost", listPost);