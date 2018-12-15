'use strict';


var mongoose = require('mongoose'),
    Product = mongoose.model('Products');

exports.listAllProducts = function(req, res) {
  Product.find({}, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.findById = function(req, res) {
  Product.findById(req.params.barcode, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

exports.findByKeywords = function(req, res) {
  Product.findByKeywords(req.params.keywords, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};