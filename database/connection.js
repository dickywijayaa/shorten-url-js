var mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config();

var client = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

client.connect(function(err) {
  if (err) throw err;
  console.log("Database connected in server : ", process.env.DB_HOST);
});

module.exports = client