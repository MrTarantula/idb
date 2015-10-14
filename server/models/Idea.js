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

module.exports = mongoose.model('Idea', ideaSchema);
