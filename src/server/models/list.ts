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

let List = module.exports = mongoose.model("listPost", listPost);
export default List