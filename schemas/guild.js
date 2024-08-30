const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    uid: { type: String, required: true },
    joined: { type: Date, required: true },
    roles: { type: String, default: [] },
});
    


const serverSchema = new Schema({
    name: { type: String, required: true },
    guild_id: { type: String, required: true},
    location: { type: String, required: true },
    status: { type: String, default: "online" },
    owner: { type: String, required: true },
    access_url: { type: String, required: true },
    icon: { type: String, required: true },
    members: [memberSchema],
    channels: { type: Array, ref: "Channel", default: [] },
    roles: { type: Array, default: [] },
    permissions: { type: Array, default: [] },
    settings: { type: Array, default: [] },
}, { timestamps: true });

const Server = mongoose.model('Server', serverSchema);

module.exports = Server;
