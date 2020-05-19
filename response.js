'use strict';

exports.ok = function(data, res) {
    var response = {
        'data': data
    };
    res.status(200).json(response);
    res.end();
};

exports.badRequest = function(message, res) {
    var response = {
        'message': message
    };
    res.status(400).json(response);
    res.end();
};