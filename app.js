var express = require('express');
var api = require('./routes/api');

mongoose.connect('mongodb://localhost/ideabox');

var app = module.exports.app = exports.app = express();

app.use(express.static(__dirname + '/build'));
app.use(app.router);

app.get('/api/ideas', api.ideas);
app.get('/api/ideas/:id', api.idea);
app.post('api/ideas', api.createIdea);
app.delete('/api/ideas/:id', api.deleteIdea);

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});

app.listen(8080);
console.log("App listening on port 8080");
