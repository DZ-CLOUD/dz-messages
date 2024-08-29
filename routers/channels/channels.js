const mongoose = require('mongoose');
const express = require('express');
const uuid = require("uuid")
const { resCode, resJSON } = require('../../functions/response');
const router = express.Router();

router.get("/:cid", (req, res) => {
    const { cid } = req.params
    try {
        resJSON(res, "success", 200, {
            cid
        })
    } catch (err) {
        console.error(err);
        resCode(res, 500)

    }
});

router.get("/:cid/messages/", (req, res) => {
    const { cid } = req.params;
    const { limit = 50 } = req.query;
    try {
        resJSON(res, "success", 200, {
            cid,
            messages: []
        })
    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

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

router.get("/:cid/member", (req, res) => {
    const { cid } = req.params
    try {
        resJSON(res, "success", 200, {
            cid,
            members: []
        })
    } catch (err) {
        console.error(err);
        resCode(res, 500)

    }
});

router.get("/:cid/member/:uid", (req, res) => {
    const { cid, uid } = req.params
    try {
        resJSON(res, "success", 200, {
            cid,
            uid,
        })
    } catch (err) {
        console.error(err);
        resCode(res, 500)

    }
});

router.post("/create", (req, res) => {
    let {name, member, type } = req.body;

    try{
        if (member.length === 1){
            type = 0;
        }
        const newChannel = new Channel({
            name,
            member,
            type
        })
    } catch (err) {
        console.error(err);
        resCode(res, 500)
    }
});
module.exports = router;