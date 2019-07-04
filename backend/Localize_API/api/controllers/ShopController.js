'use strict';


var mongoose = require('mongoose'),
    Shop = mongoose.model('Shop');



/**
 * function to create a new shop and store it in the database
 * @param req
 * @param res
 */
exports.createShop = function(req, res) {
    if(req.body.shopName
        && req.body.shopAddress
        && req.body.shopPostcode
        && req.body.shopCity
        && req.body.shopGeo
        && req.body.phone
        && req.body.email
        && req.body.API) {

            let shopData = new Shop();
            shopData.owner = req.session.userId;
            shopData.shopName = req.body.shopName;
            shopData.shopAddress = req.body.shopAddress;
            shopData.shopPostcode = req.body.shopPostcode;
            shopData.shopCity = req.body.shopGeo;
            shopData.shopGeo = JSON.parse(req.body.shopGeo);
            shopData.phone = req.body.phone;
            shopData.email = req.body.email;
            shopData.API = req.body.API;

            Shop.create(shopData, function (error, shop) {
                if (error) {
                    //console.log(error);
                    res.status(401).json({ error: error.message });
                }
                else if (!shop) {
                    res.status(500).send('{"error": "Unable to create this shop."}')
                }
                else {
                    res.send('{"message": "success"}')
                }
            });
    }
    else {
        //const msg = { error: 'All fields required.'  };
        res.status(400).send('{"error": "All fields required."}');
    }
};


exports.findByKeywords = function(req, res) {
    Shop.findOne({shopName: req.query.shopName}, (err, result) => {
        if(err)
            res.status(401).json({error: err.message});
        else
            res.json({message:'success', result: result});
    })
}

exports.findById = function(req, res) {
    Shop.findOne({_id: req.params.shopId}, (err, result) => {
        if(err)
            res.status(401).json({error: err.message});
        else
            res.json({message:'success', result: result});
    })
}

/**
 * function to modify an existing shop and update it in the database
 * @param req
 * @param res
 */
exports.modifyShop = function(req, res) {
    let fields = JSON.parse(req.body.fields);

    Shop.updateOne({_id: req.params.shopId}, { $set: fields } , (err, result) => {
        if(err)
            res.status(401).json({error: err.message});
        else if(result.n === 0) {
            res.status(401).send('{"error":"The shop you want to modify was not found."}')
        }
        else {
            //console.log(result)
            res.send('{"message":"success"}')
        }
    })
};

/**
 * function to delete an existing shop in the database
 * @param req
 * @param res
 */
exports.deleteShop = function(req, res) {
    Shop.deleteOne({_id: req.params.shopId}, function(err, result) {
        //console.log('error', err)
        //console.log('result', result)
        if (err)
            res.status(401).json({error: err.message});
        else if (result.n === 0)
            res.status(401).send('{"error":"The shop you want to delete was not found."}');
        else {
            //console.log(result);
            res.send('{"message":"success"}')
        }
    })
};
