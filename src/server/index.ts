const express = require('express')
const mongoose = require('mongoose')
const app = express();
const PORT = 3001;
let newList = require("./models/list");


/* 

  EXPRESS
  
*/
app.use(express.json())
//Listen for app on port
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});


/* 

  MONGODB/MONGOOSE 

*/
// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/finished", {
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



export {}