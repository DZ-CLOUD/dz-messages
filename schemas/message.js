const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageContentSchema = new Schema({
    value: { type: String, required: true },
    poll: {
        settings: {
            onlyOneAnswer: { type: Boolean },
            timeBasedPoll: { type: Boolean },
            timeDuration: { type: Date }
        },
        title: { type: String },
        options: []
    },
    attachment: {
        type: { type: Number, enum:[0,1,2,3,4]},
        attachmentUrl: { type: String },
        attachmentAlt: { type: String },

    }
})

const MessageSchema = new Schema({
    id: { type: String, required: true },
    type: { type: Number, required: true },
    content: MessageContentSchema,
    author: { type: String, required: true },
    date: { type: Date, required: true },
    channel: { type: String, required: true },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;