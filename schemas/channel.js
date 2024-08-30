const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    uid: { type: String, required: true },
    joined: { type: Date, required: true },
    role: { type: String, required: true },
    blocked: { type: Boolean, default: false },
    muted: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
    permissions: {
        write: { type: Boolean, default: true },
        read: { type: Boolean, default: true },
        delete: { type: Boolean, default: true },
        edit: { type: Boolean, default: true },
        add_member: { type: Boolean, default: true },
        remove_member: { type: Boolean, default: true },
        export: { type: Boolean, default: true },
    },
});

const ChannelSchema = new Schema({
    cid: { type: String, required: true },
    pid: { type: String, default: null },
    guild_id: { type: String, ref: "Server", default: null },
    type: { type: Number, required: true, enum: [0, 1, 2, 3] },
    name: { type: String, required: true },
    read_only: { type: Boolean, default: false },
    position: { type: Number, default: 0 },
    owner: { type: String, required: true },
    description: { type: String, default: null },
    nsfw: { type: Boolean, required: true },
    icon: { type: String, required: true },
    bitrate: { type: Number, default: 64000 },
    user_limit: { type: Number, default: 0 },
    rate_limit_per_user: { type: Number, default: 0 },
    lastMessageId: { type: String, default: null },
    members: [MemberSchema],
});

const Channel = mongoose.model('Channel', ChannelSchema);

module.exports = Channel;