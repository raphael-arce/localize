'use strict';
module.exports = function(app) {
  var inventory = require('../controllers/Controller');

//Routes for information
  app.route('/localize')
      .get(inventory.find);
};
