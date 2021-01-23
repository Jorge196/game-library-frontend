document.addEventListener('click', function(e) {
    let target = e.target;
    if(target.matches('.show-more')) {
        e.preventDefault();
        let p = target.nextElementSibling;
        p.classList.toggle('max-h-4')
    }
})

document.addEventListener('DOMContentLoaded', function(e) {
    Game.all();
})

