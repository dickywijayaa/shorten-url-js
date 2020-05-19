const { Client } = require('pg')
const connectionString = 'postgresql://' + process.env.DB_USERNAME + ':@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;

var client = new Client({
  connectionString: connectionString,
})

client.connect()

module.exports = client