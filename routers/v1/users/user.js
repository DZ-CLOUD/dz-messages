const express = require("express");
const {resCode, resJSON} = require("../../../functions/response");
const User = require("../../../schemas/user");
const Channel = require("../../../schemas/channel");
const router = express.Router();

router.get("/:uid", async (req, res) => {
    const {uid} = req.params;
    try {
        const user = await User.findOne({uid}).select("display_name username settings.profile.avatar settings.status.status");
        if (!user) {
            return resCode(res, 404);
        }

        const avatar = user.settings.profile.avatar;
        const username = user.username;
        const display_name = user.display_name;
        const status = user.settings.status.status;

        resJSON(res, "success", 200, {
            avatar,
            username,
            display_name,
            status
        })


    } catch (e) {
        console.error(e);
        resCode(res, 500);

    }
});

router.get("/:uid/channels", async (req, res) => {
    const {uid} = req.params;
    try {
        const user = await User.findOne({uid});
        if (!user) {
            return resCode(res, 404);
        }

        const channels = await Channel.find({owner: uid});
        if (!channels){
            return resCode(res, 404, "Channel does not exist.")
        }

        resJSON(res, "success", 200, {channels})
    } catch (e) {
        console.error(e);
        resCode(res, 500);

    }
});


module.exports = router;