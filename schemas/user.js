const mongoose = require('mongoose');
const { randomHexCode } = require("../functions/random")
const Schema = mongoose.Schema;

const notificationPreferenceSchema = new Schema({
    type: { type: String, required: true },
    key: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: String, required: true },
    enabled: { type: Boolean, required: true },
});

const badgeSchema = new Schema({
    id: { type: String, required: true},
    description: { type: String, required: true},
    icon: { type: String, required: true},
    link: { type: String, required: true},
})

const connectionSchema = new Schema({
    type: { type: String, required: true},
    id: { type: String, required: true},
    name: { type: String, required: true},
    verified: { type: String, default: true},
    metadata: { type: Schema.Types.Mixed, default: null}
});

const UserSchema = new Schema({
    uid: { type: String, required: true },
    username: { type: String, required: true },
    display_name: { type: String, required: true },
    email: { type: String, required: true },
    security: {
        password: { type: String, required: true },
    },
    avatar: { type: String, required: true },
    avatar_overlay: { type: String, default: null },
    avatar_decoration_data: { type: Array, default: null},
    biography: { type: String, default: null },
    pronouns: { type: String, default: null },
    banner: { type: String, default: null },
    banner_color: { type: String, default: randomHexCode },
    banner_overlay: { type: String, default: null },
    profile_overlay: { type: String, default: null },
    accent_color: { type: String, default: randomHexCode },
    public_flags: { type: Number, default: 0 },
    status: { type: String, default: 'online' },
    playStatus: {
        gameId: { type: String, default: "" },
        gameStatus: { type: String, default: "" },
        gameTime: { type: Date, default: Date.now() }
    },
    settings: {
        theme: { type: String, default: 'light' },
        language: { type: String, default: 'en' },
        notifications: { type: Boolean, default: true },
        notification_preferences:[notificationPreferenceSchema],
        privacy: { type: Boolean, required: true },
        shareStatus: { type: Boolean, default: true },
        sharePlayStatus: { type: Boolean, default: true },
    },
    flags: { type: Number, default: null},
    bio: { type: String, default: null},
    connected_accounts: [connectionSchema],
    premium_since: { type: Date, default: null},
    premium_type: { type: Number, default: null},
    premium_guild_since: { type: Date, default: null},
    profile_themes_experiment_bucket: { type: Number, default: null},
    badges: [badgeSchema],
    guild_badges: [badgeSchema],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;