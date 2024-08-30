var MESSAGE_TYPE;
(function (MESSAGE_TYPE) {
    MESSAGE_TYPE[MESSAGE_TYPE["TEXT"] = 0] = "TEXT";
    MESSAGE_TYPE[MESSAGE_TYPE["ATTACHMENT"] = 1] = "ATTACHMENT";
    MESSAGE_TYPE[MESSAGE_TYPE["POLL"] = 2] = "POLL";
    MESSAGE_TYPE[MESSAGE_TYPE["EMBETTED"] = 3] = "EMBETTED";
})(MESSAGE_TYPE || (MESSAGE_TYPE = {}));
var ATTACHMENT_TYPE;
(function (ATTACHMENT_TYPE) {
    ATTACHMENT_TYPE[ATTACHMENT_TYPE["IMAGE"] = 0] = "IMAGE";
    ATTACHMENT_TYPE[ATTACHMENT_TYPE["VIDEO"] = 1] = "VIDEO";
    ATTACHMENT_TYPE[ATTACHMENT_TYPE["STICKER"] = 2] = "STICKER";
    ATTACHMENT_TYPE[ATTACHMENT_TYPE["GIF"] = 3] = "GIF";
})(ATTACHMENT_TYPE || (ATTACHMENT_TYPE = {}));
function loadMessagesFromChannel(cid) {
    fetch(`http://localhost:3000/api/v1/channels/${cid}/messages`)
        .then(res => res.json())
        .then(data => {
        console.log(data);
    })
        .catch(err => {
        console.log(err);
    });
}
function loadMemberFromChannel(cid) {
    fetch(`http://localhost:3000/api/v1/channels/${cid}/member`)
        .then(res => res.json())
        .then(data => {
        console.log(data);
    })
        .catch(err => {
        console.log(err);
    });
}
function loadChannelsFromUser(uid) {
    fetch(`http://localhost:3000/api/v1/users/${uid}/channels`)
        .then(res => res.json())
        .then(data => {
        console.log(data);
    })
        .catch(err => {
        console.log(err);
    });
}
//# sourceMappingURL=app.js.map