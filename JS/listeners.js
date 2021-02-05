document.addEventListener('click', function(e) {
    e.preventDefault();

    let target = e.target;
    if(target.matches('.show-more')) {
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
        // Show all the reviews
        Review.show(target.dataset.gameId);
    } else if (target.matches(".editReview")) {
        let review = Review.findById(parseInt(target.dataset.reviewId, 10));

        console.log(review);
        // Modal.populate({title: "Edit Review", content: review.edit()})
        Modal.toggle()   
    } else if (target.matches(".deleteReview")) {
        if (confirm("Are you sure you want to delete this review?")) {
            let review = Review.findById(target.dataset.reviewId);
            review.delete();
        }
    }  
})

document.addEventListener('DOMContentLoaded', function(e) {
    Game.all();
    Modal.init();
})

document.addEventListener('submit', function(e) {
    let target = e.target; 
    console.log(e.target)
    if(target.matches('#newReview')) {
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



