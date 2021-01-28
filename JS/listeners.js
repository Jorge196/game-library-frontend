document.addEventListener('click', function(e) {
    let target = e.target;
    if(target.matches('.show-more')) {
        e.preventDefault();
        let p = target.nextElementSibling;
        if(target.textContent == "Show More") {
            // Flip the direction of showing
            target.textContent = "Show Less";
            p.classList.replace('max-h-4', 'max-h-screen')
        
        } else if (target.textContent == "Show Less") {
             // Flip the direction of showing
             target.textContent = "Show Less";
             p.classList.replace('max-h-screen', 'max-h-4')
            
        }

        Review.show(target.dataset.gameId);
    }
    // if 'delete' button is clicked
    // Review.delete();


})

document.addEventListener('DOMContentLoaded', function(e) {
    Game.all();
})

document.addEventListener('submit', function(e) {
    let target = e.target; 
    console.log(e.target)
    if(target.matches('#data-game-id')){
        e.preventDefault();
        Review.create(target.serialize())
        .then(() => {
            target.reset();
            target.querySelector('input[name="notes"]').blur();
        });
    } else if(target.matches('#newReview')) {
        e.preventDefault();
        Review.create(target.serialize())
          .then(() => {
              console.log(target)
              target.reset()
            });
    } else if(target.matches('.editReviewForm')) {
        e.preventDefault();
        let review = Review.findById(target.dataset.reviewId);
        review.update(target.serialize())
          .then(() => Modal.toggle())
    }
});



