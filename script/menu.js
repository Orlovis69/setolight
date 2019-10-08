////// Menu


const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.nav-header');

function toggleMenu() {
    if(!menu.classList.contains('display-grid')) {
        menu.classList.toggle('display-grid');
        menuIcon.classList.toggle('close');
        setTimeout(function() {
            menu.classList.toggle('show-opacity');
        }, 20);
    } else {
        menu.classList.toggle('show-opacity');
        menuIcon.classList.toggle('close');
        menu.addEventListener('transitionend', function() {
            menu.classList.toggle('display-grid')
        })
        
    }
}
menuIcon.addEventListener('click', toggleMenu);