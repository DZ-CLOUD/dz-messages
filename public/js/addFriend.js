function addFriend(uid) {
    const usernameInput = document.getElementById('addFriendUsernameInput');
    const username = usernameInput.value;

    fetch(`/api/v1/users/${uid}/add-friend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:{
            username
        },
        
    })
        .then(r => r.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}