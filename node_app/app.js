// Dependancies
const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
var session = require('express-session');
//const restful = require('node-restful');
const mongoose = require('mongoose');
//mongoose = restful.mongoose;

const port = process.env.PORT || 3000;
const tracer = require('dd-trace').init({ service: 'node-express', // shows up as Service in Datadog UI
                                        hostname: 'agent', // references the `agent` service in docker-compose.yml
                                        env: 'staging',
                                        sampleRate: 1,
                                        debug: true}) // useful for seeing request/response and any logs
// Mongodb
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect('mongodb://demo-mongo:27017/Users', { useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// RedisStore
/***************Redis configuratrion********************/
// Caching something using Redis
var RedisStore = require('connect-redis')(session);
var confRedis = require('./config/redis.js');
const redis = require('redis');
// Redis session

app.use(session({
  store: new RedisStore(confRedis.session),
  secret: confRedis.secret,
  resave: true,
  saveUninitialized: true,
  name: 'demo',
  cookie: {
    secure: confRedis.secure_cookie,
    maxAge: 3600000 //1 Hour
  }
}));


// simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./routes/routes')(app);


// Start Server
app.listen(port);
console.log('API is running on port localhost:3000');
=======
var express = require('express');

var app = express();
var multer = require('multer')
var constants = require('constants');
var constant = require('./config/constants');
var debug = require('debug')('demo-app:server');

var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var now = new Date();

const tracer = require('dd-trace').init({ service: 'node-express', // shows up as Service in Datadog UI
                                        source: 'yelp-app',
                                        hostname: 'agent', // references the `agent` service in docker-compose.yml
                                        env: 'staging',
                                        debug: true}) // useful for seeing request/response and any logs


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/***************Mongodb configuratrion********************/
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
//configuration ===============================================================
var url = 'mongodb://'+configDB.mongo_host+':'+configDB.mongo_port+'/'+configDB.mongo_db;

mongoose.connect(url, { useNewUrlParser: true }); // connect to our database


/***************Redis configuratrion********************/
// Caching something using Redis
var RedisStore = require('connect-redis')(session);
var confRedis = require('./config/redis.js');
const redis = require('redis');
// Redis session

app.use(session({
  store: new RedisStore(confRedis.session),
  secret: confRedis.secret,
  resave: true,
  saveUninitialized: true,
  name: 'demo',
  cookie: {
    secure: confRedis.secure_cookie,
    maxAge: 3600000 //1 Hour
  }
}));

require('./config/passport')(passport); // pass passport for configuration

//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'ejs'); // set up ejs for templating


//required for passport
//app.use(session({ secret: 'iloveyoudear...' })); // session secret

app.use(session({
    secret: 'So-many-secrets',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


//launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
});

app.use(function (req, res, next) {
    res.status(500).render('404', {title: "Sorry, page not found"});
});
exports = module.exports = app;
