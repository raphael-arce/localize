'use strict';
module.exports = function(app) {
  var inventory = require('../controllers/InventoryController');
  var account = require('../controllers/AccountController');

  app.route('/login')
      .post(account.login);
  app.route('/register')
      .post(account.register);
  app.route('/logout')
      .get(account.logout);

  app.route('/authenticationcheck')
      .get(account.authenticationcheck);


  function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    } else {
      res.status(401).send({error: 'You must be logged in to access this endpoint.'});
    }
  }


  app.route('/products')
      .get(inventory.findByKeywords)
      .post(requiresLogin, inventory.createProduct); //only logged in users are allowed to access this endpoint
  app.route('/products/:productId')
      .get(inventory.findById)
      .put(requiresLogin, inventory.modifyProduct) //only logged in users are allowed to access this endpoint
      .delete(requiresLogin, inventory.deleteProduct); //only logged in users are allowed to access this endpoint


};
