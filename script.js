/**
 * Premium South Indian Wedding Invitation Website
 * JavaScript functionality for animations, interactions, and dynamic features
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    weddingDate: new Date('2026-05-07T00:00:00').getTime(),
    musicEnabled: true,
    autoPlayMusic: false,
};

// ============================================
// DOM ELEMENTS
// ============================================

const loadingScreen = document.getElementById('loadingScreen');
const scrollProgress = document.getElementById('scrollProgress');
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const backToTop = document.getElementById('backToTop');
const enterButton = document.getElementById('enterButton');
const heroSection = document.getElementById('heroSection');
const carouselTrack = document.getElementById('carouselTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselIndicators = document.getElementById('carouselIndicators');

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeLoading();
    initializeScrollProgress();
    initializeNavigation();
    initializeCountdown();
    initializeCarousel();
    initializeMusicControls();
    initializeBackToTop();
    initializeEditableFields();
    initializeScrollAnimations();
});

// ============================================
// LOADING SCREEN
// ============================================

function initializeLoading() {
    // Loading screen fades out after 3 seconds (defined in CSS)
    // This ensures the page is ready
    setTimeout(() => {
        loadingScreen.style.pointerEvents = 'none';
    }, 3000);
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
    scrollProgress.style.width = scrollPercent + '%';
}

// ============================================
// NAVIGATION
// ============================================

function initializeNavigation() {
    // Smooth scroll to details section
    enterButton.addEventListener('click', (e) => {
        e.preventDefault();
        const detailsSection = document.getElementById('detailsSection');
        detailsSection.scrollIntoView({ behavior: 'smooth' });
    });
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
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// ============================================
// GALLERY CAROUSEL
// ============================================

function initializeCarousel() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const totalItems = galleryItems.length;
    let currentIndex = 0;

    // Create indicators
    for (let i = 0; i < totalItems; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        carouselIndicators.appendChild(indicator);
    }

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;

        // Update indicators
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
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
    carouselNext.addEventListener('click', nextSlide);
    carouselPrev.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // Auto-advance carousel every 5 seconds
    setInterval(nextSlide, 5000);
}

// ============================================
// MUSIC CONTROLS
// ============================================

function initializeMusicControls() {
    musicToggle.addEventListener('click', toggleMusic);

    // Auto-play music if enabled (muted initially for browser policies)
    if (CONFIG.autoPlayMusic) {
        backgroundMusic.muted = true;
        backgroundMusic.play().catch(() => {
            // Browser blocked auto-play, user must click play button
        });
    }
}

function toggleMusic() {
    const isPlaying = !backgroundMusic.paused;

    if (isPlaying) {
        backgroundMusic.pause();
        musicToggle.classList.remove('active');
    } else {
        backgroundMusic.play().catch(() => {
            console.log('Audio playback failed');
        });
        musicToggle.classList.add('active');
    }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

function initializeBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}

// ============================================
// EDITABLE FIELDS
// ============================================

function initializeEditableFields() {
    const editableFields = document.querySelectorAll('.editable-field');

    editableFields.forEach((field) => {
        field.addEventListener('click', () => makeEditable(field));
    });

    // Load saved data from localStorage
    loadSavedData();
}

function makeEditable(field) {
    if (field.querySelector('input')) return; // Already editing

    const currentText = field.textContent.trim();
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'editable-input';
    input.style.cssText = `
        padding: 0.5rem;
        border: 2px solid var(--color-gold);
        border-radius: 4px;
        font-family: inherit;
        font-size: inherit;
    `;

    field.replaceWith(input);
    input.focus();
    input.select();

    function finishEditing() {
        const newText = input.value.trim() || currentText;
        const newField = document.createElement('p');
        newField.className = 'editable-field';
        newField.textContent = newText;
        newField.setAttribute('data-field', field.getAttribute('data-field'));
        newField.addEventListener('click', () => makeEditable(newField));

        input.replaceWith(newField);

        // Save to localStorage
        const fieldName = field.getAttribute('data-field');
        if (fieldName) {
            localStorage.setItem(`wedding_${fieldName}`, newText);
        }
    }

    input.addEventListener('blur', finishEditing);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') finishEditing();
    });
}

function loadSavedData() {
    const fields = document.querySelectorAll('.editable-field');
    fields.forEach((field) => {
        const fieldName = field.getAttribute('data-field');
        if (fieldName) {
            const savedValue = localStorage.getItem(`wedding_${fieldName}`);
            if (savedValue) {
                field.textContent = savedValue;
            }
        }
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

    // Observe cards and sections
    document.querySelectorAll('.detail-card, .rsvp-button').forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// ============================================
// PARALLAX EFFECT (subtle)
// ============================================

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroImage = document.querySelector('.hero-image-placeholder');

    if (heroImage && scrollY < window.innerHeight) {
        // Subtle parallax effect
        heroImage.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy loading for images (when real images are added)
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

    document.querySelectorAll('img[data-src]').forEach((img) => imageObserver.observe(img));
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Log version info
console.log('%c✨ Premium South Indian Wedding Invitation Website ✨', 'color: #D4AF37; font-size: 14px; font-weight: bold;');
console.log('%cMade with ❤️', 'color: #5A3A22; font-size: 12px;');

// Check for support
function logSupport() {
    const features = {
        localStorage: typeof Storage !== 'undefined',
        intersectionObserver: 'IntersectionObserver' in window,
        cssVariables: CSS.supports('color', 'var(--color-brown)'),
        smoothScroll: 'scrollBehavior' in document.documentElement.style,
    };

    console.log('%c📋 Browser Support:', 'color: #D4AF37; font-weight: bold;');
    Object.entries(features).forEach(([feature, supported]) => {
        console.log(`  ${feature}: ${supported ? '✓' : '✗'}`);
    });
}

logSupport();
