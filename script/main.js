



// hero navigation 
// add .honeycell--pink-filter to active cell (not safari)

// Advantages block
const advantagesIcon = document.querySelectorAll('.advantages-item--icon');
const advantagesText = document.querySelectorAll('.advantages-item--text');

function findItem(e) {
    const numberIcon = parseInt(this.querySelector('p').textContent);
    const that = this;

    advantagesIcon.forEach(icon => icon.classList.remove('active'));

    advantagesText.forEach(text => {
        text.style.display = 'none';
        const numberText = parseInt(text.querySelector('span').textContent);
        if (numberIcon == numberText) {
            text.style.display = 'block';
            that.classList.add('active');
        }

    })
}

advantagesIcon.forEach(icon => icon.addEventListener('click', findItem));
advantagesIcon.forEach(icon => icon.addEventListener('mouseenter', findItem));


/////////////
// Features block
// get varibales
const featuresIcons = document.querySelectorAll('.features-item--icon');
const featuresText = document.querySelectorAll('.features-item--text');
const lines = document.querySelectorAll('.features-decor');

// show corresonding text
function showText () {
    // get index of icon
    const index = parseInt(this.dataset.index);

    featuresIcons.forEach(icon => {
        icon.classList.remove('active');
        if(icon.dataset.index == index) {
            icon.classList.add('active');
        }
    })
    // find corresponding text block
    featuresText.forEach(text => {
        text.style.display = "none";
        text.classList.remove('active');
        
        if(text.dataset.index == index) {
            text.style.display = "block";
            text.classList.add('active');
        }
    })
}

// all listeners
featuresIcons.forEach(icon => icon.addEventListener('click', showText));


//////////////
// Control system navigation
const nav = document.querySelectorAll('.nav-list--description li');
const controlItems = document.querySelectorAll('.control-item');

// show corresponding block
function showBlock() {
    nav.forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');

    const index = this.dataset.index;
    const decor = document.querySelector('.control-system-decor');

    controlItems.forEach(item => {
        item.style.display = 'none';
        if(item.dataset.index == index) {
            item.style.display = 'grid';
        }
        if(index == '2') {
            decor.style.display = 'grid';
        } else {
            decor.style.display = 'none';
        }
    })
}

// Add event listeners
nav.forEach(nav => nav.addEventListener('click', showBlock));


/////////////////
// Light navigation
const navLight = document.querySelectorAll('.nav-list--description li');
const descriptionLight = document.querySelectorAll('.description-block');

// show corresponding block
function showBlockLight() {
    navLight.forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');

    const index = this.dataset.index;

    descriptionLight.forEach(item => {
        item.style.display = 'none';
        if(item.dataset.index == index) {
            item.style.display = 'grid';
        }
    })
}

// Add event listeners
navLight.forEach(nav => nav.addEventListener('click', showBlockLight));


// LIGHT SLIDER
// UI variables
const images = document.querySelectorAll('.hero-images-container img');
const navIcons = document.querySelectorAll('.nav-list--hero li');

// Change slide
function changeSlide() {
    // find index to show
    const index = getIndex(this);
    console.log(index);

    // show image with current index
    showImage(index);
    showIcon(index);
}

// Get current index and find index of image to show
function getIndex(icon) {
    let currentIndex;

    // get index of active icon
    navIcons.forEach(icon => {
        if(icon.classList.contains('active')) {
            currentIndex = icon.dataset.block;
        }
    })

    // change index if next/prev buttons pushed
    if (icon.dataset === undefined) {
        currentIndex++;
    } else if (icon.dataset.block === 'next') {
        currentIndex++;
    } else if (icon.dataset.block === 'prev') {
        currentIndex--;
    } else {
        // console.log(that);
        currentIndex = icon.dataset.block;
    }

    // Loop index if min and max
    if(currentIndex > 6) {
        currentIndex = 1;
    } else if (currentIndex < 1) {
        currentIndex = 6;
    }
    
    return currentIndex;
}

function showImage(index) {
    images.forEach(image => {
        image.classList.remove('visible');
        image.classList.remove('active');
        if(image.dataset.block == index) {
            image.classList.add('active');
            setTimeout(function() {image.classList.add('visible')}, 20);
        }
    })
}

function showIcon(index) {
    navIcons.forEach(icon => {
        icon.classList.remove('active');
        if(icon.dataset.block == index) {
            icon.classList.add('active');
        }
    })
}

function autoPlay() {
    // setInterval(changeSlide, 1500);
    // console.log('hi');
}
// Listeners
navIcons.forEach(item => item.addEventListener('click', changeSlide));
document.addEventListener("load", autoPlay());


