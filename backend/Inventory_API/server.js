var express = require('express'),
  // Import the library:
  cors = require('cors'),
  app = express(),
  port = process.env.PORT || 8091,
  mongoose = require('mongoose'),
  Product = require('./api/models/Product'), //created model loading here
  //Shop = require('./api/models/Shop'), //created model loading here


  bodyParser = require('body-parser');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/inventory');

// Then use it before your routes are set up:
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/Routes'); //importing route
routes(app); //register the route


app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port);



console.log('Inventory RESTful API server started on: ' + port);
