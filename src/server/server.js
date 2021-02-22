// IMPORTS
const mongoose = require('mongoose')
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const path = require("path");
const PORT = 3001;
const ObjectID = require('mongodb').ObjectID;

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

/*Receives POST request from Axios. 
Sends POST request to NginX. NginX config allows /create passthrough and adds user's list to MongoDB*/
app.post("/create",(req, res) => {
  db.collection('finished').insertOne(new List({ 
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

//MongoDB Local Database connection setup
mongoose.connect("mongodb://127.0.0.1:27017/top10lists", {
  useNewUrlParser: true,
  useUnifiedTopology: true
 })
const db = mongoose.connection;

//Creates Mongoose Schema/Model for POSTing and GETing from MongoDB
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
listPost.set('collection', 'finished')
const List = mongoose.model("listPost", listPost);

/*Receives GET request from Axios. 
Sends GET request to NginX. NginX config allows /explore/lists passthrough and receives list from MongoDB */
app.get("/explore", (req, res) => {
  List.find({}, (err, lists) => {
    if (err){
      res.send(err)
    }
    res.json(lists)
  })
})

// Searches for List by id, then returns the list object and it's details, so Router can populate webpage
app.get("/lists/:id", (req, res) => {
  const id = req.params.id
  List.findById(id, (err, list) => {
    if (err){
      res.send(err)
    }
    res.json(list)
  })
})

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