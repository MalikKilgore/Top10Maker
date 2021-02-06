import express from 'express'
import mongoose from "mongoose"
import mongodb from 'mongodb'
const bodyParser = require('body-parser')
const path = require('path');
const PORT = 3001;
const ObjectID = require('mongodb').ObjectID;
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


/* 

  MONGODB/MONGOOSE 

*/
// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/top10lists", {
  useNewUrlParser: true
});
const db = mongoose.connection;

// Check MongoDB connection
db.once("open", function() {
  console.log("Connected to MongoDB");
});

// Check for db errors
db.on('error', function(err:any){
  console.log(err)
})

//Mongoose exports
let ListModel = require("./models/list");
const newList = new ListModel({ 
  _id: new ObjectID(),
  title: 'Introduction to Mongoose', 
  user: 'Owner',
  date: Date(),
  likes: 1,
  list: ['This', 'be', 'a', 'list'],
  url: 'URL will go here eventually'});
  
let insertList = db.collection('finished').insertOne(newList);

export {db, ListModel, newList, insertList}