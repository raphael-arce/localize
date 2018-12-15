'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShopInfo = new Schema({
    shopName: String,
    shopAddress: String,
    phone: String,
    email: String,
    API: String
})

module.exports = mongoose.model('Shop', ShopInfo);