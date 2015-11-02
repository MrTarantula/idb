var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        select: false
    },
    displayName: String,
    picture: String,
    facebook: String,
    foursquare: String,
    google: String,
    github: String,
    instagram: String,
    linkedin: String,
    live: String,
    yahoo: String,
    twitter: String,
    twitch: String
});

module.exports = mongoose.model('User', userSchema);
