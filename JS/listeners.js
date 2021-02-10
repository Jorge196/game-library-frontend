document.addEventListener('click', function(e) {
    let target = e.target;
    if(target.matches('.show-more')) {
        e.preventDefault();
        let p = target.nextElementSibling;
        if(target.textContent == "Show More") {
            Review.show(target.dataset.gameId);
            // Flip the direction of showing
            target.textContent = "Show Less";
            p.classList.replace('max-h-4', 'max-h-screen')
        } else if (target.textContent == "Show Less") {
            Review.clear(target.dataset.gameId);
             // Flip the direction of showing
             target.textContent = "Show More";
             p.classList.replace('max-h-screen', 'max-h-4')  
        } 
        // Show all the reviews
        
    } else if (target.matches(".editReview")) {
        console.log(Review.collection);
        let review = findReviewById(Review.collection, target.dataset.reviewId);
        Modal.populate({title: "Edit Review", content: review.edit()})
        Modal.toggle()   
    } else if (target.matches(".deleteReview")) {
        if (confirm("Are you sure you want to delete this review?")) {
            let review = findReviewById(Review.collection, target.dataset.reviewId);
            review.delete();
        }
    }  
})

document.addEventListener('DOMContentLoaded', function(e) {
    Game.all();
    Modal.init();
})

function findReviewById(collection, id) {
    collection.forEach(review => {
        if(review.id === id){
            return review;
        }
    }); 
}

document.addEventListener('submit', function(e) {
    let target = e.target; 
    if(target.matches('#newReview')) {
        e.preventDefault();
        Review.create(target.serialize())
          .then(() => {
              target.reset();
            });
    } else if(target.matches('.editReviewForm')) {
        e.preventDefault();
        let review = findReviewById(target.dataset.reviewId);
        review.update(target.serialize())
            .then(() => Modal.toggle());
    }
});



