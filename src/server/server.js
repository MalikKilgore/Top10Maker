const mongoose = require('mongoose')
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const path = require("path");
const PORT = 3001;
const ObjectID = require('mongodb').ObjectID;
let ListModel = require("./models/list");

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//Receives POST requests and sends them to the local MongoDB server.
app.post("/create",(req, res) => {
  db.collection('finished').insertOne(new ListModel({ 
    _id: new ObjectID(),
    date: new Date(),
    title: req.body.title, 
    user: req.body.user,
    list: req.body.list,
    url: req.body.url,
    likes: 0,
  }));
  res.end("Success")  
})

//MongoDB Local Database connection
mongoose.connect("mongodb://127.0.0.1:27017/top10lists", {
  useNewUrlParser: true,
  useUnifiedTopology: true
 })
const db = mongoose.connection;

//Starts Express server on port 3001
app.listen(PORT, function(){
  console.log('Server started on port: ' + PORT)
})

// Check MongoDB connection
db.once("open", function() {
  console.log("Connected to MongoDB");
});

// Check for db errors
db.on('error', function(err){
  console.log(err)
})