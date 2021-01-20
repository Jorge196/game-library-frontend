class Review {
    constructor(attributes) {
        let whitelist = ["game_id", "stars", "active"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }
}