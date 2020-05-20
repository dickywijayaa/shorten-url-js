'use strict'

var connection = require('../database/connection');
var TABLE_NAME = 'shorten';
var query, values;

function checkCodeExists(code) {
    return new Promise(resolve => {
        query = 'SELECT count(*) as count FROM ' + TABLE_NAME + ' WHERE shortcode = ?';
        values = [code]
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
    return new Promise((resolve, reject) => {
        query = 'INSERT INTO ' + TABLE_NAME + '(url, shortcode) VALUES(?, ?)';
        values = [payload.url, payload.code]
        connection.query(query, values, function (error, rows, fields){
            if(error){
                console.log(error)
                reject(error)
            } else{
                resolve(rows);
            }
        });
    });
}

function getURLFromCode(code) {
    return new Promise((resolve, reject) => {
        query = 'SELECT id, url, redirect_count FROM ' + TABLE_NAME + ' WHERE shortcode = ?';
        values = [code]
        connection.query(query, values, function (error, rows, fields){
            if(error){
                console.log(error)
                reject(error)
            } else{
                resolve(rows);
            }
        });
    });
}

function updateLastSeen(data) {
    return new Promise((resolve, reject) => {
        let current_date = new Date();
        let count = data[0].redirect_count + 1;
        
        query = 'UPDATE ' + TABLE_NAME + ' SET redirect_count = ?, last_seen_date = ? WHERE id = ?';
        values = [count, current_date, data[0].id]
        
        connection.query(query, values, function (error, rows, fields){
            if(error){
                console.log(error)
                reject(error)
            } else{
                resolve(rows);
            }
        });
    });
}

module.exports = {
    checkCodeExists,
    storeShortcode,
    getURLFromCode,
    updateLastSeen
}