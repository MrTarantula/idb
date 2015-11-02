var mongoose = require('mongoose');
var api = require('./api');

module.exports = function (app) {

    //routes
    mongoose.connect('mongodb://localhost/ideabox');

    app.get('/api/ideas', api.ideas);
    app.get('/api/ideas/:id', api.idea);
    app.post('api/ideas', api.createIdea);
    app.delete('/api/ideas/:id', api.deleteIdea);

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/build/index.html');
    });

};
