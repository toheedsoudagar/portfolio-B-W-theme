const carouselContainer = document.querySelector('.carousel-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.querySelector('.carousel-dots');
const posts = document.querySelectorAll('.carousel-post');

let currentIndex = 0;

function updateCarousel() {
    carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    const activeDot = dotsContainer.querySelector('.active-dot');
    if (activeDot) {
        activeDot.classList.remove('active-dot');
    }
    dotsContainer.children[currentIndex].classList.add('active-dot');
}

function moveToNext() {
    currentIndex = (currentIndex + 1) % posts.length;
    updateCarousel();
}

function moveToPrev() {
    currentIndex = (currentIndex - 1 + posts.length) % posts.length;
    updateCarousel();
}

function createDots() {
    for (let i = 0; i < posts.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) {
            dot.classList.add('active-dot');
        }
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    }
}

nextBtn.addEventListener('click', moveToNext);
prevBtn.addEventListener('click', moveToPrev);
createDots();

// Dodatak za automatsko pomjeranje
function autoMove() {
    moveToNext();
}

let autoMoveInterval = setInterval(autoMove, 3000);

carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoMoveInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoMoveInterval = setInterval(autoMove, 4000);
});