
// Dependancies
const express = require('express');
// create express app
const app = express();
const tracer = require('dd-trace').init({ service: 'node-express', // shows up as Service in Datadog UI
                                        hostname: 'agent', // references the `agent` service in docker-compose.yml
                                        env: 'staging',
                                        sampleRate: 1,
                                        debug: true}) // useful for seeing request/response and any logs
const bodyParser = require('body-parser');


const session = require('express-session');
//const restful = require('node-restful');
const mongoose = require('mongoose');
const responseTime = require('response-time');
const axios = require('axios');
const redis = require('redis');


//mongoose = restful.mongoose;

const port = process.env.PORT || 3000;

tracer.use('express');

// Mongodb
//mongoose.Promise = global.Promise;

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

// create and connect redis client to local instance.
const client = redis.createClient('redis://demo-redis:6379');

// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});
// RedisStore
/***************Redis configuratrion********************/
// Caching something using Redis
/*var RedisStore = require('connect-redis')(session);
var confRedis = require('./config/redis.js');

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
}));*/

// simple route
app.get('/', (req, res) => {
    const span = tracer.startSpan('web.request')
    res.json({"message": "Welcome to Datadog Note Taking API."});
    span.setTag('http.url', '/')
    span.finish()
});

require('./routes/routes')(app);


// Start Server
app.listen(port);
console.log('API is running on port localhost:3000');
