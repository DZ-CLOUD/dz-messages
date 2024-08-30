const express = require('express');
const i18n = require('i18n');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const uuid = require('uuid');
const ejs = require('ejs');
const busboy = require('busboy');
const fileUpload = require('express-fileupload');
const path = require('path');
require("dotenv").config();

const {resCode, resRender, resSend, resRedirect} = require('./functions/response');
const apiV1 = require('./routers/ApiV1');
const {protected} = require('./middleware/verifyToken');

require("dotenv").config();

const User = require('./schemas/user');
const Channel = require('./schemas/channel');

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({createParentPath: true, limits: {fileSize: 2 * 1024 * 1024}}));
app.use(cookieParser());
app.set("view engine", "ejs");
app.disable("x-powered-by");

// Configure i18n
i18n.configure({
    locales: ['en-US', 'de-DE'], // Add more locales as needed
    directory: __dirname + '/locales', // Specify the directory for your language files
    defaultLocale: 'en',
    cookie: 'lang',
});

app.use(i18n.init);

// Verbindungsaufbau zur Datenbank
const dbUrl = "mongodb://127.0.0.1:27017/dz-messages"
mongoose.connect(dbUrl);

// Überprüfe die Verbindungsstatus
const db = mongoose.connection;
db.on('error', () => {
    throw new Error("Failed to connect to MongoDB:\n Problems can be IP-Adress is invalid");
});
db.once('open', () => {
    console.log('Verbindung zur MongoDB hergestellt!');
});

//Main
app.get("/", (req, res) => {
    try {
        resRedirect(res, 200, "/login");
    } catch (error) {
        console.error(error);
        resCode(res, 500)
    }
});

app.get("/register", (req, res) => {
    try {
        resRender(res, 200, "register");
    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

app.get("/login", (req, res) => {
    try {
        res.cookie("lang", req.headers['accept-language'].split(",")[0]);
        if (!req.cookies.clid) {
            res.cookie("clid", uuid.v4(), {httpOnly: true});
        }
        resRender(res, 200, "login");
    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

app.get("/chat", protected, async (req, res) => {
    const {uid} = req.cookies;
    const {blocked, archived, muted} = req.query === true ? req.query : false;
    const page = "home"

    try {
        const user = await User.findOne({uid});
        if (!user) {
            return resCode(res, 404);
        }

        const channels = await Channel.find({owner: user.uid, member: {$elemMatch: {uid: user.uid}}});
        const channels_main = await Channel.find({member: {$elemMatch: {uid: user.uid, blocked, archived, muted}}});

        resRender(res, 200, "chat", {user, channels, channels_main, page});
    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

app.get("/chat/:cid", protected, async (req, res) => {
    const {cid} = req.params;
    const {uid} = req.cookies;
    const page = "chat"

    try {
        const user = await User.findOne({uid});
        if (!user) {
            return resCode(res, 404);
        }

        const channels = await Channel.find({owner: user.uid, member: {$elemMatch: {uid: user.uid}}});
        const channel_focus = await Channel.findOne({cid});
        if (!channel_focus) {
            return resRedirect(res, 404, "/chat");
        }


        resRender(res, 200, "chat", {user, channels, channel_focus, page})
    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

app.get("/add-friend", async (req, res) => {
    const {uid} = req.cookies;
    const page = "addFriend"
    try {
        const user = await User.findOne({uid});
        if (!user) {
            return resCode(res, 404);
        }

        const channels = await Channel.find({owner: user.uid, member: {$elemMatch: {uid: user.uid}}});

        resRender(res, 200, "chat", {user, channels, page});
    } catch (err) {
        console.error(err);
    }
});

app.get("/logout", (req, res) => {
    try {
        resRedirect(res, 200, "/api/v1/auth/logout");
    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

app.use("/api/v1", apiV1);

app.use((req, res) => {
    resRedirect(res, 404, "/chat");
});


app.listen(3000, () => {
    console.log("Server started!");
});
