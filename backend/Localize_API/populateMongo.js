var mongoose = require('mongoose'),
    shop = require('./api/models/Shop');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/localize');


var shopInfo = {
    shopName: "123 hier gibts alles",
    shopAddress: "Rigaer Str. 67, 10247 Berlin",
    phone: "+49 030 123456789",
    email: "info@123.de",
    API: "http://192.169.178.122:8090"
}

console.log('trying to create shop info...');

shop.create(shopInfo, function(err){
    if(err)
        console.log(err);
    else
        console.log("shop info created successfully!");
    process.exit();
});





