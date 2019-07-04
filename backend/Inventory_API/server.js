var express = require('express'),
  // Import the library:
  cors = require('cors'),
  helmet = require('helmet'),
  app = express(),
  port = process.env.PORT || 8090,
  mongoose = require('mongoose'),
  Product = require('./api/models/Product'), //created model loading here
  Account = require('./api/models/Account'), //created model loading here
  //Shop = require('./api/models/Shop'), //created model loading here
  bodyParser = require('body-parser'),
  session = require('express-session');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/inventory');

// Then use it before your routes are set up:
app.use(cors());
app.use(helmet());
app.use(session({
    secret: 'se cr et 1 3 ###',
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/Routes'); //importing route
routes(app); //register the route


app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port);



console.log('Inventory RESTful API server started on: ' + port);
