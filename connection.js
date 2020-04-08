const { Client } = require('pg')
const connectionString = 'postgresql://dickywijaya:@127.0.0.1:5432/go_graphql_db'

var client = new Client({
  connectionString: connectionString,
})

client.connect()

module.exports = client