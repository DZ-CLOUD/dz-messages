function login() {
    fetch("http://localhost:3000/api/v1/auth/login", {method: "POST"})
        .then(res => res.json())
        .then(data => {
            if (data.code !== 200) {
                return false;
            }


        })
}