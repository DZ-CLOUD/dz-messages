const mongoose = require('mongoose');
const express = require('express');
const uuid = require("uuid")
const { resCode, resJSON } = require('../../../functions/response');
const Channel = require("../../../schemas/channel");
const Message = require("../../../schemas/message");
const User = require("../../../schemas/user");
const router = express.Router();

router.get("/:cid", async (req, res) => {
    const { cid } = req.params
    try {
        const channel = await Channel.findOne({ cid });
        if (!channel) {
            return resCode(res, 404);
        }
        resJSON(res, "success", 200, {
            cid,
            channel
        })
    } catch (err) {
        console.error(err);
        resCode(res, 500)

    }
});

router.get("/:cid/messages", async (req, res) => {
    const { cid } = req.params;
    const { limit = 50 } = req.query;
    try {
        const messages = await Message.find({ cid }).limit(limit);
        if (!messages) {
            return resCode(res, 404);
        }
        resJSON(res, "success", 200, {
            cid,
            messages
        })
    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

router.post("/:cid/messages", async (req, res) => {
    const { cid } = req.params;
    const { uid, content, attachments, poll } = req.body;
    let type = 0;
    try {
        const channel = await Channel.findOne({ cid });
        if (!channel) {
            return resCode(res, 404, "Channel not found");
        }
        const author = await User.findOne({ uid }).select("uid display_name username avatar");
        if (!author) {
            return resCode(res, 404, "User not found");
        }

        if (!content) {
            return resCode(res, 400, "message is required");
        }
        const mid = uuid.v4();
        const newMessage = new Message({
            type,
            cid,
            mid,
            nonce: mid,
            content,
            attachments,
            poll,
            author,
            timestamp: Date.now(),
        });
        await newMessage.save();

        resJSON(res, "success", 201, {
            cid,
            mid,
            
        })
    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

router.put("/:cid/messages/:mid", async (req, res) => {
    const { cid, mid } = req.params
    const { content, attachments, poll } = req.body;
    try {
        const channel = await Channel.findOne({cid});
        if (!channel) {
            return resCode(res, 404);
        }
        const message = await Message.findOne({mid, cid});
        if (!message) {
            return resCode(res, 404);
        }
        message.content = content;
        message.attachments = attachments;
        message.poll = poll;
        message.edited_timestamp = Date.now();
        await message.save();

        resJSON(res, "success", 200, {
            cid,
            mid,
            message
        })
    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

router.get("/:cid/messages/:mid", async (req, res) => {
    const { cid, mid } = req.params;
    try {
        const message = await Message.findOne({ mid, cid });
        if (!message) {
            return resCode(res, 404);
        }
        resJSON(res, "success", 200, {
            cid,
            mid,
            message
        })
    } catch (err) {
        console.error(err);
        resCode(res, 500);
    }
});

router.get("/:cid/member", async (req, res) => {
    const { cid } = req.params
    try {
        const channelMembers = await Channel.findOne({ cid }).select("members");
        if (!channelMembers) {
            return resCode(res, 404);
        }
        const membersIds = channelMembers.members;
        const members = await User.find({ uid: { $in: membersIds.map(member => member.uid) } }).select("display_name username avatar play_status status");

        resJSON(res, "success", 200, {
            cid,
            members
        })
    } catch (err) {
        console.error(err);
        resCode(res, 500)

    }
});

router.get("/:cid/member/:uid", async (req, res) => {
    const { cid, uid } = req.params
    try {
        const channel = await Channel.findOne({ cid }).select("members");
        if (!channel) {
            return resCode(res, 404);
        }
        const member = channel.members.find(member => member.uid === uid);
        if (!member) {
            return resCode(res, 404);
        }
        resJSON(res, "success", 200, {
            cid,
            uid,
            member
        })
    } catch (err) {
        console.error(err);
        resCode(res, 500)

    }
});

router.post("/create", (req, res) => {
    let { name, members, owner, nsfw, type } = req.body;

    try {
        if (members.length === 1) {
            type = 0;
        }
        const newChannel = new Channel({
            cid: uuid.v4(),
            name,
            members,
            type,
            owner,
            nsfw,
            icon: "/img/profilePictures/default.webp",
        });
        newChannel.save();
        resJSON(res, "success", 200, {
            newChannel
        })
    } catch (err) {
        console.error(err);
        resCode(res, 500)
    }
});

module.exports = router;