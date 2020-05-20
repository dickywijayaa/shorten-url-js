'use strict';

var repository = require('../repositories/repository')
var constants = require('../helpers/constants')

var response = {
    status_code: constants.HTTP_INTERNAL_SERVER_ERROR,
    message: constants.INTERNAL_SERVER_ERROR_DEFAULT_MESSAGE,
    data: []
}

exports.StoreShortenURL = (payload) => {
    return new Promise((resolve, reject) => {
        // check code exists
        return repository.checkCodeExists(payload.code)
        .then(check => {
            if (check && check[0].count > 0) {
                response.status_code = constants.HTTP_UNPROCESSABLE_ENTITY;
                response.message = constants.SHORTCODE_ALREADY_EXISTS_IN_DATABASE;
                resolve(response);
            }

            return repository.storeShortcode(payload)
                .then(insert => {
                    payload.id = insert.insertId;

                    response.status_code = constants.HTTP_STATUS_OK;
                    response.data = payload;
                    resolve(response);
                });
        })
        .catch(error => {
            reject(error);
        });
    });
}

exports.FetchURLByCode = (code) => {
    return new Promise((resolve, reject) => {
        repository.getURLFromCode(code)
            .then(data => {
                if (data.length == 0) {
                    response.status_code = constants.HTTP_UNPROCESSABLE_ENTITY;
                    response.message = constants.SHORTCODE_NOT_EXISTS_IN_DATABASE;
                    resolve(response);
                }

                // update last seen and count
                return repository.updateLastSeen(data)
                .then(result => {
                    if (result.affectedRows < 1) {
                        console.log(constants.FAILED_UPDATE_SHORTCODE_STATS);
                    }

                    response.status_code = constants.HTTP_STATUS_OK;
                    response.data = data[0].url;
                    resolve(response);
                })
            }).catch(error => {
                reject(error)
            });
        });
}