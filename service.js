'use strict';

var repository = require('./repository')

exports.StoreShortenURL = function(payload) {
    // check code exists
    let check = repository.checkCodeExists(payload.shortcode)
    console.log(check)
    
    if (!check) {
        return "code already exists";
    }

    return check;
}