// Dependancies
var express = require('express');
const app = express();
var router = express.Router();

// Models
var Product = require('../app/models/product');
var Restaurant = require('../app/models/restaurants');

// Routes

Product.methods(['get', 'put', 'post', 'delete']);
Product.register(router, '/api/products');

Restaurant.methods(['get', 'put', 'post', 'delete']);
Restaurant.register(router, '/api/restaurants');

// Return router
module.exports = router;
