var mongoose = require('mongoose'),
    product = require('./api/models/Product'); //created model loading here;
    //shop = require('./api/models/Shop');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/inventory');


var products =  [{
    productName: 'Schal',
    productId: 0702754936412,
    price: 'EUR 29,95',
    keywords: ['Nack',  'Gaiter', '100% Merino', 'Oliv'],
    quantity: 7
},{
    productName: 'Schal (fake)',
    productId: 0702754936413,
    price: 'EUR 29,95',
    keywords: ['Nack', 'Oliv'],
    quantity: 7
},{
    productName: 'Schal (fake)',
    productId: 0702754936414,
    price: 'EUR 29,95',
    keywords: ['Nack'],
    quantity: 7
},{
    productName: 'Sporthose',
    productId: 4050946640811,
    price: 'EUR 15,90',
    keywords: ['adidas', 'Cl Core', '3/4', 'Tight', 'Trainingshose', 'schwarz 44'],
    quantity: 4
},{
    productName: 'Jeans',
    productId: 4032045531245,
    price: 'EUR 59,95',
    keywords: ['MUSTANG', 'Jeans', '36/32', '3158', '5178', '098'],
    quantity: 14
}]

console.log('trying to create shop info...')

product.insertMany(products, function(err) {
        if(err)
            console.log(err);
        else
            console.log("product info created successfully!")
    process.exit();
});





