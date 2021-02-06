//import mongodb from 'mongodb'
var mongoose = require('mongoose')
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const PORT = 3001;
const ObjectID = require('mongodb').ObjectID;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


/* 

  MONGODB/MONGOOSE 

*/
const db = mongoose.connection;


// Check MongoDB connection
db.once("open", function() {
  console.log("Connected to MongoDB");
});

// Check for db errors
db.on('error', function(err){
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
  
// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/top10lists", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db.collection('finished').insertOne(newList));


//export {db, ListModel, newList, insertList}