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
        id: { type: String, required: true },
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

const embededSchema = new Schema({
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
    cid: { type: String, required: true },
    type: { type: Number, required: true },
    attachments: [attachmentSchema],
    reactions: [reactionSchema],
    content: { type: String, required: true },
    author: { type: String, required: true },
    timestamp: { type: Date, default: Date.now() },
    mentions: [],
    mention_roles: [],
    embeds: [embededSchema],
    flags: 0,
    components: [],
    pinned: false,
    mention_everyone: false,
    tts: false,

    "author": {
        "id": "639535606040625153",
        "username": "donnerfranzel55",
        "avatar": "9b3aaf28e5ab12662c12a55eade10a3d",
        "discriminator": "0",
        "public_flags": 64,
        "flags": 64,
        "banner": null,
        "accent_color": 12534852,
        "global_name": "DonnerFranzel55",
        "avatar_decoration_data": null,
        "banner_color": "#bf4444",
        "clan": null
    },
    "nonce": "1278700460408045568"

}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;