document.addEventListener('click', function(e) {
    let target = e.target;
    if(target.matches('.show-more')) {
        e.preventDefault();
        let p = target.nextElementSibling;
        if(target.textContent == "Show More") {
            Review.show(target.dataset.gameId);
            target.textContent = "Show Less";
            p.classList.replace('max-h-4', 'max-h-screen')
        } else if (target.textContent == "Show Less") {
            Review.clear(target.dataset.gameId);
             target.textContent = "Show More";
             p.classList.replace('max-h-screen', 'max-h-4')  
        } 
        
    } else if (target.matches(".editReview")) {
        let review = Review.findReviewById(+target.dataset.reviewId);
        Modal.populate({title: "Edit Review", content: review.edit()})
        Modal.toggle()   
    } else if (target.matches(".deleteReview")) {
        if (confirm("Are you sure you want to delete this review?")) {
            let review = Review.findReviewById(+target.dataset.reviewId);
            review.delete();
        }
    } else if (target.matches("#Name")) {
        const gamesSorted = Game.collection.sort(function(a, b) {
            if(a.name < b.name)
            return -1;

            if (a.name > b.name)
            return 1;

            return 0;
        });
        Game.container().innerHTML = ''
        gamesSorted.map(game => {
        Game.container().appendChild(game.render())
        })
    }
})

document.addEventListener('DOMContentLoaded', function(e) {
    const selectElement = document.querySelector('#Rating')
    selectElement.addEventListener('change', (event) => {
        const selection = event.target.value;
        if(selection == 'All'){
            Game.container().innerHTML = ''
            Game.collection.map(game => {
            Game.container().appendChild(game.render())
            })   
        } else{
            const gamesRated = Game.collection.filter((game) => game.rating == selection);
            Game.container().innerHTML = ''
            gamesRated.map(game => {
            Game.container().appendChild(game.render())
            })   
        }
    });
    

    user_name = prompt("What's your name?");
    document.getElementById('Greeting').innerText = "Hello "+ user_name;
    Game.all();
    Modal.init();
})




document.addEventListener('submit', function(e) {
    let target = e.target; 
    if(target.matches('#newReview')) {
        e.preventDefault();
        Review.create(target.serialize())
          .then(() => {
              target.reset();
            });
    } else if(target.matches('.reviewEditForm')) {
        e.preventDefault();
        let review = Review.findReviewById(target.dataset.reviewId);
        review.update(target.serialize())
            .then(() => Modal.toggle());
    } else if(target.matches('.RatingSearch')) {
        e.preventDefault();
        searchElement = document.getElementById('searchBar')
        searchElement.addEventListener('keyup', (event) => {
            const search = event.target.value
            if (search == ''){
                Game.container().innerHTML = ''
                Game.collection.map(game => {
                Game.container().appendChild(game.render())
                })   
            } else {
                const gameSearch = Game.collection.filter((game) => game.rating == search);
                Game.container().innerHTML = ''
                gameSearch.map(game => {
                Game.container().appendChild(game.render())
                })
            }
        })
    }
});

user_name = "";

