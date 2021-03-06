require('dotenv').config()

var express = require('express'),
    app = express(),
    port = process.env.APP_PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./routes/route');
routes(app);

app.listen(port);
console.log('API server started on: ' + port);