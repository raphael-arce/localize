

var mongoose = require('mongoose'),
    Account = mongoose.model('Account');


exports.register = function(req, res) {
    if (req.body.email && req.body.password) {
        let accountData = {
            email: req.body.email,
            password: req.body.password,
        };

        Account.create(accountData, function (error, account) {
            if (error || !account) {
                console.log(error);
                const msg = { error: error.message };
                res.status(401).send(msg);
            } else {
                //req.session.userId = account.email;
                res.send('{"message": "success"}')
            }
        });
    }
    else {
        const msg = { error: 'All fields are required' };
        res.status(400).send(msg);
    }
};

exports.login = function(req, res) {

    if (req.body.email && req.body.password) {
        Account.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error || !user) {
                const msg = { error: "Wrong email or password." };
                res.status(401).send(msg);
            } else {
                req.session.userId = user.email; // <-- SESSION IS SET HERE
                res.send('{"message": "success"}');
            }
        });
    } else {
        const msg = { error: 'All fields required.'  };
        res.status(400).send(msg);
    }
};

exports.logout = function(req, res) {
    if (req.session && req.session.userId) {
        req.session.destroy(function(err) {
            if(err) {
                res.send(JSON.stringify({error: err.message}))
            } else {
                res.send('{"message": "success"}')
            }
        });
    } else {
        res.send('{"error":"not logged in"}')
    }
};

exports.authenticationcheck = function(req, res) {
    if(req.session && req.session.userId) {
        res.send('{"message": true}')
    } else {
        res.send('{"message": false}')
    }
};
