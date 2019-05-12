'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
    productName: String,
    productId: String,
    price: String,
    keywords: [String],
    quantity: Number
});

module.exports = mongoose.model('Product', ProductSchema);

