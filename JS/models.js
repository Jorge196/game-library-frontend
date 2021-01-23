class Game {
    constructor(attributes) {
        let whitelist = ["name", "genre", "release_date", "rating", "image_url"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container(){
        return this.c ||= document.querySelector("#gamesContainer")
    }

    static all() {
        console.log(this);
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
                this.collection = gameArray.map(attrs => new Game(attrs))
                let renderedGames = this.collection.map(game => game.render())
                this.container().append(...renderedGames);
                return this.collection
            })
    }

    render() {
        this.element ||= document.createElement('div');
        this.element.className = "w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4";

        this.element.innerHTML = `
        <div class="c-card block bg-red-500 shadow-md hover:shadow-xl rounded-lg overflow-hidden">
            <div class="relative pb-48 overflow-hidden">
              <img class=" game-image-url absolute inset-0 h-full w-full object-cover" src="${this.image_url}" alt="">
            </div>
            <div class="p-4">
              
              <span class=" game-genre inline-block px-2 py-1 leading-none bg-green-300 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs"></span>
              <h2 class="game-title mt-2 mb-2  font-bold"></h2>
              <a href="#" class="show-more">Show Reviews</a>
              <p data-game-id="${this.id}" class="game-reviews text-sm max-h-4 overflow-hidden transition-all ease-in-out duration-500"></p>
              
              <div class="mt-3 flex items-center">
                <span class="text-sm font-semibold">Rated</span>&nbsp;<span class="game-rating font-bold text-xl"></span>
              </div> 
            </div>
            <div class="p-4 border-t border-b text-xs text-gray-700">
              <span class="game-release-date flex items-center mb-1">
                
              </span>        
            </div>
          </div>
        `
        this.element.querySelector(".game-title").textContent = this.name;
        this.element.querySelector(".game-rating").textContent = this.rating;
        this.element.querySelector(".game-release-date").textContent = this.release_date;
        this.element.querySelector(".game-genre").textContent = this.genre;
        this.element.querySelector(".game-image-url").textContent = this.image_url;
        

        

        

        return this.element;
    }
}


class Review {
    constructor(attributes){
        let whitelist = ["game_id", "stars"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container() {
        return this.c ||= document.querySelector("#reviews")
    }

}