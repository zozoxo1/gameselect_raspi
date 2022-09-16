export default class GameHandler {

    async getGames() {
        const stored_token = window.localStorage.getItem('token')

        let games = await fetch(
            API_ENDPOINTS['games'],
            {
                method: 'GET',
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
        .then(gamesData => {
            return gamesData
        })

        return games
    }

    tokenValid = () => {
        const token = window.localStorage.getItem("token")

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
            if(data.message !== "token valid") {
                window.location.href = window.location.origin + "/login.html"
                window.localStorage.removeItem('token')
            }
        })
    }

}