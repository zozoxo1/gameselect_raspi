export default class Login {

    login = () => {
        const username_input = document.querySelector('#username')
        const password_input = document.querySelector('#password')
        const login_message = document.querySelector('.login-message')

        // User data
        const user = {
            username: username_input.value,
            password: password_input.value
        }

        // request to api login
        fetch(
            API_URL + "login",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(user)
            }
        )
        .then(res => res.json())
        .then(data => {
            if(!data.token) {
                login_message.innerHTML = data.message
                login_message.style.display = 'block'
            } else {
                window.localStorage.setItem('token', data.token)
                window.location.href = window.location.origin
            }
        })
    }

    tokenAvailable = () => {
        const token = window.localStorage.getItem("token")

        if(!token) return

        fetch(
            API_URL + "token",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                headers: new Headers({
                    'Authorization': 'Bearer ' + token
                })
            }
        )
        .then(res => res.json())
        .then(data => {
            if(data.message === "token valid") {
                window.location.href = window.location.origin
            }
        })
    }

    logout = () => {
        window.localStorage.removeItem('token')
        window.location.href = window.location.origin + "/login.html"
    }

}