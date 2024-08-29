const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationPreferenceSchema = new Schema({
    type: { type: String, required: true },
    key: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: String, required: true },
    enabled: { type: Boolean, required: true },
})

const UserSchema = new Schema({
    uid: { type: String, required: true },
    username: { type: String, required: true },
    display_name: { type: String, required: true },
    email: { type: String, required: true },
    security: {
        password: { type: String, required: true },
    },
    personal: {
        avatar: { type: String, required: true },
        avatar_overlay: { type: String, default: "" },
        biography: { type: String, default: "" },
        pronouns: { type: String, default: "" },
        banner: { type: String, default: null },
        banner_color: { type: String, default: "#5351c5" },
        banner_overlay: { type: String, default: "" },
        profile_overlay: { type: String, default: "" },
        accent_color: { type: String, default: "#5351c5" },
        background_color: { type: String, default: "#2c2c2c" },
    },
    settings: {
        theme: { type: String, default: 'light' },
        language: { type: String, default: 'en' },
        notifications: { type: Boolean, default: true },
        notification_preferences:[notificationPreferenceSchema],
        privacy: { type: Boolean, required: true },
        shareStatus: { type: Boolean, default: true },
        status: { type: String, default: 'online' },
        sharePlayStatus: { type: Boolean, default: true },
        playStatus: {
            gameId: { type: String, default: "" },
            gameStatus: { type: String, default: "" },
            gameTime: { type: Date, default: Date.now() }
        }
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;