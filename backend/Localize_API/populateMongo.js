var mongoose = require('mongoose'),
    shop = require('./api/models/Shop');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/localize');


var shopInfo = {
    shopName: "456 hier gibts noch mehr",
    shopAddress: "Schreinerstr. 43, 10247 Berlin",
    shopPostcode: "10247",
    shopCity: "Berlin",
    shopGeo: [52.516952, 13.468145],
    phone: "+49 030 987654321",
    email: "info@456.de",
    API: "http://localhost:8091"
}

console.log('trying to create shop info...');

shop.create(shopInfo, function(err){
    if(err)
        console.log(err);
    else
        console.log("shop info created successfully!");
    process.exit();
});





