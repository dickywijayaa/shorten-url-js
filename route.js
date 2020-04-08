'use strict';

module.exports = function(app) {
    var ctrl = require('./controller')
    
    app.route('/').get(ctrl.index)
    app.route('/users').get(ctrl.users)
    app.route('/shorten').post(ctrl.shorten)
}