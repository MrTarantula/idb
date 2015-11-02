var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = module.exports.app = exports.app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(__dirname + '/../client/build'));

require('./routes/routes')(app);
require('./auth')(app);

app.listen(8080);
console.log("App listening on port 8080");
