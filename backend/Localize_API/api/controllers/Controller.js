'use strict';


var mongoose = require('mongoose'),
    Shop = mongoose.model('Shop'),
    Promise = require('promise');
const request = require('request');


/**
 * function to look for products using keywords (or not)
 * @param request
 * @param response
 */
exports.find = function(req, res) {
    //begin with finding the shopInfo
    Shop.find({},function(shopErr, shopInfos){

        let results = [];
        let promises = [];
        console.log(shopInfos);
        if(shopErr) //if there is an error, forward it to the requester
            res.send(shopErr);

        if(!shopInfos) {
            res.send("no shop info");
        }

        //if there are keywords to look for, use them
        if(req.query.keywords) {


            for(let i = 0; i < shopInfos.length; i++) {

                let shopInfo = shopInfos[i]._doc;
                let url = shopInfo.API + "/products?keywords=" + req.query.keywords;
                //console.log(url);

                let p = new Promise((resolve,reject) => {
                    console.log("hi!");
                    console.log(url);

                    request.get(url, (err, apiResponse, body) => {
                        if(err)
                            reject(err.message);

                        if(body)
                            shopInfo.inventory = JSON.parse(body);
                        results.push(shopInfo);
                        resolve();
                    });

                });
                promises.push(p);
            }

            Promise.all(promises)
                .catch(function(err) {
                    console.log('A promise failed to resolve:', err)
                    return promises
                })
                .then((values) => {
                    console.log(values);
                    res.json(results);
                })

        }

        if(req.query.id) {

            for(let i = 0; i < shopInfos.length; i++) {

                let shopInfo = shopInfos[i]._doc;
                let url = shopInfo.API + "/products/" + req.query.id;
                //console.log(url);

                let p = new Promise((resolve,reject) => {
                    //console.log("hi!");
                    console.log(url);

                    request.get(url, (err, apiResponse, body) => {
                        if(err)
                            reject(err.message);

                        if(body)
                            shopInfo.inventory = JSON.parse(body);
                        results.push(shopInfo);
                        resolve();
                    });

                });
                promises.push(p);
            }

            Promise.all(promises).then(() => {
                res.json(results);
            }).catch(function(err) {
                res.send(err);
            })
        }

    })
};
