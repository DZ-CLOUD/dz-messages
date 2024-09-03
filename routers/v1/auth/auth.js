const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { resCode, resJSON } = require('../../../functions/response');
const router = express.Router();
const User = require('../../../schemas/user');



router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!password) {
        return resCode(res, 400, "No password is provided")
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return resCode(res, 404, "No user found!");
        }

        const isPasswordValid = await bcrypt.compare(password, user.settings.security.password);
        if (!isPasswordValid) {
            return resCode(res, 401, "E-Mail or Password is incorrect!");
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '96d' });
        const did = uuid.v4();
        const clid = uuid.v4();
        const sid = uuid.v4();
        const uid = user.uid;

        const deviceObj = {
            did,
            clid,
            csid: sid,
            is_mfa: false,
            is_bot: false,
            client_info: {
                os: req.headers["user-agent"],
                ip: req.ip,
                platform: "API LOGIN",
            },
        }

        user.devices.push(deviceObj);
        await user.save();

        // Return the JWT to the client
        return resJSON(res, "success", 200, {
            email,
            token,
            uid,
            sid,
            clid,
            did
        });
    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

router.post("/register", async (req, res) => {
    const { username, email, password, confirmPassword, display_name, client_version } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        const existingDisplayName = await User.findOne({ display_name });
        if (existingUser || existingDisplayName) {
            // Return a conflict if the user exists
            return resCode(res, 409);
        }

        // Check if the passwords match
        if (password !== confirmPassword) {
            return resCode(res, 400);
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));

        let avatar = "/img/profilePictures/default.webp";

        // Create a new user object
        let timezoneOffset = new Date(req.headers["Date"]).getTimezoneOffset();

        const newUser = new User({
            uid: uuid.v4(),
            username,
            display_name,
            email,
            ip: req.ip,
            settings: {
                profile: {
                    avatar,
                    avatar_hash: uuid.v7(),
                },
                security: {
                    password: hashedPassword
                },
                privacy: {
                    privacy: true
                },
                localization: {
                    locate: req.language,
                    timezoneOffset
                },
                versions: {
                    clientVersion: process.env.CLIENT_VERSION,
                }
            },
        });
        // Save the user in the user collection
        await newUser.save();
        resJSON(res, "success", 201, "User is registered successfully!");
    } catch
    (err) {
        console.error(err);
        resCode(res, 500);

    }
});

router.get("/logout", async (req, res) => {
    try {
        return resJSON(res, "success", 200, "User is logged out successfully!");
    } catch (error) {
        console.error(error);
        resCode(res, 500);
    }

});

module.exports = router;