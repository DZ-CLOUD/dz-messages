const express = require('express');
const router = express.Router();

const channelRouter = require('./v1/channels/channels');
const testRouter = require("./v1/test/test")
const authRouter = require('./v1/auth/auth');
const gameRouter = require('./v1/game/game');
const userRouter = require("./v1/users/user");
const daycareRouter = require("./v1/daycare/daycare");

const { protectedAPI } = require('../middleware/verifyToken');

router.use("/test", testRouter);
router.use("/game", gameRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/daycare", daycareRouter);

// TODO: Add user validation middleware to verify if the user is in the channel or have write permissions
router.use("/channels", protectedAPI, channelRouter);


module.exports = router;