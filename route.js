'use strict';

module.exports = function(app) {
    var ctrl = require('./controller')
    
    app.route('/').get(ctrl.index)
    app.route('/:shortcode').get(ctrl.getURLFromShortcode)
    app.route('/shorten').post(ctrl.postShorten)
}