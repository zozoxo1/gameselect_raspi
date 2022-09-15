import Login from "./handler/login_handler.js"

const login = new Login()

window.addEventListener('DOMContentLoaded', () => {

    setInterval(login.tokenAvailable(), 500)

    const login_form = document.getElementById("login-form")

    login_form.addEventListener('submit', (e) => {
        e.preventDefault()

        login.login()
        
    })

})