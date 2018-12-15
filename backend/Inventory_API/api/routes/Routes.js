'use strict';
module.exports = function(app) {
  var inventory = require('../controllers/Controller');

//Routes for information

 // app.route('/products')
 //     .get(inventory.listAllProducts);

  app.route('/products')
      .get(inventory.findByKeywords);
  app.route('/products/:productId')
      .get(inventory.findById);

};
