//const express = require('express')
const mongoose = require('mongoose')
//const app = express();
const path = require('path');
const PORT = 3000;
const ObjectID = require('mongodb').ObjectID;


/* 

  EXPRESS
  
*/

// app.use(express.json())
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/', function (req:any, res:any) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.listen(PORT, function() {
//   console.log("Server is running on Port: " + PORT);
// });


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
  
let insertList = db.collection('finished').insert(newList);


   
export {db, ListModel, newList, insertList}