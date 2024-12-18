document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0; // Index of the currently active slide
    const slides = document.querySelectorAll('.slide'); // Select all slides
    const totalSlides = slides.length; // Get the total number of slides

    // Function to show the current slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active'); // Remove active class from all slides
            if (i === index) {
                slide.classList.add('active'); // Add active class to the current slide
            }
        });
    }

    // Function to move to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides; // Increment index and loop back if needed
        showSlide(currentIndex); // Show the new slide
    }

    // Start the slideshow (change slide every 3 seconds)
    if (slides.length > 0) {
        setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
});