window.addEventListener('DOMContentLoaded', () => {

    let games = document.getElementsByClassName("games")[0]

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