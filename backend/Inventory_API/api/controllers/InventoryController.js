'use strict';


var mongoose = require('mongoose'),
    Product = mongoose.model('Product');

/**
 * function to look for products using keywords (or not)
 * @param req
 * @param res
 */
exports.findByKeywords = function(req, res) {
    //if there are keywords to look for, use them
    if(req.query.keywords) {

        let array = JSON.parse(req.query.keywords).map(v => new RegExp(v, "i"));

        //look for products that match the keywords & forward them to the requester
        Product.find({keywords : {$in: array}}, (productErr, products) => {
            if (productErr)
                res.status(500).json({error: productErr.message});
            else if(!products)
                res.send('{"message": No result."}');
            else
                res.json({message: "success", result: products});
        })
    }
    //if there are no keywords, get all products & forward them to the requester
    else {
        Product.find({}, (err, products) => {
            if (err)
                res.status(500).json({error: err.message});
            else if (!products)
                res.send('{"message": "No result."}');
            else
                res.json({message: "success", result: products});
        });
    }
};

/**
 * function to look for products using IDs
 * @param req
 * @param res
 */
exports.findById = function(req, res) {
    //use the product id to find a product & forward it to the requester
    Product.findOne({productId : req.params.productId}, (err, product) => {
        if (err)
            res.status(500).json({error: err.message});
        else if (!product)
            res.send('{"message": "No result."}');
        else
            res.json({message: "success", result:product});
    });
};

/**
 * function to create a new product and store it in the database
 * @param req
 * @param res
 */
exports.createProduct = function(req, res) {
    //console.log('trying to create')
    if(req.body.keywords
        && req.body.productName
        && req.body.productId
        && req.body.price
        && req.body.quantity
        && req.body.description
        && req.body.imgUrl) {
        //Check if product ID is already taken...
        Product.findOne({productId : req.body.productId}, (err, product) => {
            if (err)
                res.status(500).json({error: err.message});
            else if (product)
                res.send('{"error": "This product ID already exists"}');
            else {
                //If not, create a new product
                let productData = new Product();
                productData.keywords = req.body.keywords.split(',');
                productData.productName = req.body.productName;
                productData.productId = req.body.productId;
                productData.price = req.body.price;
                productData.description = req.body.description;
                productData.imgUrl = req.body.imgUrl;
                productData.quantity = req.body.quantity;

                Product.create(productData, function (error, product) {
                    if (error) {
                        //console.log(error);
                        res.status(401).json({ error: error.message });
                    }
                    else if (!product) {
                        res.status(500).send('{"error": "Unable to create this product."}')
                    }
                    else {
                        //console.log(product)
                        res.send('{"message": "success"}')
                    }
                });
            }

        });
    }
    else {
        //const msg = { error: 'All fields required.'  };
        res.status(400).send('{"error": "All fields required."}');
    }
};


/**
 * function to modify an existing product and update it in the database
 * @param req
 * @param res
 */
exports.modifyProduct = function(req, res) {
    //console.log(req.params)
    //console.log(req.body)
    //console.log(fields)
    Product.updateOne({productId: req.params.productId}, { $set: req.body } , (err, result) => {
        if(err)
            res.status(401).json({error: err.message});
        else if(result.n === 0) {
            res.status(401).send('{"error":"The product you want to modify was not found."}')
        }
        else {
            //console.log(result)
            res.send('{"message":"success"}')
        }
    })
};

/**
 * function to delete an existing product in the database
 * @param req
 * @param res
 */
exports.deleteProduct = function(req, res) {
    //console.log('trying to delete:', req.params.productId)
    Product.deleteOne({productId: req.params.productId}, function(err, result) {
        //console.log('error', err)
        //console.log('result', result)
        if (err)
            res.status(401).json({error: err.message});
        else if (result.n === 0)
            res.status(401).send('{"error":"The product you want to delete was not found."}');
        else {
            //console.log(result);
            res.send('{"message":"success"}')
        }
    })
};
