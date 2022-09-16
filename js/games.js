import GameHandler from './handler/game_handler.js'
import AuthenticationHandler from './handler/authentication_handler.js'

const gameHandler = new GameHandler()
const authenticationHandler = new AuthenticationHandler()

const games = document.querySelector('.games')
const logout_btn = document.querySelector('.logout')

logout_btn.addEventListener('click', () => {
    authenticationHandler.logout()
})

setInterval(() => {
    Promise.resolve(authenticationHandler.isTokenAvailableAndValid())
        .then(response => {
            if(!response) {
                authenticationHandler.logout()
            }
        })
}, 1000)

Promise.resolve(gameHandler.getGames())
    .then(gamesData => {
        gamesData.forEach(element => {
            let game_div = document.createElement("div")
            game_div.className = "game"
            game_div.insertAdjacentHTML(
                "afterbegin",
                `<img src="${element['img_file']}" alt="Game picture with snake game.">` +
                `<h2>${element['game']}</h2>` +
        
                '<div class="actions">' +
                    '<button class="btn start">Auswählen</button>' +
                    '<button class="btn stop disabled">Stoppen</button>' +
                '</div>'
            )

            games.appendChild(game_div)
        })
    })