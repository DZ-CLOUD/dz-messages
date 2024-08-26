const mongoose = require('mongoose');
const express = require('express');
const { resCode, resJSON } = require('../functions/response');
const router = express.Router();
const channelRouter = require('./channels/channels');

router.use("/channels", channelRouter);


module.exports = router;