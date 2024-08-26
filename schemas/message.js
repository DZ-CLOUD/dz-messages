const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    id: {type: String, required: true },
    content: {type: String, required: true },
    author: {type: String, required: true },
    date: {type: Date, required: true },
    channel: {type: String, required: true },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;