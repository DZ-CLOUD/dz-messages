const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attachmentSchema = new Schema({
    id: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    proxy_url: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    content_type: { type: String, required: true },
    placeholder: { type: String, required: true },
    placeholder_version: { type: Number, required: true },
});

const reactionSchema = new Schema({
    emoji: {
        id: { type: String, default: null },
        name: { type: String, required: true },
    },
    count: { type: Number, required: true },
    count_details: {
        burst: { type: Number, required: true },
        normal: { type: Number, required: true }
    },
    burst_colors: { type: Array, default: [] },
    me_burst: { type: Boolean, required: true },
    burst_me: { type: Boolean, required: true },
    me: { type: Boolean, required: true },
    burst_count: { type: Number, required: true }
});

const fieldsSchema = new Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
    inline: { type: Boolean, required: true }
});

const embeddedSchema = new Schema({
    type: { type: String, required: true, enum: ["rich", "link"] },
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: Number, required: true },
    fields: [fieldsSchema],
    thumbnail: {
        url: { type: String, required: true },
        proxy_url: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true }
    },
    footer: {
        text: { type: String, required: true },
        icon_url: { type: String, default: null }
    }
});

const MessageSchema = new Schema({
    mid: { type: String, required: true },
    cid: { type: String, ref: "Channel", required: true },
    type: { type: Number, required: true },
    attachments: [attachmentSchema],
    reactions: [reactionSchema],
    content: { type: String, required: true },
    author: { type: String, required: true },
    timestamp: { type: Date, default: Date.now() },
    mentions: [],
    mention_roles: [],
    embeds: [embeddedSchema],
    flags: 0,
    components: [],
    pinned: false,
    mention_everyone: false,
    tts: false,
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;