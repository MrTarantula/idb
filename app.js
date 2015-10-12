var express = require('express');
var app = module.exports.app = exports.app = express();

app.use(express.static(__dirname + '/build'));

app.get('*', function (req, res) {
    res.sendfile(__dirname + '/build/index.html'); // load our public/index.html file
});

app.listen(8080);
console.log("App listening on port 8080");
