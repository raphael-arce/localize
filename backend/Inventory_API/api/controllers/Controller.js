'use strict';


var mongoose = require('mongoose'),
    Product = mongoose.model('Products');

exports.findByKeywords = function(req, res) {
  if(req.query.keywords) {
    let array = JSON.parse(req.query.keywords)
      console.log(array);
      Product.find({keywords : {$in: array}}, function(err, product) {
          console.log('requesting by keywords : ' + array);
          console.log('found:');
          console.log(product)
          if (err)
              res.send(err);
          res.json(product);
      });
  } else {
      Product.find({}, function(err, product) {
          console.log('requesting all products... ');
          console.log('found:');
          console.log(product);
          if (err)
              res.send(err);
          res.json(product);
      });
  }
};


exports.findById = function(req, res) {
  Product.find({productId : req.params.productId}, function(err, product) {
    console.log('requesting by product Id : ' + req.params.productId);
    console.log('found:');
    console.log(product)
    if (err)
      res.send(err);
    res.json(product);
  });
};

//exports.findByKeywords = function(req, res) {

//};


