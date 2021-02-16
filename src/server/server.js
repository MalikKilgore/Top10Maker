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

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post("/create",(req, res) => {
  console.log("Request received")
  db.collection('finished').insertOne(new ListModel({ 
    _id: new ObjectID(),
    title: req.body.title, 
    user: req.body.user,
    date: new Date(),
    likes: 0,
    list: req.body.list,
    url: req.body.url
  }));
  console.log(req.body)
  res.end("Success")  
})

app.listen(PORT, function(){
  console.log('Server started on port: ' + PORT)
})

mongoose.connect("mongodb://127.0.0.1:27017/top10lists", {
  useNewUrlParser: true,
  useUnifiedTopology: true
 })
const db = mongoose.connection;

// Check MongoDB connection
db.once("open", function() {
  console.log("Connected to MongoDB");
});

// Check for db errors
db.on('error', function(err){
  console.log(err)
})