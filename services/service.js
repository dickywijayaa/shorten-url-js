'use strict';

var repository = require('../repositories/repository')
var constants = require('../helpers/constants')

var result = {
    status_code: constants.HTTP_INTERNAL_SERVER_ERROR,
    message: constants.INTERNAL_SERVER_ERROR_DEFAULT_MESSAGE,
    data: []
}

exports.StoreShortenURL = async function(payload) {
    // check code exists
    return repository.checkCodeExists(payload.code)
        .then(function(check) {
            if (check && check[0].count > 0) {
                result.status_code = constants.HTTP_UNPROCESSABLE_ENTITY;
                result.message = constants.SHORTCODE_ALREADY_EXISTS_IN_DATABASE;
                return result;
            }
        
            return repository.storeShortcode(payload)
                .then(function(insert) {
                    payload.id = insert.insertId;
        
                    result.status_code = constants.HTTP_STATUS_OK;
                    result.data = payload;
                    return result;
                });
        })
        .catch(function(error) {
            console.log(error);
            return result;
        });
}

exports.FetchURLByCode = async function(code) {
    return repository.getURLFromCode(code)
        .then(function(data) {
            if (data.length == 0) {
                result.status_code = constants.HTTP_UNPROCESSABLE_ENTITY;
                result.message = constants.SHORTCODE_NOT_EXISTS_IN_DATABASE;
                return result;
            }

            result.status_code = constants.HTTP_STATUS_OK;
            result.data = data[0].url;
            return result;
        }).catch(function(error) {
            console.log(error);
            return result;
        });
}