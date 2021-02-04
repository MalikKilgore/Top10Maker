import mongoose from 'mongoose';

const listSchema = mongoose.Schema;

let listPost = new listSchema({
    title: String,
    user: String,
    date: Date,
    likes: Number,
    list: Array,
    url: String
});

let Post = module.exports = mongoose.model("listPost", listPost);