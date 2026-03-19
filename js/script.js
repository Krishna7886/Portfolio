document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate On Scroll) library
    AOS.init({
        once: true, // Whether animation should happen only once - while scrolling down
        duration: 800, // Duration of animation
        easing: 'ease-out-quad', // Easing function
        mirror: false // Whether elements should animate out while scrolling past them
    });


    // 2. Active Navigation Link Highlighting for multi-page site
    const navLinks = document.querySelectorAll('.nav-links a');

    // Get the current page's filename
    // Handles cases like "index.html" or "" (for root)
    const currentPageFilename = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkFilename = link.getAttribute('href').split('/').pop();

        if (currentPageFilename === linkFilename) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });


    // 3. Skill Bar Animation
    const skillBars = document.querySelectorAll('.skill-bar-item .bar-inner');

    const animateSkillBars = () => {
        // Only run if we are on the skills page
        if (document.getElementById('skills-page')) {
            skillBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                // Check if the skill bar is in the viewport (or slightly above/below)
                if (rect.top <= window.innerHeight - 150 && rect.bottom >= 0) {
                    bar.style.width = bar.dataset.progress;

                    // This part is a bit tricky for pseudo-elements as they can't be directly manipulated
                    // by JS. If you want a percentage text inside the bar, it's better to add a <span>
                    // inside the .bar-inner and animate its opacity.
                    // For example:
                    // <div class="bar-inner" data-progress="95%"><span class="percentage">95%</span></div>
                    // Then in CSS: .bar-inner .percentage { opacity: 0; transition: opacity 0.5s ease 1s; }
                    // And in JS: const percentageSpan = bar.querySelector('.percentage'); if (percentageSpan) percentageSpan.style.opacity = '1';
                } else if (rect.top > window.innerHeight || rect.bottom < 0) {
                    // Reset animation if element goes completely out of view (optional)
                    // bar.style.width = '0%';
                }
            });
        }
    };

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Run once on page load to animate visible bars


    // 4. Contact Form Submission (remains the same)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();

            /*
            // Uncomment and configure for a real backend integration (e.g., Formspree.io, Netlify Forms, custom backend)
            const formData = new FormData(contactForm);
            fetch('your_server_endpoint', { // Replace with your actual server endpoint
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Often required by form services
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Message sent successfully! Thank you.');
                    contactForm.reset();
                } else {
                    alert('There was an error sending your message. Please try again later.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('A network error occurred. Please try again.');
            });
            */
        });
    }

});
