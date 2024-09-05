const express = require('express');
const { resCode, resJSON } = require('../../../functions/response');
const router = express.Router();
const uuid = require("uuid")
const path = require("path")
const Game = require('../../../schemas/game');


router.get("/", async (req, res) => {
    try {
        const games = await Game.find();
        resJSON(res, "success", 200, games);
    } catch (error) {
        console.error(error);
        resCode(res, 500);
    }
});

router.get("/:gid", async (req, res) => {
    const { gid } = req.params;
    try {
        const game = await Game.findOne({ gid });
        if (!game) {
            return resCode(res, 404);
        }
        resJSON(res, "success", 200, game);
    } catch (error) {
        console.error(error);
        resCode(res, 500);
    }
});

router.get("/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const game = await Game.findOne({ name });
        if (!game) {
            return resCode(res, 404);
        }
        res.setHeader("Content-Type", "image/png")
    } catch (error) {
        console.error(error);
        resCode(res, 500);
    }
})

router.post("/create", async (req,res) => {
    const { name } = req.body;
    const { icon } = req.files;

    try {
        if (!name || !icon) {
            return resCode(res, 400);
        }

        const existingGame = await Game.findOne({name});
        if (existingGame){ return resCode(res, 400, "Game already exists!")};
        const gid = uuid.v4();

        const gameDirectory = path.join(__dirname, '/../../usercontent/games', gid);
        const gameIconFilePath = path.join(gameDirectory, 'icon.webp');
        const publicGameIconPath = `/games/${gid}/icon.webp`;
        await icon.mv(gameIconFilePath);

        const newGame = new Game({
            gid,
            name,
            icon: publicGameIconPath,
        });
        await newGame.save();
        return resCode(res, 200, newGame);
    } catch (e) {
        console.error(e);
        resCode(res, 500);
    }
})

module.exports = router;
