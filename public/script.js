// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Change slide every 3 seconds
    setInterval(nextSlide, 3000);
});

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    const currentSlide = document.querySelector('.slide.show');

    // Find the index of the current slide
    const currentIndex = Array.from(slides).indexOf(currentSlide);

    // Calculate the index of the next slide
    const nextIndex = (currentIndex + 1) % slides.length;

    // Hide the current slide
    currentSlide.classList.remove('show');

    // Show the next slide
    slides[nextIndex].classList.add('show');
}
