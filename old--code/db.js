var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var debug = require('debug')('demo-app:server');
var config = require('./config');

global.db = mongoose.createConnection('mongodb://'+config.mongo_host+':'+config.mongo_port+'/'+config.mongo_db+','+config.mongo_host+':'+config.mongo_port+'/?replicaSet=rs0');

db.on('error', function() {
    debug('MongoDB Connection Error');
    config.mongo_set_connected(false);
});

db.once('open', function() {
  // we're connected!
  debug("Connected to Mongo yo.");
  config.mongo_set_connected(true);
});
