// @see https://codepen.io/typo3-freelancer/pen/poEvyGj

document.addEventListener('click',function(ev){
    // Hamburger menu
    if(ev.target.classList.contains('hamburger-toggle')){
        ev.target.children[0].classList.toggle('active');
    }
});