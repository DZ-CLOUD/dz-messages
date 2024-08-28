const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionAuthSchema = new Schema({
    sid: { type: String, required: true },
    uid: { type: String, required: true },
    clid: { type: String, required: true },
    device: { type: String, required: true },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    status: { type: String, required: true },
    method: { type: String, required: true },
}, { timestamps: true });

const sessionAuth = mongoose.model('sessionAuth', sessionAuthSchema);

module.exports = sessionAuth;