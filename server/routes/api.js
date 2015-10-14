var Idea = require('../models/Idea');
var User = require('../models/User');

exports.ideas = function (req, res) {
    Idea.find({}, function (err, obj) {
        res.json(obj)
    });
};

exports.idea = function (req, res) {
    Idea.findOne({
        _id: req.params.id
    }, function (err, obj) {
        res.json(obj);
    });
};

exports.createIdea = function (req, res) {
    var idea = new Idea(req.body);
    idea.save();
    res.json(req.body);
};

exports.deleteIdea = function (req, res) {
    Idea.remove({
        _id: req.params.id
    }, function (err) {
        res.json(true);
    });
};

exports.register = function (req, res) {
    User.register(new User({
        username: req.body.username
    }), req.body.password, function (err, account) {
        if (err) {
            return res.render('/', {
                user: user
            });
        }
        User.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
};

exports.login = function (req, res, next) {

    User.authenticate()(req.body.username, req.body.password, function (err, user, options) {
        if (err) return next(err);
        if (user === false) {
            res.send({
                message: options.message,
                success: false
            });
        } else {
            req.login(user, function (err) {
                res.send({
                    success: true,
                    user: user
                });
            });
        }
    });

};

exports.getLogin = function (req, res) {
    console.log(req.user);
    if (req.user) {
        return res.send({
            success: true,
            user: req.user
        });
    }
    res.send({
        success: false,
        message: 'not authorized'
    });
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};
