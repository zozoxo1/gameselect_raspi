import Game from './handler/game_handler.js'
import Login from './handler/login_handler.js'

const game = new Game()
const login = new Login()

window.addEventListener('DOMContentLoaded', () => {
    const games = document.querySelector('.games')
    const logout_btn = document.querySelector('.logout')

    logout_btn.addEventListener('click', () => {
        login.logout()
    })

    setInterval(game.tokenValid(), 500)

    fetch("js/games/games.json")
            .then(response => response.json())
            .then(json => {
                json.forEach(element => {
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
})