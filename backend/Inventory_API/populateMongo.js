var mongoose = require('mongoose'),
    product = require('./api/models/Product'); //created model loading here;
    //shop = require('./api/models/Shop');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/inventory');


var products =  [
    /*{
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
}*/
    {
        productName: 'Vans Old Skool Canvas black/true white',
        productId: 'VN0A3WMAVNE',
        price: 'EUR 85,00',
        keywords: ['VANS', 'old', 'skool', 'comfycush', 'canvas', 'black'],
        quantity: 10
    },
    {
        productName: 'Vans Authentic',
        productId: 'VN0A38EMVK6',
        price: 'EUR 70,00',
        keywords: ['VANS', 'authentic', 'Rose', 'Ocean'],
        quantity: 10
    },
    {
        productName: 'Vans Slip-On',
        productId: 'VN0A38EMVG4',
        price: 'EUR 65,00',
        keywords: ['VANS', 'Checkerboard', 'Slip', 'on', 'Red', 'White'],
        quantity: 10
    },
    {
        productName: 'Vans Era',
        productId: 'VN0A38FRVLV',
        price: 'EUR 75,00',
        keywords: ['VANS', 'Checkerboard', 'Era', 'Multi', 'White'],
        quantity: 10
    },
    {
        productName: 'Vans Galactic Goddess SK8-HI',
        productId: 'VN0A38GEVJZ',
        price: 'EUR 90,00',
        keywords: ['VANS', 'Galactic', 'Goddess', 'Sk8-HI', 'Multi', 'White'],
        quantity: 10
    }];

let populate = () => {
    console.log('creating mock product data..');
    /*for (let i = 0; i < 5000; i++) {
        products.push({
            productName: 'Jeans',
            productId: 4032045531245 + i,
            price: 'EUR 59,95',
            keywords: ['MUSTANG', 'Jeans', '36/32', '3158', '5178', '098'],
            quantity: 14
        })
    }*/
    console.log('data created successfully!');
    console.log('trying to populate inventory with mock product data...');
    product.insertMany(products, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("product saved successfully!")
        }
    });
};

populate();









