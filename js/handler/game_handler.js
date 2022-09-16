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

    startGame(game) {

    }

    stopGames() {

    }

    stopGame(game) {
        
    }

}