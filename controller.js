'use strict';

var response = require('./response');
var connection = require('./connection');

exports.users = function(req, res) {
    connection.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            response.ok(result.rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello Home!", res)
}

exports.shorten = function(req, res) {
    // to-do
    response.ok("Hello Home!", res)
}