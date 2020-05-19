'use strict'

var connection = require('./connection');

var checkCodeExists = function (code) {
    return new Promise((resolve, reject) => {
        let text = 'SELECT * FROM shorty WHERE shortcode = $1'
        let values = [code]

        connection.query(text, values, (err, res) => {
            if (err) {
                return reject(err)
            }
            resolve(res)
        })
    });
}

module.exports = {
    checkCodeExists
}