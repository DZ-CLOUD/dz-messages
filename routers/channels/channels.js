const mongoose = require('mongoose');
const express = require('express');
const { resCode, resJSON } = require('../../functions/response');
const router = express.Router();

router.get("/:cid/messages/:mid", (req, res) => {
    const { cid, mid } = req.params;
    try {
        resJSON(res, "success", 200, {
            cid,
            mid
        })
    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

module.exports = router;