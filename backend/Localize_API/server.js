var express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  mongoose = require('mongoose'),
  //Product = require('./api/models/Shop'), //created model loading here
  Shop = require('./api/models/Shop'), //created model loading here
  cors = require('cors'),
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/localize');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin:'http://localhost:3000'
}

app.use(cors(corsOptions));

var routes = require('./api/routes/Routes'); //importing route
routes(app); //register the route


app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});



app.listen(port);


console.log('Inventory RESTful API server started on: ' + port);
