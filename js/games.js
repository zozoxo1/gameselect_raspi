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

            game_div.querySelector('.start').addEventListener('click', () => {
                gameHandler.startGame(`${element['game']}`)
                alertify.success(`${element['game']} erfolgreich gestartet.`);
            })

            game_div.querySelector('.stop').addEventListener('click', () => {
                gameHandler.stopGame(`${element['game']}`)
                // FIXME nur aktivieren wenn button nicht disabled
                alertify.success(`${element['game']} erfolgreich gestoppt.`);
            })

            games.appendChild(game_div)
        })
    })