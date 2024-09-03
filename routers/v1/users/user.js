const express = require("express");
const { resCode} = require("../../../functions/response");
const User = require("../../../schemas/user");
const router = express.Router();

router.get("/:uid", async (req, res) => {
    const {uid} = req.params;
    try {
        const user = await User.findOne({uid});
        if (!user) {
            return resCode(res, 404);
        }
        
        
    } catch (e) {
        console.error(e);
        resCode(res, 500);
        
    }
});

module.exports = router;