class Review {
    constructor(attributes) {
        let whitelist = ["game_id", "stars", "active"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container(){
        return this.c ||= document.querySelector("#reviewContainer")
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
            .then(reviewArray => {
                debugger
            })
    }
}