const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const app = express();
const {resCode, resJSON, resRedirect, resSend} = require('../../../functions/response');
const router = express.Router();
const User = require('../../../schemas/user');


router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const {clid} = req.cookies;

    if (!clid) {
        return resCode(res, 400, "Missing Client ID");
    }

    try {
        const user = await User.findOne({email});
        if (!user) {
            return resCode(res, 404)
        }

        const isPasswordValid = await bcrypt.compare(password, user.security.password);
        if (!isPasswordValid) {
            return resCode(res, 401, "E-Mail or Password is incorrect!");
        }

        const token = jwt.sign({userId: user._id, username: user.username}, process.env.SECRET_KEY, {expiresIn: '96d'});
        const uid = user.uid;
        const sid = uuid.v4();

        // Return the JWT to the client

        return resJSON(res, "success", 200, {
            email,
            token,
            uid,
            sid,
        });
    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

router.post("/register", async (req, res) => {
    const {username, email, password, confirmPassword, display_name} = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({email});
        const existingDisplayName = await User.findOne({display_name});
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

        // Create a new user object
        const newUser = new User({
            uid: uuid.v4(),
            username,
            display_name,
            email,
            avatar: "/img/profilePictures/default.webp",
            security: {
                password: hashedPassword
            },
            settings: {
                privacy: true
            }
        });

        // Save the user in the user collection
        await newUser.save();
        resJSON(res, "success", 201, "User is registered successfully!");
    } catch (err) {
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

})

module.exports = router