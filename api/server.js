console.log('server is running');

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// var logger = function(req, res, next){
//   console.log('logging...');
//   next();
// }
// app.use(logger);


// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static path
app.use(express.static(path.join(__dirname, 'public')));

var person = {
  name: 'Rodolfo',
  age: 21
}

var server = app.listen(3000, listening);

app.get('/', function(req, res){
    res.json(person);
});

function listening() {
  console.log('Server Started on LocalHost:3000...');
}
