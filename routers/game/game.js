const express = require('express');
const { resCode, resJSON } = require('../../functions/response');
const router = express.Router();
const Game = require('../../schemas/game');

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


module.exports = router;
