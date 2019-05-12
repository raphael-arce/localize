'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ShopSchema = new Schema({
    shopName: String,
    shopAddress: String,
    shopGeo: [],
    phone: String,
    email: String,
    API: String
});

module.exports = mongoose.model('Shop', ShopSchema);

