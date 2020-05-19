'use strict';

// HTTP Status Code
var HTTP_STATUS_OK = 200;
var HTTP_STATUS_BAD_REQUEST = 400;
var HTTP_UNPROCESSABLE_ENTITY = 422;
var HTTP_INTERNAL_SERVER_ERROR = 500;

// Response Messages
var INTERNAL_SERVER_ERROR_DEFAULT_MESSAGE = "something went wrong";
var REQUIRED_URL_INPUT = "url is required";
var REQUIRED_SHORTCODE_INPUT = "shortcode is required";
var INVALID_REGEX_SHORTCODE_INPUT = "invalid shortcode pattern";
var SHORTCODE_ALREADY_EXISTS_IN_DATABASE = "code already exists in database.";

module.exports = {
    HTTP_STATUS_OK,
    HTTP_STATUS_BAD_REQUEST,
    HTTP_UNPROCESSABLE_ENTITY,
    HTTP_INTERNAL_SERVER_ERROR,
    INTERNAL_SERVER_ERROR_DEFAULT_MESSAGE,
    REQUIRED_URL_INPUT,
    REQUIRED_SHORTCODE_INPUT,
    INVALID_REGEX_SHORTCODE_INPUT,
    SHORTCODE_ALREADY_EXISTS_IN_DATABASE
}