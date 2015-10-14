var express = require('express');
var mongoose = require('mongoose');

var app = module.exports.app = exports.app = express();

app.use(express.static(__dirname + '/build'));

require('./routes/routes')(app);

app.listen(8080);
console.log("App listening on port 8080");
