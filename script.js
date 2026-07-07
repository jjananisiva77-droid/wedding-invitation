/**
 * Premium South Indian Wedding Invitation Website
 * Enhanced JavaScript with smooth interactions and dynamic features
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    weddingDate: new Date('2025-05-07T10:30:00').getTime(),
    musicEnabled: false,
    autoPlayMusic: false,
};

// ============================================
// DOM ELEMENTS CACHE
// ============================================

const DOM = {
    loadingScreen: document.getElementById('loadingScreen'),
    scrollProgress: document.getElementById('scrollProgress'),
    musicToggle: document.getElementById('musicToggle'),
    backgroundMusic: document.getElementById('backgroundMusic'),
    backToTop: document.getElementById('backToTop'),
    heroSection: document.getElementById('heroSection'),
    countdownSection: document.getElementById('countdownSection'),
    carouselTrack: document.getElementById('carouselTrack'),
    carouselPrev: document.getElementById('carouselPrev'),
    carouselNext: document.getElementById('carouselNext'),
    carouselIndicators: document.getElementById('carouselIndicators'),
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeLoading();
    initializeScrollProgress();
    initializeCountdown();
    initializeCarousel();
    initializeMusicControls();
    initializeBackToTop();
    initializeScrollAnimations();
    initializeParallax();
});

// ============================================
// LOADING SCREEN
// ============================================

function initializeLoading() {
    setTimeout(() => {
        DOM.loadingScreen.style.pointerEvents = 'none';
    }, 2500);
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

function initializeScrollProgress() {
    window.addEventListener('scroll', updateScrollProgress);
}

function updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const scrollPercent = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
    DOM.scrollProgress.style.width = scrollPercent + '%';
}

// ============================================
// COUNTDOWN TIMER
// ============================================

function initializeCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = CONFIG.weddingDate - now;

    if (timeLeft < 0) {
        setCountdownElements('0', '0', '0', '0');
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    setCountdownElements(
        String(days).padStart(2, '0'),
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0')
    );
}

function setCountdownElements(days, hours, minutes, seconds) {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
}

// ============================================
// GALLERY CAROUSEL
// ============================================

function initializeCarousel() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const totalItems = galleryItems.length;

    if (totalItems === 0) return;

    let currentIndex = 0;

    // Create indicators
    galleryItems.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        DOM.carouselIndicators.appendChild(indicator);
    });

    function updateCarousel() {
        const offset = -currentIndex * 100;
        DOM.carouselTrack.style.transform = `translateX(${offset}%)`;

        // Update indicators
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = (index + totalItems) % totalItems;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    // Event listeners
    DOM.carouselNext.addEventListener('click', nextSlide);
    DOM.carouselPrev.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // Touch navigation for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    DOM.carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    DOM.carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) nextSlide();
        if (touchEndX - touchStartX > 50) prevSlide();
    });

    // Auto-advance carousel
    setInterval(nextSlide, 6000);
}

// ============================================
// MUSIC CONTROLS
// ============================================

function initializeMusicControls() {
    DOM.musicToggle.addEventListener('click', toggleMusic);
}

function toggleMusic() {
    const isPlaying = !DOM.backgroundMusic.paused;

    if (isPlaying) {
        DOM.backgroundMusic.pause();
        DOM.musicToggle.classList.remove('active');
    } else {
        DOM.backgroundMusic.play().catch((error) => {
            console.log('Audio playback failed:', error);
        });
        DOM.musicToggle.classList.add('active');
    }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

function initializeBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            DOM.backToTop.classList.add('show');
        } else {
            DOM.backToTop.classList.remove('show');
        }
    });

    DOM.backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToObserve = [
        '.couple-story',
        '.countdown-section',
        '.gallery-section',
        '.venue-section',
    ];

    elementsToObserve.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(element);
        });
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================

function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroImage = document.querySelector('.hero-bg-image');

        if (heroImage && scrollY < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrollY * 0.4}px)`;
        }
    });
}

// ============================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
    });
}

// ============================================
// UTILITY: BROWSER FEATURE DETECTION
// ============================================

function detectBrowserFeatures() {
    return {
        localStorage: typeof Storage !== 'undefined',
        intersectionObserver: 'IntersectionObserver' in window,
        cssVariables: CSS.supports('color', 'var(--color-brown)'),
        smoothScroll: 'scrollBehavior' in document.documentElement.style,
        touchEvents: 'ontouchstart' in window,
    };
}

// ============================================
// CONSOLE MESSAGING
// ============================================

console.log('%c✨ Sudharsan & Janani - Wedding Invitation ✨', 
    'color: #D4AF37; font-size: 16px; font-weight: bold; text-shadow: 2px 2px 4px #5A3A22');
console.log('%cMade with ❤️ and Care', 'color: #5A3A22; font-size: 12px; font-weight: bold;');

const features = detectBrowserFeatures();
console.log('%c📋 Browser Capabilities:', 'color: #D4AF37; font-weight: bold;');
Object.entries(features).forEach(([feature, supported]) => {
    console.log(`   ${feature}: ${supported ? '✓ Supported' : '✗ Not Supported'}`);
});

// ============================================
// ACCESSIBILITY FEATURES
// ============================================

// Skip to main content link for accessibility
function addAccessibilityFeatures() {
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.prepend(skipLink);
    }
}

addAccessibilityFeatures();

// ============================================
// MOBILE MENU HANDLING (if needed)
// ============================================

// Detect viewport changes
window.addEventListener('orientationchange', () => {
    console.log('Orientation changed');
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%c⏱️ Page Load Time: ${pageLoadTime}ms`, 'color: #D4AF37;');
    });
}

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// ============================================
// RESPONSIVE IMAGE SRCSET SUPPORT
// ============================================

// Detect if browser supports srcset
const supportsSrcset = 'srcset' in new Image();
console.log(`%cSrcset Support: ${supportsSrcset ? '✓' : '✗'}`, 'color: #D4AF37;');

// ============================================
// VIEWPORT UNITS POLYFILL CHECK
// ============================================

const viewportUnitsSupport = () => {
    const test = document.createElement('div');
    test.style.width = '100vh';
    return test.style.width !== '';
};

console.log(`%cViewport Units Support: ${viewportUnitsSupport() ? '✓' : '✗'}`, 'color: #D4AF37;');
