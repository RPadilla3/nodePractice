var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var app = express();

// View Engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
// taken from githubs body-parser Middleware code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static path
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  res.locals.errors = null;
  next();
});

// express-validator Middleware
// taken from githubs express-validator Middleware code

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

var users = [
    {
      id: 1,
      first_name: 'Rodolfo',
      last_name: 'Padilla',
      email: 'Padilla_r95@Rocketmail.com'
    },
    {
      id: 2,
      first_name: 'Isabella',
      last_name: 'Padilla',
      email: 'IPadilla@fake.com'
    },
    {
      id: 3,
      first_name: 'Luisa',
      last_name: 'Gutierrez',
      email: 'Lguti@fake.com'
    }
];

var server = app.listen(3000, listening);

app.get('/', function(req, res){
    res.render('index', {
      title: 'Customers',
      users: users
    });
});

app.post('/users/add', function(req, res){

  req.checkBody('first_name', 'First Name is Required').notEmpty();
  req.checkBody('last_name', 'Last Name is Required').notEmpty();
  req.checkBody('email', 'Email is Required').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.render('index', {
      title: 'Customers',
      users: users,
      errors: errors
    });

  } else {
    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    }
    console.log('success');
  }
});

function listening() {
  console.log('Server Started on localhost:3000...');
}
