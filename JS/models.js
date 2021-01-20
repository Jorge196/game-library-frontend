class Game {
    constructor(attributes) {
        let whitelist = ["name", "genre", "release_date", "rating"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container(){
        return this.c ||= document.querySelector("#gameContainer")
    }

    static all(){
        return fetch("http://localhost:3000/games", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.ok) {
                   return res.json() 
                } else {
                    return res.text().then(error => Promise.reject(error))
                }
            })
            .then(gameArray => {
                debugger
            })
    }
}