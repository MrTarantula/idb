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

exports.ideas = function (req, res) {
    Idea.find({}, function (err, obj) {
        res.json(obj)
    });
};

var Idea = mongoose.model('Idea', ideaSchema);
var User = mongoose.model('Idea', userSchema);


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
/*****https://github.com/fdietz/recipes-with-angular-js-examples/tree/master/chapter10/recipe1/contacts*/
