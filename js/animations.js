// Premium Digital Experience - JavaScript Animations & Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initCursor();
    initScrollReveals();
    initMagneticButtons();
    initEmotionalButtons();
    initHeroAnimations();
    initServiceCards();
    initLoadingAnimation();
});

// Custom Cursor Implementation
function initCursor() {
    const cursor = document.getElementById('cursor');
    const cursorTrail = document.getElementById('cursor-trail');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let trailX = 0;
    let trailY = 0;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor following
    function updateCursor() {
        // Main cursor with slight delay for smooth effect
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        // Trail cursor with more delay
        trailX += (mouseX - trailX) * 0.05;
        trailY += (mouseY - trailY) * 0.05;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('button, a, .service-card, .glass-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

// Scroll Reveal Animations
function initScrollReveals() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Add reveal class to elements that should animate on scroll
    const revealElements = document.querySelectorAll('.about-content, .about-image, .service-card');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Magnetic Button Effects
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.emotional-btn');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Create magnetic pull effect
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;
            const pull = Math.min(distance / maxDistance, 1);

            const moveX = (x / distance) * pull * 10;
            const moveY = (y / distance) * pull * 10;

            gsap.to(button, {
                x: moveX,
                y: moveY,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

// Emotional Button Interactions
function initEmotionalButtons() {
    const buttons = document.querySelectorAll('.emotional-btn');

    buttons.forEach(button => {
        // Click animation
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.offsetX - 10) + 'px';
            ripple.style.top = (e.offsetY - 10) + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';

            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Success particle burst for certain buttons
            if (this.textContent.includes('Get Started') || this.textContent.includes('Start Your Project')) {
                createParticleBurst(e.clientX, e.clientY);
            }
        });

        // Hover sound-like effect (visual feedback)
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });

        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
    });
}

// Particle Burst Effect
function createParticleBurst(x, y) {
    const particleCount = 12;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // Random direction and distance
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = Math.random() * 100 + 50;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;

        gsap.to(particle, {
            x: targetX,
            y: targetY,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => particle.remove()
        });

        document.body.appendChild(particle);
        particles.push(particle);
    }
}

// Hero Section Animations
function initHeroAnimations() {
    // Stagger animation for hero elements
    gsap.from('.hero-content h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from('.hero-content p', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    });

    gsap.from('.hero-content .flex', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: "power3.out"
    });

    // Floating background elements
    gsap.to('.absolute.top-20.left-20', {
        y: '+=20',
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
    });

    gsap.to('.absolute.bottom-20.right-20', {
        y: '-=30',
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
    });
}

// Service Cards Interactions
function initServiceCards() {
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });

            // Add subtle glow effect
            gsap.to(this, {
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(6, 182, 212, 0.2)',
                duration: 0.3
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(this, {
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                duration: 0.3
            });
        });
    });
}

// Loading Animation
function initLoadingAnimation() {
    const loading = document.querySelector('.loading');
    if (loading) {
        // Simulate loading time
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 2000);
    }
}

// Smooth Scrolling for Navigation
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
    });
});

// Parallax Effect for Background Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Apply parallax to background elements
    gsap.set('.absolute.top-20.left-20, .absolute.bottom-20.right-20', {
        y: rate * 0.1
    });
});

// Performance Optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Responsive adjustments
function handleResize() {
    // Adjust animations based on screen size
    if (window.innerWidth < 768) {
        // Mobile optimizations
        gsap.set('.emotional-btn', { scale: 0.95 });
    } else {
        gsap.set('.emotional-btn', { scale: 1 });
    }
}

window.addEventListener('resize', throttle(handleResize, 100));

// Initialize resize handler
handleResize();

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set('*', { animationDuration: 0.01 });
}
