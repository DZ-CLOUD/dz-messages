const express = require('express');
const router = express.Router();
const channelRouter = require('./channels/channels');
const testRouter = require("./test/test")
const authRouter = require('./auth/auth');
const gameRouter = require('./game/game');
const { protectedAPI } = require('../middleware/verifyToken');
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.use("/test", testRouter)
router.use("/game", gameRouter);
router.use("/auth", authRouter);
router.use("/channels", protectedAPI, channelRouter);


module.exports = router;