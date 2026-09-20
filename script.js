// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Scroll behavior for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Back to top
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;

function animateCounters() {
    statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * eased);

            if (target >= 1000) {
                el.textContent = current.toLocaleString('fr-FR');
            } else {
                el.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                if (target >= 1000) {
                    el.textContent = target.toLocaleString('fr-FR') + '+';
                } else {
                    el.textContent = target;
                }
            }
        }
        requestAnimationFrame(update);
    });
}

// Trigger counter on scroll into view
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

// ===== SCROLL ANIMATIONS =====
const animateElements = document.querySelectorAll(
    '.about-card, .mission-card, .timeline-content, .problem-card, ' +
    '.member-category, .partner-card, .news-card, .chiffre-item, ' +
    '.contact-card, .pillar, .call-to-action-box'
);

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    scrollObserver.observe(el);
});

// ===== HERO PARTICLES =====
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255,255,255,${Math.random() * 0.15 + 0.05});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
            50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
    `;
    document.head.appendChild(style);
}

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> <span>Message envoyé !</span>';
    btn.style.background = '#27ae60';
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        e.target.reset();
    }, 3000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
