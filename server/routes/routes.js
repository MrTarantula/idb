var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var api = require('./api');
var User = require('../models/User');

module.exports = function (app) {

    //initialize passport
    passport.use(User.createStrategy());
    // use static serialize and deserialize of model for passport session support
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    //need this according to passport guide
    app.use(cookieParser());
    app.use(session({
        secret: 'thisisasecret',
        saveUninitialized: true,
        resave: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    //routes
    mongoose.connect('mongodb://localhost/ideabox');

    app.get('/api/ideas', api.ideas);
    app.get('/api/ideas/:id', api.idea);
    app.post('api/ideas', api.createIdea);
    app.delete('/api/ideas/:id', api.deleteIdea);

    app.post('/register', api.register);
    app.post('/login', api.login);
    app.get('/getlogin', api.getLogin);
    app.get('/logout', api.logout);
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/build/index.html');
    });

};
