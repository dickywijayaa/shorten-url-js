'use strict';

var response = require('../helpers/response');
var service = require('../services/service');
var constants = require('../helpers/constants')

exports.index = function(req, res) {
    return response.ok("Hello World!", res)
}

exports.postShorten = async function(req, res) {
    try {
        // validate input
        if (!req.body.url) {
            return response.badRequest(constants.REQUIRED_URL_INPUT, res);
        }

        if (!req.body.url.startsWith("http://") && !req.body.url.startsWith("https://")) {
            return response.badRequest(constants.INVALID_URL_PREFIX, res);
        }

        if (!req.body.shortcode) {
            return response.badRequest(constants.REQUIRED_SHORTCODE_INPUT, res)
        }

        let shortcodePattern = new RegExp("^[0-9a-zA-Z_]{6}$");
        if (!shortcodePattern.test(req.body.shortcode)) {
            return response.badRequest(constants.INVALID_REGEX_SHORTCODE_INPUT, res);
        }

        let payload = {
            url: req.body.url,
            code: req.body.shortcode
        }

        let result = await service.StoreShortenURL(payload)
        if (result.status_code == constants.HTTP_UNPROCESSABLE_ENTITY) {
            return response.unprocessableEntity(result.message, res)
        }

        return response.ok(result.data, res)
        
    } catch(e) {
        console.log(e)
        return response.internalServerError(res)
    }
}

exports.getURLFromShortcode = async function(req, res) {
    try {
        let result = await service.FetchURLByCode(req.params.shortcode)
        if (result.status_code == constants.HTTP_UNPROCESSABLE_ENTITY) {
            return response.unprocessableEntity(result.message, res)
        }

        return res.redirect(result.data)
    } catch(e) {
        console.log(e)
        return response.internalServerError(res)
    }
}