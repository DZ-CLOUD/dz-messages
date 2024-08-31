const express = require('express');
const router = express.Router();
const cors = require("cors")

const channelRouter = require('./v1/channels/channels');
const testRouter = require("./v1/test/test")
const authRouter = require('./v1/auth/auth');
const gameRouter = require('./v1/game/game');

const { protectedAPI } = require('../middleware/verifyToken');

const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.use("/test", testRouter)
router.use("/game", gameRouter);
router.use("/auth", authRouter);

// TODO: Add user validation middleware to verify if the user is in the channel or have write permissions
router.use("/channels", protectedAPI, channelRouter);


module.exports = router;