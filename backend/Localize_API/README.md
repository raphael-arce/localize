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



### Queries

Query a product by keywords: http://localhost:8000/localize?keywords=["KEYWORD1","KEYWORD2"]

Query a product by id: http://localhost:8000/localize?id={productId}

Examples: 

http://localhost:8000/localize?id=702754936412

http://localhost:8000/localize?keywords=["Nack","Oliv"]

http://localhost:8000/localize?keywords=["adidas"]
