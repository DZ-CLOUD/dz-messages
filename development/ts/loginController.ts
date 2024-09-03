function login() {
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passInput = document.getElementById("password") as HTMLInputElement;
    const body:object = {
        "email": emailInput.value,
        "password": passInput.value
    }
    fetch("http://localhost:3000/api/v1/auth/login", {method: "POST", body})
        .then(res => res.json())
        .then(data => {
            if (data.code !== 200) {
                return false;
            }
            if (data.code === 200){
                localStorage.setItem("email", data.email);
                localStorage.setItem("uid", data.uid);
                localStorage.setItem("clid", data.clid);
                localStorage.setItem("sid", data.sid);
                localStorage.setItem("token", data.token);
            }
        })
}