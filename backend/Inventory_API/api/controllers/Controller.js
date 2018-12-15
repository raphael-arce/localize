'use strict';


var mongoose = require('mongoose'),
    Product = mongoose.model('Products'),
    Shop = mongoose.model('Shop');

/**
 * function to look for products using keywords (or not)
 * @param req
 * @param res
 */
exports.findByKeywords = function(req, res) {
    //begin with finding the shopInfo
    Shop.find({},function(shopErr, shopInfo){
        console.log(shopInfo);

        if(!shopInfo) {
            res.send("error");
        }

        if(shopErr) //if there is an error, forward it to the requester
            res.send(shopErr);

        //if there are keywords to look for, use them
        if(req.query.keywords) {

            let array = JSON.parse(req.query.keywords)
            //look for products that match the keywords & forward them to the requester
            Product.find({keywords : {$in: array}}, function(productErr, product) {
                if (productErr)
                    res.send(productErr);
                shopInfo.inventory = product;
                console.log(shopInfo);
                res.json(shopInfo);
            });
        }
        //if there are no keywords, get all products & forward them to the requester
        else {
            Product.find({}, function(err, product) {
                if (err)
                    res.send(err);
                shopInfo.inventory = product;
                res.json(shopInfo);
            });
        }
  })
};

/**
 * function to look for products using IDs
 * @param req
 * @param res
 */
exports.findById = function(req, res) {
    //begin with finding the shopInfo....
    Shop.find({},function(shopErr, shopInfo) {
        if (shopErr) //if there is an error, forward it to the requester
            res.send(shopErr)

        //use the product id to find a product & forward it to the requester
        Product.find({productId : req.params.productId}, function(err, product) {
            if (err)
                res.send(err);
            shopInfo.inventory = product
            res.json(shopInfo);
        });
    });

};