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
        const stored_token = window.localStorage.getItem('token')
        
        const game_json = {
            game
        }
        
        fetch(
            API_ENDPOINTS['start_game'],
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + stored_token
                },
                body: JSON.stringify(game_json)
            }
        )
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })

    }

    stopGames() {
        const stored_token = window.localStorage.getItem('token')

        fetch(
            API_ENDPOINTS['stop_game'],
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + stored_token
                }
            }
        )
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    stopGame(game) {
        const stored_token = window.localStorage.getItem('token')

        fetch(
            API_ENDPOINTS['stop_game'],
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + stored_token
                },
                body: JSON.stringify({ game: game })
            }
        )
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

}