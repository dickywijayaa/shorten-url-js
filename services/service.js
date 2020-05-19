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
    payload.id = insert.insertId

    result.status_code = constants.HTTP_STATUS_OK;
    result.data = payload
    return result;
}

exports.FetchURLByCode = async function(code) {
    let data = await repository.getURLFromCode(code)

    if (data.length == 0) {
        result.status_code = constants.HTTP_UNPROCESSABLE_ENTITY
        result.message = constants.SHORTCODE_NOT_EXISTS_IN_DATABASE
        return result
    }

    result.status_code = constants.HTTP_STATUS_OK
    result.data = data[0].url
    return result
}