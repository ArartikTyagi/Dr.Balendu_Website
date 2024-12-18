document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const isDarkMode = htmlElement.classList.contains('dark');
            localStorage.setItem('theme-preference', isDarkMode ? 'dark' : 'light');
        });

        const savedTheme = localStorage.getItem('theme-preference');
        if (savedTheme === 'dark') {
            htmlElement.classList.add('dark');
        }
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
                alert('Message sent successfully!');
                contactForm.reset();
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
});
