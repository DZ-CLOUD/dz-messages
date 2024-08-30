const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const app = express();
const { resCode, resJSON, resRedirect } = require('../../functions/response');
const router = express.Router();
const User = require('../../schemas/user');


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userAgnetHeader = req.headers['user-agent'];
    const { clid } = req.cookies;

    if (!clid) {
        return resRedirect(res, 401, "/login");
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return resCode(res, 404)
        }

        const isPasswordValid = await bcrypt.compare(password, user.security.password);
        if (!isPasswordValid) {
            return resCode(res, 401, "E-Mail or Password is incorrect!");
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '96d' });


        // Return the JWT to the client
        if (userAgnetHeader.includes("postman") || userAgnetHeader.includes("curl") || userAgnetHeader.includes("insomnia")) {
            return resJSON(res, "success", 200, {
                email,
                token
            });
        }
        res.cookie("token", token, { httpOnly: true, path: "/", maxAge: 2 * 24 * 60 * 60 * 1000 });
        res.cookie("uid", user.uid, { httpOnly: true, path: "/", maxAge: 2 * 24 * 60 * 60 * 1000 });
        return resRedirect(res, 200, "/chat");

    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

router.post("/register", async (req, res) => {
    const { username, email, password, confirmPassword, display_name } = req.body;
    const userAgentHeader = req.headers['user-agent'];

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

        // Return a success response
        if (!userAgentHeader.includes("postman") || !userAgentHeader.includes("curl") || !userAgentHeader.includes("insomnia")) {
            resRedirect(res, 200, "/login");
        } else {
            resJSON(res, "success", 201, "User is registered successfully!");
        }
    } catch (err) {
        console.error(err);
        resCode(res, 500);

    }
});

router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token");
        res.clearCookie("uid");
        if (!req.headers['user-agent'].includes("postman") || !req.headers['user-agent'].includes("curl") || !req.headers['user-agent'].includes("insomnia")) {
            return resRedirect(res, 200, "/");
        }
        return resJSON(res, "success", 200, "User is logged out successfully!");
    } catch (error) {
        console.error(error);
        resCode(res, 500);
    }

})

module.exports = router