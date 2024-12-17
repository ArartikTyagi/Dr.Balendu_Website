// Researcher Portfolio Interactive JavaScript

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

            const validateEmail = (email) => {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(String(email).toLowerCase());
            };

            let isValid = true;

            if (nameInput.value.trim() === '') {
                isValid = false;
                nameInput.classList.add('border-red-500');
            } else {
                nameInput.classList.remove('border-red-500');
            }

            if (!validateEmail(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('border-red-500');
            } else {
                emailInput.classList.remove('border-red-500');
            }

            if (messageInput.value.trim() === '') {
                isValid = false;
                messageInput.classList.add('border-red-500');
            } else {
                messageInput.classList.remove('border-red-500');
            }

            if (isValid) {
                alert('Message sent successfully!');
                contactForm.reset();
            }
        });
    }
});
