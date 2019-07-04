'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShopSchema = new Schema({
    owner: Schema.Types.ObjectId,
    shopName: String,
    shopAddress: String,
    shopPostcode: String,
    shopCity: String,
    shopGeo: [],
    phone: String,
    email: String,
    API: String
});

ShopSchema.statics.isAuthorized = function(shopId, userId, callback) {
    Shop.findOne({_id: shopId})
        .exec(function(err, shop) {
            if(err)
                return callback(err);
            else if(!shop) {
                let err = new Error('Shop not found.');
                err.status = 400
                return callback(err)
            }
            else {
                if(shop.owner.toString() === userId)
                    return callback(null)
                else {
                    let err = new Error('User not authorized');
                    err.status = 401
                    return callback(err)
                }
            }
        })
};

let Shop = mongoose.model('Shop', ShopSchema);
module.exports = Shop;

