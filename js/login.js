import AuthenticationHandler from "./handler/authentication_handler.js"

const authenticationHandler = new AuthenticationHandler()

setInterval(() => {
    Promise.resolve(authenticationHandler.isTokenAvailableAndValid())
        .then(response => {
            if(response)
                window.location.href = window.location.origin
        })
}, 500)

const login_form = document.querySelector("#login-form")
const username_input = document.querySelector("#username")
const password_input = document.querySelector("#password")
const login_message = document.querySelector(".login-message")

login_form.addEventListener('submit', (e) => {
    e.preventDefault()

    if((username_input.value || password_input.value) === '') {
        login_message.style.display = 'block'
        login_message.innerHTML = "Username or password is empty"
        return
    }

    Promise.resolve(authenticationHandler.login(username_input.value, password_input.value))
        .then(response => {
            if(response.token) {
                window.localStorage.setItem('token', response.token)
            } else {
                login_message.style.display = 'block'
                login_message.innerHTML = response.message
            }
        })
    
})