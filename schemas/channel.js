const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    uid: {type: String, required: true },
    joined: {type: Date, required: true },
    role: {type: String, required: true },
    blocked: {type: Boolean, required: true },
    muted: {type: Boolean, required: true },
    archived: {type: Boolean, required: true },
    permissions: {
        write: {type: Boolean, default: true },
        read: {type: Boolean, default: true },
        delete: {type: Boolean, default: true },
        edit: {type: Boolean, default: true },
        addMember: {type: Boolean, default: true },
        removeMember: {type: Boolean, default: true },
        export: {type: Boolean, default: true },
    },
});

const ChannelSchema = new Schema({
    cid: {type: String, required: true },
    type: {type: Number, required: true, enum: [0,1,2,3] },
    name: {type: String, required: true },
    readOnly: {type: Boolean, required: true },
    owner: {type: String, required: true },
    description: {type: String, required: true },
    nsfw: {type: Boolean, required: true },
    icon: {type: String, required: true },
    bitrate: {type: Number, default: null },
    lastMessageId: {type: String, default: null },
    member: [MemberSchema],
});

const Channel = mongoose.model('Channel', ChannelSchema);

module.exports = Channel;