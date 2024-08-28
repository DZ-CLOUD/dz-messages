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

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return resCode(res, 404)
        }

        const isPasswordValid = await bcrypt.compare(password, user.security.password);
        if (!isPasswordValid) {
            return resCode(res, 401);
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '96d' });

        // Return the JWT to the client
        resJSON(res, "success", 200, {
            email,
            token
        });

    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const userAgentHeader = req.headers['user-agent'];

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return resCode(res, 409);
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            uid: uuid.v4(),
            username,
            email,
            personal: {
                avatar: "/img/profilePictures/default.webp"
            },
            security: {
                password: hashedPassword
            },
            settings: {
                privacy: true
            }
        });

        await newUser.save();

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


module.exports = router