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
    let check = await repository.checkCodeExists(payload.code)

    if (check && check[0].count > 0) {
        result.status_code = constants.HTTP_UNPROCESSABLE_ENTITY;
        result.message = constants.SHORTCODE_ALREADY_EXISTS_IN_DATABASE;
        return result;
    }

    let insert = await repository.storeShortcode(payload)
    if (!insert) {
        // insert is undefined, error should be console logged at repository
        throw "failed when insert to database";
    }

    payload.id = insert.insertId

    result.status_code = constants.HTTP_STATUS_OK;
    result.data = payload
    return result;
}