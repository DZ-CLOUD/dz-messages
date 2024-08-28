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
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    security: {
        password: { type: String, required: true },
    },
    personal: {
        avatar: { type: String, required: true },
        biography: { type: String, default: "" },
        pronouns: { type: String, default: "" },
        banner: { type: String, default: "" },
        avatarOverlay: { type: String, default: "" },
        bannerOverlay: { type: String, default: "" },
        profileOverlay: { type: String, default: "" },
        accentColor: { type: String, default: "#5351c5" },
        backgroundColor: { type: String, default: "#a9a9a9" },
    },
    settings: {
        theme: { type: String, default: 'light' },
        language: { type: String, default: 'en' },
        notifications: { type: Boolean, default: true },
        notificationPreferences:[notificationPreferenceSchema],
        privacy: { type: Boolean, required: true },
        shareStatus: { type: Boolean, required: true },
        status: { type: String, default: 'online' },
        sharePlayStatus: { type: Boolean, required: true },
        playStatus: {
            gameId: { type: String, default: "" },
            gameStatus: { type: String, default: "" },
            gameTime: { type: Date, default: Date.now() }
        }
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;