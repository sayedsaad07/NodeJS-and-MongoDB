var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

//default routing
app.get('/' , function(req, res){
    res.send('Today is a better day Sayed');
    // res.json({hello: 'World'});
});

var today = require('./routes/today.js')(app);
var server = app.listen(3802 , function(){
    console.log("server is running at http://127.0.0.1:3802");
});