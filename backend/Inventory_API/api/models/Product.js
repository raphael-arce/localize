'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
    productName: String,
    productId: Number,
    price: String,
    keywords: [String],
    quantity: Number
});

module.exports = mongoose.model('Products', ProductSchema);

