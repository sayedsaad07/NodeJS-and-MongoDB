// var http = require('http');
// http.createServer(function(req , res) {
//     res.writeHead(200 , {"Content-Type": "text/plain"});
//     res.end("Hello World. Welcome to Node Js Sayed");
// }).listen(3800 , "127.0.0.1");
// console.log("Server running at http:\\127.0.0.1:3800");

var express = require('express');
var app = express();
var bodyparser = require('body-parser');
//require mangoose and connect it to tasks db
var mongoose = require('mongoose');

var mongoURI = "mongodb://localhost:27017/task";
mongoose.Promise = global.Promise;
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

//default routing
app.get('/' , function(req, res){
    res.send('Here is your Tasks Sayed');
    // res.json({hello: 'World'});
});

var tasks = require('./routes/task.js')(app);

var server = app.listen(3800 , function(){
    console.log("server is running at http://127.0.0.1:3800");
});