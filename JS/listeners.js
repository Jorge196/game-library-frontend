document.addEventListener('click', function(e) {
    let target = e.target;
    if(target.matches('.show-more')) {
        e.preventDefault();
        let p = target.nextElementSibling;
        if(target.textContent == "Show More") {
            target.textContent = "Show Less"
            p.classList.replace('max-h-4', 'max-h-screen')
        } else {
            target.textContent = "Show More"
            p.classList.replace('max-h-screen', 'max-h-4')

        }

    }
})

document.addEventListener('DOMContentLoaded', function(e) {
    Game.all();
})

document.addEventListener('submit', function(e) {
    let target = e.target;
    if(target.matches('#data-game-id')){
        e.preventDefault();
        console.log('submitted newreviewform')

    }
})

