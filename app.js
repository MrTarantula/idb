var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ideaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    likes: Number,
    likedBy: [Schema.Types.ObjectId],
    userId: String,
    timestamp: Date,
    comments: [{
        userId: Schema.Types.ObjectId,
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        timestamp: Date
    }]

});

var userSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    admin: Boolean
});

var Idea = mongoose.model('Idea', ideaSchema);
var User = mongoose.model('Idea', userSchema);

/*****https://github.com/fdietz/recipes-with-angular-js-examples/tree/master/chapter10/recipe1/contacts*/

mongoose.connect('mongodb://localhost/ideabox');

var app = module.exports.app = exports.app = express();

app.use(express.static(__dirname + '/build'));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/build/index.html'); // load our public/index.html file
});

app.listen(8080);
console.log("App listening on port 8080");
