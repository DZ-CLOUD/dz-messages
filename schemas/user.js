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
    id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    security: {
        password: { type: String, required: true },
    },
    personal: {
        avatar: { type: String, required: true },
        biography: { type: String, required: true },
        pronouns: { type: String, required: true },
        banner: { type: String, required: true },
        avatarOverlay: { type: String, required: true },
        bannerOverlay: { type: String, required: true },
        profileOverlay: { type: String, required: true },
        accentColor: { type: String, required: true },
        backgroundColor: { type: String, required: true },
    },
    settings: {
        theme: { type: String, default: 'light' },
        language: { type: String, default: 'en' },
        notifications: { type: Boolean, default: true },
        notificationPreferences:[notificationPreferenceSchema],
        privacy: { type: Boolean, required: true },
        status: { type: String, default: 'online' },
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;