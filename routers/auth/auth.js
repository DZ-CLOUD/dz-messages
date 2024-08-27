const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { resCode, resJSON } = require('../../functions/response');
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
})


module.exports = router