const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    gid: { type: String, required: true },
    guild_id: { type: String, ref: "Guild", required: true},
    name: { type: String, required: true },
    icon: { type: String, required: true },
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;