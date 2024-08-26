/**
 * An enum to set the single message types.
 */
enum MESSAGE_TYPE { TEXT, ATTACHMENT, POLL, EMBETTED }

/**
 * This enum sets the type for the ATTACHMENT type
 */
enum ATTACHMENT_TYPE { IMAGE, VIDEO, STICKER, GIF }

/**
 * This function loads all messages from the channel
 * @param {string} cid 
 */
function loadMessagesFromChannel(cid: string) {
    fetch(`http://localhost:3000/api/v1/channels/${cid}/messages`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
}

/**
 * This function loads all members from the channel
 * @param {string} cid 
 */
function loadMemberFromChannel(cid: string) {
    fetch(`http://localhost:3000/api/v1/channels/${cid}/member`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
}

/**
 * This function loads all channels from the user
 * @param {string} uid 
 */
function loadChannelsFromUser(uid: string) {
    fetch(`http://localhost:3000/api/v1/users/${uid}/channels`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
}