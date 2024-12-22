document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const messageInput = contactForm.querySelector('#message');
            const nameError = contactForm.querySelector('#name-error');
            const emailError = contactForm.querySelector('#email-error');
            const messageError = contactForm.querySelector('#message-error');

            const validateEmail = (email) => {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(String(email).toLowerCase());
            };

            let isValid = true;

            if (nameInput.value.trim() === '') {
                isValid = false;
                nameInput.classList.add('border-red-500');
                nameError.textContent = 'Name is required';
            } else {
                nameInput.classList.remove('border-red-500');
                nameError.textContent = '';
            }

            if (!validateEmail(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('border-red-500');
                emailError.textContent = 'Please enter a valid email address';
            } else {
                emailInput.classList.remove('border-red-500');
                emailError.textContent = '';
            }

            if (messageInput.value.trim() === '') {
                isValid = false;
                messageInput.classList.add('border-red-500');
                messageError.textContent = 'Message cannot be empty';
            } else {
                messageInput.classList.remove('border-red-500');
                messageError.textContent = '';
            }

            if (isValid) {
                // Form submission handling
                const formData = new FormData(contactForm);
                fetch('send-email.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    const notification = document.getElementById('notification');
                    notification.classList.remove('hidden');
                    notification.textContent = data.success ? 'Your data has been submitted successfully!' : (data.message || 'Failed to submit. Please try again.');
                    notification.classList.add(data.success ? 'bg-green-600' : 'bg-red-600');
                    if (data.success) {
                        contactForm.reset();
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    const notification = document.getElementById('notification');
                    notification.classList.remove('hidden');
                    notification.classList.add('bg-red-600');
                    notification.textContent = 'An error occurred. Please try again later.';
                });
            }
        });
    }

    // Mobile Menu Toggle
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Publications Section Functionality
    const publicationsGrid = document.getElementById('publications-grid');
    const viewMoreButton = document.getElementById('view-more-publications');
    const viewLessButton = document.getElementById('view-less-publications');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let visibleCount = 3;
    let currentFilter = 'all';

    function updateVisibility() {
        const cards = publicationsGrid.querySelectorAll('.publication-card');
        const filteredCards = Array.from(cards).filter(card => {
            const category = card.getAttribute('data-category');
            return currentFilter === 'all' || category === currentFilter;
        });

        // Hide all cards first
        cards.forEach(card => card.classList.add('hidden'));

        // Show the appropriate number of filtered cards
        filteredCards.forEach((card, index) => {
            if (index < visibleCount) {
                card.classList.remove('hidden');
            }
        });

        // Update button visibility
        viewMoreButton.classList.toggle('hidden', filteredCards.length <= visibleCount);
        viewLessButton.classList.toggle('hidden', visibleCount <= 3);
    }

    // Filter button click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentFilter = button.getAttribute('data-filter');
            visibleCount = 3; // Reset visible count when filtering
            
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            updateVisibility();
        });
    });

    // View More button click handler
    viewMoreButton.addEventListener('click', () => {
        const filteredCards = Array.from(publicationsGrid.querySelectorAll('.publication-card'))
            .filter(card => currentFilter === 'all' || card.getAttribute('data-category') === currentFilter);
        
        visibleCount = Math.min(visibleCount + 3, filteredCards.length);
        updateVisibility();
    });

    // View Less button click handler
    viewLessButton.addEventListener('click', () => {
        visibleCount = 3;
        updateVisibility();
    });

    // Initialize publication visibility
    updateVisibility();

    // Patents button handler
    const patentsButton = document.getElementById('patents-button');
    if (patentsButton) {
        patentsButton.addEventListener('click', () => {
            window.location.href = 'patent_table.html';
        });
    }

    // Initialize feather icons if available
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Research Section Functionality
    const researchGrid = document.querySelector('#Research .grid');
    const viewMoreResearch = document.getElementById('view-more-research');
    const viewLessResearch = document.getElementById('view-less-research');

    let visibleResearchCount = 3; // Initially visible research items

    // Function to update visibility of research cards
    function updateResearchVisibility() {
        const researchCards = researchGrid.querySelectorAll('.research-card');
        
        researchCards.forEach((card, index) => {
            if (index < visibleResearchCount) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        viewMoreResearch.classList.toggle('hidden', visibleResearchCount >= researchCards.length);
        viewLessResearch.classList.toggle('hidden', visibleResearchCount <= 3);
    }

    // Event listener for "View More"
    viewMoreResearch.addEventListener('click', () => {
        visibleResearchCount += 3; // Show 3 more items
        updateResearchVisibility();
    });

    // Event listener for "View Less"
    viewLessResearch.addEventListener('click', () => {
        visibleResearchCount = 3; // Reset to initial count
        updateResearchVisibility();
    });

    // Initialize visibility on load
    updateResearchVisibility();
});