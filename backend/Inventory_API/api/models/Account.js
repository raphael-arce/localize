'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var AccountSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

AccountSchema.statics.authenticate = function (email, password, callback) {
    Account.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                let err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback(err);
                }
            })
        });
};

AccountSchema.pre('save', function (next) {
    var account = this;
    bcrypt.hash(account.password, 10, function (err, hash){
        if (err) {
            return next(err);
        }
        account.password = hash;
        next();
    })
});

let Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
