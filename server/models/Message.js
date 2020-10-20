const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageModel = new Schema({
    user: {
        type: String
    },
    data: {
        type: String
    },
    isComment: {
        type: Boolean
    },
    threadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    isDeleted: {
        type: Boolean
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
}, {
    timestamps: true
});
var Message = mongoose.model('Message', MessageModel);
module.exports = Message;
