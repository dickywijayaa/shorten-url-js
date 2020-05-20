'use strict';

var response = require('../helpers/response');
var service = require('../services/service');
var constants = require('../helpers/constants')

exports.index = (req, res) => {
    return response.ok("Hello World!", res)
}

exports.postShorten = (req, res) => {
    // validate input
    if (!req.body.url) {
        return response.badRequest(constants.REQUIRED_URL_INPUT, res);
    }

    if (!req.body.url.startsWith("http://") && !req.body.url.startsWith("https://")) {
        return response.badRequest(constants.INVALID_URL_PREFIX, res);
    }

    if (!req.body.shortcode) {
        return response.badRequest(constants.REQUIRED_SHORTCODE_INPUT, res);
    }

    let shortcodePattern = new RegExp("^[0-9a-zA-Z_]{6}$");
    if (!shortcodePattern.test(req.body.shortcode)) {
        return response.badRequest(constants.INVALID_REGEX_SHORTCODE_INPUT, res);
    }

    let payload = {
        url: req.body.url,
        code: req.body.shortcode
    }

    return service.StoreShortenURL(payload)
        .then(result => {
            if (result.status_code == constants.HTTP_UNPROCESSABLE_ENTITY) {
                return response.unprocessableEntity(result.message, res);
            }
    
            return response.ok(result.data, res);
        })
        .catch(error => {
            console.log(error);
            return response.internalServerError(res);
        });
}

exports.getURLFromShortcode = (req, res) => {
    return service.FetchURLByCode(req.params.shortcode)
        .then(result => {
            if (result.status_code == constants.HTTP_UNPROCESSABLE_ENTITY) {
                return response.unprocessableEntity(result.message, res);
            }

            return res.redirect(result.data);
        })
        .catch(error => {
            console.log(error);
            return response.internalServerError(res);
        });
}