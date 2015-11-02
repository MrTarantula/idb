var Idea = require('../models/Idea');

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
