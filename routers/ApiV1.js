const mongoose = require('mongoose');
const express = require('express');
const { resCode, resJSON } = require('../functions/response');
const router = express.Router();
const channelRouter = require('./channels/channels');
const authRouter = require('./auth/auth');
const { protectedAPI } = require('../middleware/verifyToken');
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


router.use("/auth", authRouter);
router.use("/channels", protectedAPI, channelRouter);


module.exports = router;