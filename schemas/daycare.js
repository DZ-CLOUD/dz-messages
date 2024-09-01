const mongoose = require('mongoose');
const {events} = require('./channel');
const Schema = mongoose.Schema;


const daycarePropertiesSchema = new Schema({
    client_track_timestamp: {type: Number, required: true},
    client_heartbeat_session_id: {type: String, required: true},
    guild_id: {type: String, ref: 'Guild', default: null},
    channel_id: {type: String, ref: 'Channel', required: true},
    channel_type: {type: Number, enum: [0, 1, 2, 3], required: true}, // Assuming 3 represents a voice channel
    rtc_connection_id: {type: String, required: true},
    context: {type: String, required: true},
    voice_backend_version: {type: String, required: true},
    rtc_worker_backend_version: {type: String, required: true},
    hostname: {type: String, required: true},
    port: {type: Number, required: true},
    cloudflare_best_region: {type: String, required: true},
    connect_time: {type: Number, required: true},
    connect_count: {type: Number, required: true},
    audio_subsystem: {type: String, required: true},
    audio_layer: {type: String, required: true},
    media_session_id: {type: String, default: null},
    state_awaiting_endpoint_ms: {type: Number, required: true},
    state_authenticating_ms: {type: Number, required: true},
    state_connecting_ms: {type: Number, required: true},
    state_disconnected_ms: {type: Number, required: true},
    state_ice_checking_ms: {type: Number, required: true},
    state_no_route_ms: {type: Number, required: true},
    state_rtc_connecting_ms: {type: Number, required: true},
    state_rtc_disconnected_ms: {type: Number, required: true},
    client_performance_cpu: {type: Number, required: true},
    client_performance_memory: {type: Number, required: true},
    cpu_core_count: {type: Number, required: true},
    accessibility_features: {type: Number, required: true},
    rendered_locale: {type: String, required: true},
    uptime_app: {type: Number, required: true},
    uptime_process_renderer: {type: Number, required: true},
    client_rtc_state: {type: String, required: true},
    client_app_state: {type: String, required: true},
    client_uuid: {type: String, required: true},
    client_send_timestamp: {type: Number, required: true},
    effect_type: {type: String, required: true},
    effect_detail: {type: String, required: true},
    effect_state: {type: String, required: true},
    voice_state_count: {type: Number, required: true},
    video_stream_count: {type: Number, required: true},
    is_animated: {type: Boolean, required: true},
    location: {type: String, required: true},
    location_page: {type: String, required: true},
    impression_type: {type: String, required: true},
    channel_member_perms: {type: String, required: true},
    total_participants: {type: Number, required: true},
    channel_size_total: {type: Number, required: true},
    is_afk_channel: {type: Boolean, required: true},
    channel_hidden: {type: Boolean, required: true},
    location_section: {type: String, required: true},
    can_invite: {type: Boolean, required: true},
    channel_user_limit: {type: Number, required: true},
    video_layout: {type: String, required: true},
    video_enabled: {type: Boolean, required: true},
    game_name: {type: String, required: true},
    type: {type: String, required: true},
    number_of_users: {type: Number, required: true},
    duration_ms: {type: Number, required: true},
    channel_bitrate: {type: Number, required: true},
    duration: {type: Number, required: true},
    game_platform: {type: String, required: true},
    view_mode_grid_duration_ms: {type: Number, required: true},
    view_mode_focus_duration_ms: {type: Number, required: true},
    view_mode_toggle_count: {type: Number, required: true},
    available_video_decoders: [String],
    available_video_encoders: [String],
})

const eventSchema = new Schema({
    type: {type: String, required: true},
    properties: daycarePropertiesSchema
});


const daycareSchema = new Schema({
    token: {type: String, required: true},
    events: [eventSchema]
});