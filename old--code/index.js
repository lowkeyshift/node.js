// Additional tooling is needed https://datadog.github.io/dd-trace-js/#tracer-settings
var config = require('./config');
var debug = require('debug')('demo-app:server');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
const tracer = require('dd-trace').init({ service: 'node-express', // shows up as Service in Datadog UI
                                        hostname: 'agent', // references the `agent` service in docker-compose.yml
                                        env: 'staging',
                                        sampleRate: 1,
                                        debug: true}) // useful for seeing request/response and any logs

const express = require('express');
const redis = require('redis');

const PORT = config.port;

const app = express();

// enable express integration
tracer.use('express')

// Routes
app.get('/', (req, res) => res.send('GET home page'));

app.get('/org/:orgId', function (req, res) {
   res.send(req.params)
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

// Connect to Mongo. This will generate a db variable globally.
require('./db');
//var User = require('./models/user');

// Caching something using Redis
// Redis session

app.use(session({
  store: new RedisStore(config.session),
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  name: 'demo',
  cookie: {
    secure: config.secure_cookie,
    maxAge: 3600000 //1 Hour
  }
}));
