class Game {
    constructor(attributes) {
        let whitelist = ["name", "genre", "release_date", "rating", "image_url", "id"]
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

    show(){
        return fetch(`http://localhost:3000/games/${this.id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                return res.text().then(error => Promise.reject(error))
            }
        })
        .then(({id, reviewsAttributes}) => {
            Review.loadByGame(id, reviewsAttributes)
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
              <a href="#" data-game-id="${this.id}" class="show-more">Show More</a>
              <section 
                id="reviewsContainer" 
                data-game-id="${this.id}" 
                class="game-reviews text-sm max-h-4 overflow-hidden transition-all ease-in-out duration-500">
               
                    <form id="newReview" class="flex mt-4">
                        <input type="hidden" name="game_id" value="${this.id}"/> 
                        <input type="text" class="block flex-1 p-3" name="notes" placeholder="New Review" />
                        <button type="submit" class="block flex-none"><i class="fa fa-plus p-4 z--1 bg-green-400"></i></button>
                    </form>
                    <div id="reviewSection-${this.id}" style="height: 125px; overflow-y: scroll;" class="">
                        <ul id="reviews-${this.id}" class="list-none"></ul> 
                    </div>
              </section>     
              
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
        let whitelist = ["game_id", "notes", "id"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container(game_id) {
        return document.querySelector(`#reviews-${game_id}`)
    }

    static collection() {
        return this.coll ||= {};
    }

    static findById(id) {
        return this.collection()[Review.game_id].find(review => review.id == id); 
    }
    

    static loadByGame(id, reviewsAttributes) {
        Review.game_id = id;
        let reviews = reviewsAttributes.map(reviewAttributes => new Review(reviewAttributes));
        this.collection()[id] = reviews;
        let rendered = reviews.map(review => review.render())
        this.container().innerHTML = "";
        this.container().append(...rendered)
    }

    static create(formData) {
        return fetch("http://localhost:3000/reviews", {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                review: formData
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json(); 
            } else {
                return res.text().then(errors => Promise.reject(errors))
            }
        })
        .then(reviewData => {
            let review = new Review(reviewData)      
            this.collection[reviewData.game_id] ||= []
            console.log(this.collection[reviewData.game_id])
            this.collection.push(review);
            let rendered = review.render();
            this.container(reviewData.game_id).appendChild(rendered);
            return review;
        })
        .catch(error => {
            
            console.error(error)
            new FlashMessage({type: 'error', message: error})
        })

    }

    static show(game_id){
        return fetch(`http://localhost:3000/games/${game_id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json(); 
            } else {
                return res.text().then(errors => Promise.reject(errors))
            }
        })
        .then(reviewData => {
            console.log(reviewData);
            this.collection = reviewData.reviewsAttributes.map(review => new Review(review))
            let renderList = this.collection.map(review => review.render())
            console.log(renderList);
            this.container(game_id).append(...renderList);
            //return this.collection
            console.log(...renderList);
            
            console.log(this.container(game_id));
        })
    }
    render() {
        this.element ||= document.createElement('li');
        this.element.classList.set("my-2 px-4 bg-green-200 grid grid-cols-8"); 
    
        
        this.notesSpan ||= document.createElement('span');
        this.notesSpan.classList.set("py-4 col-span-6");
        this.notesSpan.textContent = this.notes;

        this.editLink ||= document.createElement('a')
        this.editLink.classList.add(..."my-1 text-right".split(" "));
        this.editLink.innerHTML = `<i class="p-4 fa fa-pencil-alt"></i>`;

        this.deleteLink ||= document.createElement('a'); 
        this.deleteLink.classList.add(..."my-1 text-right".split(" "));
        this.deleteLink.innerHTML = `<i class="p-4 fa fa-trash-alt"></i>`;

        this.element.append(this.notesSpan, this.editLink, this.deleteLink);

        return this.element;
    }

   

}


class FlashMessage {
    constructor({type, message}) {
      this.message = message;
      this.color = type == "error" ? 'bg-red-700' : 'bg-yellow-300';
      this.render();
    }
  
    static container() {
      return this.c ||= document.querySelector('#flash')
    }
  
    render() {
      this.toggleMessage();
      window.setTimeout(() => this.toggleMessage(), 5000);
    }
  
    toggleMessage() {
        FlashMessage.container().textContent = this.message;
        FlashMessage.container().classList.toggle(this.color);
        FlashMessage.container().classList.toggle('opacity-0');
    }
}