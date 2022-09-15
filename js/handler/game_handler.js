export default class Game {

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