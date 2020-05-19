'use strict'

var connection = require('../database/connection');

function checkCodeExists(code) {
    return new Promise(resolve => {
        var query = 'SELECT count(*) as count FROM shorten WHERE shortcode = ?';
        let values = [code]
        connection.query(query, values, function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                resolve(rows);
            }
        });
    });
}

function storeShortcode(payload) {
    return new Promise(resolve => {
        var query = 'INSERT INTO shorten(url, shortcode) VALUES(?, ?)';
        let values = [payload.url, payload.code]
        connection.query(query, values, function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                resolve(rows);
            }
        });
    });
}

function getURLFromCode(code) {
    return new Promise(resolve => {
        var query = 'SELECT url FROM shorten WHERE shortcode = ?';
        let values = [code]
        connection.query(query, values, function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                resolve(rows);
            }
        });
    });
}

module.exports = {
    checkCodeExists,
    storeShortcode,
    getURLFromCode
}