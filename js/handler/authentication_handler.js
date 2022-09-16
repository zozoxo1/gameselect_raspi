export default class AuthenticationHandler {

    async login(username, password) {

        const user_credentials = {
            username,
            password
        }

        let loginData = await fetch(
            API_ENDPOINTS['login'],
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(user_credentials)
            }
        )
        .then(res => res.json())
        .then(data => {
            return data
        })

        return loginData
    }

    async isTokenAvailableAndValid() {
        const stored_token = window.localStorage.getItem('token')

        if(!stored_token) {
            return false
        }

        let isTokenValid = await fetch(
            API_ENDPOINTS['token'],
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                headers: new Headers({
                    'Authorization': 'Bearer ' + stored_token
                })
            }
        )
        .then(res => res.json())
        .then(data => {
            return data.message === 'token valid'
        })

        return isTokenValid
    }

    logout = () => {
        window.localStorage.removeItem('token')
        window.location.href = window.location.origin + "/login.html"
    }

}