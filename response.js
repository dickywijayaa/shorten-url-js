'use strict';

var constants = require('./constants')

exports.ok = function(data, res) {
    var response = {
        'data': data
    };
    res.status(constants.HTTP_STATUS_OK).json(response);
    res.end();
};

exports.badRequest = function(message, res) {
    var response = {
        'message': message
    };
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(response);
    res.end();
};

exports.unprocessableEntity = function(message, res) {
    var response = {
        'message': message
    };
    res.status(constants.HTTP_UNPROCESSABLE_ENTITY).json(response);
    res.end();
};

exports.internalServerError = function(res) {
    var response = {
        'message': constants.INTERNAL_SERVER_ERROR_DEFAULT_MESSAGE,
    };
    res.status(constants.HTTP_INTERNAL_SERVER_ERROR).json(response);
    res.end();
};