// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slider-slide');
const totalSlides = slides.length;
const slider = document.getElementById('hero-slider');

function updateIndicators() {
    document.querySelectorAll('[id^="indicator-"]').forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('bg-white');
            indicator.classList.remove('bg-white/50');
        } else {
            indicator.classList.add('bg-white/50');
            indicator.classList.remove('bg-white');
        }
    });
}

function showSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    updateIndicators();
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Initialize indicators
updateIndicators();

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Trigger counter animation when section is visible
const counterSection = document.querySelector('.bg-navy');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
});
observer.observe(counterSection);

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.scroll-animate');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll animations
initScrollAnimations();

// WhatsApp Form Submission
document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Create a clean WhatsApp message
    const whatsappMessage = `*New Form from Website*

    👤 *Name:* ${name}
    📧 *Email:* ${email}
    📱 *Phone:* ${phone}
    💬 *Message:* ${message}`;

    const whatsappURL = `https://wa.me/919100499431?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, '_blank');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        mobileMenu.classList.add('hidden');
    });
});

// Disclaimer Popup Script
document.addEventListener('DOMContentLoaded', function() {
    const disclaimerOverlay = document.getElementById('disclaimerOverlay');
    const agreeBtn = document.getElementById('agreeBtn');
    const disagreeBtn = document.getElementById('disagreeBtn');
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('mainContent');

    // Check if user has already accepted disclaimer
    const hasAcceptedDisclaimer = localStorage.getItem('disclaimerAccepted');

    if (!hasAcceptedDisclaimer) {
        // Show disclaimer popup after a short delay
        setTimeout(() => {
            disclaimerOverlay.style.display = 'flex';
            disclaimerOverlay.style.opacity = '1';
            disclaimerOverlay.style.transform = 'scale(1)';
        }, 500);
    } else {
        // If already accepted, hide disclaimer and proceed with normal loading
        disclaimerOverlay.style.display = 'none';
        proceedWithLoading();
    }

    // Handle Agree button
    agreeBtn.addEventListener('click', function() {
        localStorage.setItem('disclaimerAccepted', 'true');
        // Hide the disclaimer popup with animation
        disclaimerOverlay.style.opacity = '0';
        disclaimerOverlay.style.transform = 'scale(0.8)';
        setTimeout(() => {
            disclaimerOverlay.style.display = 'none';
        }, 300);
        proceedWithLoading();
    });

    // Handle Disagree button
    disagreeBtn.addEventListener('click', function() {
        // Close the tab/window
        window.close();
        // Fallback: redirect to a blank page if window.close() doesn't work
        setTimeout(() => {
            window.location.href = 'about:blank';
        }, 100);
    });

    // Function to proceed with normal loading
    function proceedWithLoading() {
        // Hide loader and show main content
        setTimeout(() => {
            loader.classList.add('hidden');
            mainContent.classList.add('loaded');
        }, 1000); // Show loader for at least 1 second
    }
});

// Counter Animation Script
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const isPercentage = element.getAttribute('data-count') === '98';
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            if (isPercentage) {
                element.textContent = target + '%';
            } else {
                element.textContent = target + '+';
            }
            clearInterval(timer);
        } else {
            if (isPercentage) {
                element.textContent = Math.floor(start) + '%';
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }
    }, 16);
}

// Intersection Observer for Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                    counter.classList.add('animated');
                }
            });
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the section is visible
});

// Observe the counter section
document.addEventListener('DOMContentLoaded', function() {
    const counterSection = document.getElementById('counter-section');
    if (counterSection) {
        counterObserver.observe(counterSection);
    }
});
