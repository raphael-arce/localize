# Run the API

### Install & Run MongoDB
Download [here](https://docs.mongodb.com/manual/installation/) & Run with

`mongod`


### Install the node packages

`npm install`


### Populate the MongoDB (create mock data)

`npm run pop`


###Run the NodeJS

`npm run start`


## Docker

###build
`docker build -t blade/blade-js .`
###run
`docker-compose up`
###generate tar
`docker save -o <path for generated tar file> <image name>`
###load
`docker load -i <path to tar file>`



### Queries

Query all products: http://localhost:3000/products

Query a product by keywords: http://localhost:3000/products?keywords=["KEYWORD1","KEYWORD2"]

Query a product by id: http://localhost:3000/products/{productId}

Examples: 

http://localhost:3000/products/4032045531245

http://localhost:3000/products?keywords=["Nack","Oliv"]

http://localhost:3000/products?keywords=["adidas"]
