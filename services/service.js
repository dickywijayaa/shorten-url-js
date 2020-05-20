'use strict';

var repository = require('../repositories/repository')
var constants = require('../helpers/constants')

var response = {
    status_code: constants.HTTP_INTERNAL_SERVER_ERROR,
    message: constants.INTERNAL_SERVER_ERROR_DEFAULT_MESSAGE,
    data: []
}

exports.StoreShortenURL = (payload) => {
    // check code exists
    return repository.checkCodeExists(payload.code)
        .then(check => {
            if (check && check[0].count > 0) {
                response.status_code = constants.HTTP_UNPROCESSABLE_ENTITY;
                response.message = constants.SHORTCODE_ALREADY_EXISTS_IN_DATABASE;
                return response;
            }

            return repository.storeShortcode(payload)
                .then(insert => {
                    payload.id = insert.insertId;

                    response.status_code = constants.HTTP_STATUS_OK;
                    response.data = payload;
                    return response;
                });
        })
        .catch(error => {
            console.log(error);
            return response;
        });
}

exports.FetchURLByCode = (code) => {
    return repository.getURLFromCode(code)
        .then(data => {
            if (data.length == 0) {
                response.status_code = constants.HTTP_UNPROCESSABLE_ENTITY;
                response.message = constants.SHORTCODE_NOT_EXISTS_IN_DATABASE;
                return response;
            }

            // update last seen and count
            return repository.updateLastSeen(data)
            .then(result => {
                if (result.affectedRows < 1) {
                    console.log(constants.FAILED_UPDATE_SHORTCODE_STATS);
                }

                response.status_code = constants.HTTP_STATUS_OK;
                response.data = data[0].url;
                return response;
            })
        }).catch(error => {
            console.log(error);
            return response;
        });
}