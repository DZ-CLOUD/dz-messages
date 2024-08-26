const { write } = require('fs');
const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    uid: {type: String, required: true },
    joined: {type: Date, required: true },
    role: {type: String, required: true },
    permissions: {
        write: {type: Boolean, default: true },
        read: {type: Boolean, default: true },
        delete: {type: Boolean, default: true },
        edit: {type: Boolean, default: true },
        addMember: {type: Boolean, default: true },
        removeMember: {type: Boolean, default: true },
    },
});

const ChannelSchema = new Schema({
    id: {type: String, required: true },
    type: {type: String, required: true },
    name: {type: String, required: true },
    readOnly: {type: Boolean, required: true },
    owner: {type: String, required: true },
    description: {type: String, required: true },
    member: [MemberSchema],
});

const Channel = mongoose.model('Channel', ChannelSchema);

module.exports = Channel;