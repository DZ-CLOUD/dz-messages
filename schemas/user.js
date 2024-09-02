const mongoose = require('mongoose');
const {randomHexCode} = require("../functions/random")
const Schema = mongoose.Schema;

const notificationPreferenceSchema = new Schema({
    type: {type: String, required: true},
    key: {type: String, required: true},
    description: {type: String, required: true},
    value: {type: String, required: true},
    enabled: {type: Boolean, required: true},
});

const badgeSchema = new Schema({
    id: {type: String, required: true},
    description: {type: String, required: true},
    icon: {type: String, required: true},
    link: {type: String, required: true},
})

const connectionSchema = new Schema({
    friend_sync: {type: Boolean, default: true},
    type: {type: String, required: true},
    integrations: {type: Array, default: []},
    id: {type: String, required: true},
    name: {type: String, required: true},
    verified: {type: String, default: true},
    metadata_visibility: {type: Boolean, default: true},
    metadata: {type: Schema.Types.Mixed, default: null},
    revoked: {type: Boolean, default: false},
    show_activity: {type: Boolean, default: true},
    two_way_link: {type: Boolean, default: true},
    visibility: {type: Number, default: 1},
    access_token: {type: String, default: undefined},
});

const userActivityApplicationStatisticsSchema = new Schema({
    application_id: {type: String, required: true},
    last_played_at: {type: Date, required: true},
    first_played_at: {
        type: String, default: null,
        total_duration: {type: Number, required: true},
        total_sku_duration: {type: Number, required: true},
    }
});

const entitlementsSchema = new Schema({
    id: {type: String, required: true},
    sku_id: {type: String, required: true},
    application_id: {type: String, required: true},
    user_id: {type: String, required: true},
    promotion_id: {type: String, default: null},
    type: {type: Number, required: true},
    deleted: {type: Boolean, required: true},
    gift_code_flags: {type: Number, default: 0},
    ends_at: {type: Date, default: null},
    sku_name: {type: String, required: true},
})

const userAudioContextSettingsSchema = new Schema({
    uid: {type: String, required: true},
    volume: {type: Number, default: 100.0},
    lastModified: {type: Date, default: Date.now()},
});

const userStreamAudioContextSettingsSchema = new Schema({
    uid: {type: String, required: true},
    volume: {type: Number, default: 100.0},
    lastModified: {type: Date, default: Date.now()},
});

const relationshipSchema = new Schema({
    uid: {type: String, required: true},
    nickname: {type: String, default: null},
    is_spam_request: {type: Boolean, default: false},
    type: {type: String, required: true, enum: ["FRIEND"]}
})

const deviceSchema = new Schema({
    did: {type: String, required: true},
    clid: {type: String, required: true},
    created_at: {type: Date, default: Date.now()},
    expires_at: {type: Date, default: Date.now() + 15 * 60 * 60 * 24 * 1000}, // 15 days
    is_mfa:{type: Boolean, required: true},
    is_bot: {type: Boolean, required: true},
    approx_last_used_time: {type: Date, default: Date.now()},
    client_info:{
        os: {type: String, required: true},
        ip: {type: String, required: true},
        platform: {type: String, required: true},
    },

})

