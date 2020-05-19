'use strict';

var response = require('./response');
var service = require('./service')

exports.index = function(req, res) {
    return response.ok("Hello Home!", res)
}

exports.postShorten = function(req, res) {
    // validate input
    if (!req.body.url) {
        return response.badRequest("url is required", res);
    }

    if (!req.body.shortcode) {
        return response.badRequest("shortcode is required", res)
    }

    let shortcodePattern = new RegExp("^[0-9a-zA-Z_]{6}$");
    if (!shortcodePattern.test(req.body.shortcode)) {
        return response.badRequest("invalid shortcode pattern", res);
    }

    let payload = new Object();
    payload.url = req.body.url;
    payload.code = req.body.shortcode;

    let check = service.StoreShortenURL(payload)
    if (check) {
        // already exists
    }

    // continue process
    return response.ok("Still on progress", res)
}

exports.getURLFromShortcode = function(req, res) {
    // to-do
    return response.ok("Hello Shortcode: " + req.params.shortcode, res)
}