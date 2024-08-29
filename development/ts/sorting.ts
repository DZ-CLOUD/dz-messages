enum CHANNEL_TYPE {
    DM,
    TEXT,
    VOICE,
    ANNOUNCEMENT
}

function sortChannels(sorting: string) {
    const uid = "0"
    fetch(`/api/v1/user/${uid}/channels`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(e => {
            console.log(e);
        })
}