const UserSchema = new Schema({
    uid: {type: String, required: true},

    username: {type: String, required: true},
    display_name: {type: String, required: true},

    discriminator: {type: Number, default: 0},
    verified: {type: Boolean, default: false},

    email: {type: String, required: true},
    needs_email_verification: {type: Boolean, default: true},
    phone: {type: String, default: ""},
    has_mobile: {type: Boolean, default: false},

    premium_until: {type: Date, default: null},

    flags: {type: Number, default: null},
    public_flags: {type: Number, default: 0},

    temp_banned_until: {type: Date, default: null},

    ip: {type: String, required: true},

    user_activity_application_statistics: [userActivityApplicationStatisticsSchema],
    entitlements: [entitlementsSchema],

    devices: [deviceSchema],
    settings: {
        profile: {
            avatar: {type: String, required: true},
            avatar_hash: {type: String, required: true},
            avatar_overlay: {type: String, default: null},
            avatar_decoration_data: {type: Array, default: null},
            biography: {type: String, default: null},
            pronouns: {type: String, default: null},
            banner: {type: String, default: null},
            banner_color: {type: String, default: randomHexCode},
            banner_overlay: {type: String, default: null},
            profile_overlay: {type: String, default: null},
            accent_color: {type: String, default: randomHexCode},
        },
        status: {
            status: {type: String, default: 'online'},
            showCurrrentGame: {type: Boolean, default: true},
        },
        play_status: {
            gameId: {type: String, default: ""},
            gameStatus: {type: String, default: ""},
            gameTime: {type: Date, default: ""},
        },
        security: {
            password: {type: String, required: true},
            password_updated: {type: Date, default: Date.now()},
        },
        localization: {
            locate: {type: String, required: true},
            timezoneOffset: {type: String, required: true}
        },
        appearance: {
            theme: {type: String, default: 'light'},
        },
        features: {
            developerMode: {type: Boolean, default: false},
        },
        notifications: {
            notifications: {type: Boolean, default: true},
            notification_preferences: [notificationPreferenceSchema],
            showInAppNotifications: {type: Boolean, default: false},
            notifyFriendsOnGoLive: {type: Boolean, default: false},
        },
        privacy: {
            privacy: {type: Boolean, required: true},

            shareStatus: {type: Boolean, default: true},
            sharePlayStatus: {type: Boolean, default: true},

            detectPlatformAccounts: {type: Boolean, default: true},
            passwordless: {type: Boolean, default: false},
            contactSyncEnabled: {type: Boolean, default: false},
            friendSourceFlags: {type: Number, default: 0},
            friendDiscoveryFlags: {type: Number, default: 0},
            dropsOptedOut: {type: Boolean, default: false},
            hideLegacyUsername: {type: Boolean, default: false},
        },
        versions: {
            clientVersion: {type: String, required: true},
        },
        voiceAndVideo: {
            alwaysPreviewVideo: {type: Boolean, default: false},
            afkTimeout: {type: Number, default: 600},
            streamNotificationsEnabled: {type: Boolean, default: true},
            nativePhoneIntegrationEnabled: {type: Boolean, default: true},
            soundboardSetttings: {
                volume: {type: Number, default: 100.0}
            }
        },
        textAndImages: {
            diversitySurrogate: {type: String, default: ""},
            emojiPickerCollapsedSections: {type: Array, default: []},
            inlineAttachmentMedia: {type: Boolean, default: true},
            inlineEmbedMedia: {type: Boolean, default: true},
            gifAutoPlay: {type: Boolean, default: true},
            renderEmbeds: {type: Boolean, default: true},
            renderReactions: {type: Boolean, default: true},
            animateEmoji: {type: Boolean, default: true},
            animateStickers: {type: Number, default: 0},
            enableTtsCommand: {type: Boolean, default: true},
            messageDisplayCompact: {type: Boolean, default: false},
            explicitContentFilter: {type: Number, default: 1},
            viewNsfwGuilds: {type: Boolean, default: false},
            convertEmoticons: {type: Boolean, default: true},
            expressionSuggestionsEnabled: {type: Boolean, default: false},
            viewNsfwCommands: {type: Boolean, default: false},
            soundboardPickerCollapsedSections: []
        },
        gameLibrary: {
            disableGameTab: {type: Boolean, default: false},
        },
        debug: {type: Object, default: {}},
        audioContextSettings: {
            user: [userAudioContextSettingsSchema],
            stream: [userStreamAudioContextSettingsSchema]
        },
    },
    connected_accounts: [connectionSchema],
    premium_since: {type: Date, default: null},
    premium_type: {type: Number, default: null},
    premium_guild_since: {type: Date, default: null},
    profile_themes_experiment_bucket: {type: Number, default: 0},
    relationships: [relationshipSchema],
    badges: [badgeSchema],
    guild_badges: [badgeSchema],
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;