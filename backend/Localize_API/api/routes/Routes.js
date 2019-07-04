'use strict';
module.exports = function(app) {
  var localizeController = require('../controllers/LocalizeController');
  var accountController = require('../controllers/AccountController');
  var shopController = require('../controllers/ShopController');
  var mongoose = require('mongoose'),
      Shop = mongoose.model('Shop');

  app.route('/login')
      .post(accountController.login);
  app.route('/register')
      .post(accountController.register);
  app.route('/logout')
      .get(accountController.logout);

  app.route('/authenticationcheck')
      .get(accountController.authenticationcheck);


  function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    } else {
      res.status(401).send({error: 'You must be logged in to access this endpoint.'});
    }
  }

  function requiresAuthorization(req, res, next) {
    Shop.isAuthorized(req.params.shopId, req.session.userId, (err) => {
      if (err)
        res.status(err.status).json({error: err.message});
      else
        next()
    })
  }


  app.route('/localize')
      .get(localizeController.find);

  app.route('/shops')
      .get(shopController.findByKeywords)
      .post(requiresLogin, shopController.createShop);
  app.route('/shops/:shopId')
      .get(shopController.findById)
      .put(requiresLogin, requiresAuthorization, shopController.modifyShop)
      .delete(requiresLogin, requiresAuthorization, shopController.deleteShop)
};
