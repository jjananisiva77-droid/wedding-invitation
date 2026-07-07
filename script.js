/* =====================================================================
   SUDHARSAN ❤️ JANANI
   Luxury Premium Wedding Invitation Website

   JavaScript Implementation
   Production-Ready Code with GSAP Animations
===================================================================== */

'use strict';

/* =====================================================================
   INITIALIZATION & CONFIGURATION
===================================================================== */

// Register GSAP ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

// Smooth Scrolling with Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Request Animation Frame Loop for Lenis
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

// Tell GSAP to use Lenis for scrollTo
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* =====================================================================
   LOADER ANIMATION
===================================================================== */

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const loaderOm = document.querySelector('.loader-om');
    const loaderText = document.querySelectorAll('.loader-content h2, .loader-content p');

    // Animate loader elements
    gsap.timeline()
        .to(loaderOm, {
            scale: 1.2,
            duration: 0.6,
            ease: 'power2.out'
        })
        .to(loaderOm, {
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)'
        })
        .to(loaderText, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            stagger: 0.1,
            delay: 1
        })
        .to(loaderOm, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.in'
        }, '-=0.3')
        .to(loader, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
                initHeroAnimations();
            }
        });
});

/* =====================================================================
   HERO ANIMATIONS
===================================================================== */

function initHeroAnimations() {
    const heroTimeline = gsap.timeline();

    // Animate hero content elements
    heroTimeline
        .from('.hero-top', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.hero-middle h1:first-child', {
            opacity: 0,
            x: -100,
            scale: 0.8,
            duration: 1.2,
            ease: 'power4.out'
        }, '-=0.5')
        .from('.hero-heart', {
            opacity: 0,
            scale: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
        }, '-=0.8')
        .from('.hero-middle h1:last-child', {
            opacity: 0,
            x: 100,
            scale: 0.8,
            duration: 1.2,
            ease: 'power4.out'
        }, '-=1')
        .from('.hero-bottom', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.scroll-indicator', {
            opacity: 0,
            y: -20,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.3');
}

/* =====================================================================
   NAVBAR SCROLL EFFECT
===================================================================== */

const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

/* =====================================================================
   SMOOTH SCROLL FOR NAVIGATION LINKS
===================================================================== */

document.querySelectorAll('nav a[href^="#"], .enter-btn').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            lenis.scrollTo(target, {
                offset: -100,
                duration: 1.5,
                easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
            });
        }
    });
});

/* =====================================================================
   COUNTDOWN TIMER
===================================================================== */

function initCountdown() {
    // Wedding Date: May 7, 2025 (Update time when muhurtham is announced)
    const weddingDate = new Date('2025-05-07T00:00:00').getTime();

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            // Wedding day has arrived
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Add flip animation effect
        animateNumber(daysElement, days);
        animateNumber(hoursElement, hours);
        animateNumber(minutesElement, minutes);
        animateNumber(secondsElement, seconds);
    }

    function animateNumber(element, value) {
        const newValue = String(value).padStart(2, '0');
        const oldValue = element.textContent;

        if (newValue !== oldValue) {
            gsap.fromTo(element,
                {
                    y: -20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                    onStart: () => {
                        element.textContent = newValue;
                    }
                }
            );
        }
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize countdown when page loads
initCountdown();

/* =====================================================================
   SCROLL ANIMATIONS - GSAP ScrollTrigger
===================================================================== */

// Story Section Animation
gsap.from('.story-image', {
    scrollTrigger: {
        trigger: '.story-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
});

gsap.from('.story-content', {
    scrollTrigger: {
        trigger: '.story-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
});

// Wedding Details Animation
gsap.from('.detail-box', {
    scrollTrigger: {
        trigger: '.details-section',
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
});

// Countdown Animation
gsap.from('.count-box', {
    scrollTrigger: {
        trigger: '.countdown-section',
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'back.out(1.7)'
});

// Gallery Animation
gsap.from('.gallery-item', {
    scrollTrigger: {
        trigger: '.gallery-section',
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out'
});

// Venue Animation
gsap.from('.venue-left', {
    scrollTrigger: {
        trigger: '.venue-section',
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    x: -80,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
});

gsap.from('.venue-right', {
    scrollTrigger: {
        trigger: '.venue-section',
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    x: 80,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
});

// RSVP Animation
gsap.from('.rsvp-card', {
    scrollTrigger: {
        trigger: '.rsvp-section',
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    scale: 0.9,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Footer Animation
gsap.from('.footer-content', {
    scrollTrigger: {
        trigger: 'footer',
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

/* =====================================================================
   PARALLAX EFFECTS
===================================================================== */

// Hero background parallax
gsap.to('.hero-bg', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: 300,
    ease: 'none'
});

// Story image parallax
gsap.to('.story-image img', {
    scrollTrigger: {
        trigger: '.story-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
    },
    y: 50,
    ease: 'none'
});

/* =====================================================================
   GALLERY HOVER EFFECTS
===================================================================== */

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        gsap.to(this.querySelector('img'), {
            scale: 1.15,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    item.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector('img'), {
            scale: 1,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
});

/* =====================================================================
   DETAIL BOX HOVER EFFECTS
===================================================================== */

document.querySelectorAll('.detail-box').forEach(box => {
    box.addEventListener('mouseenter', function() {
        gsap.to(this.querySelector('.detail-icon'), {
            rotation: 360,
            scale: 1.1,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    box.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector('.detail-icon'), {
            rotation: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
});

/* =====================================================================
   BUTTON RIPPLE EFFECT
===================================================================== */

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

document.querySelectorAll('.enter-btn, .map-btn, .rsvp-buttons a').forEach(button => {
    button.addEventListener('click', createRipple);
});

/* =====================================================================
   SECTION TITLE ANIMATIONS
===================================================================== */

document.querySelectorAll('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
});

/* =====================================================================
   FLOATING ANIMATION FOR GOLD FRAME
===================================================================== */

gsap.to('.gold-frame', {
    y: -10,
    duration: 3,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true
});

/* =====================================================================
   CURSOR TRAIL EFFECT (OPTIONAL LUXURY FEATURE)
===================================================================== */

const cursor = document.createElement('div');
cursor.classList.add('luxury-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out'
    });
});

// Add cursor styles dynamically
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .luxury-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid rgba(212, 175, 55, 0.5);
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.2s ease;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(cursorStyle);

/* =====================================================================
   PERFORMANCE OPTIMIZATION
===================================================================== */

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0.01);
    lenis.destroy();
}

/* =====================================================================
   CONSOLE MESSAGE
===================================================================== */

console.log('%c💍 Sudharsan ❤️ Janani', 'font-size: 24px; color: #D4AF37; font-weight: bold;');
console.log('%cLuxury Wedding Invitation Website', 'font-size: 14px; color: #4E342E;');
console.log('%cWith Divine Blessings of Goddess Meenakshi Amman', 'font-size: 12px; color: #6D4C41; font-style: italic;');

/* =====================================================================
   END OF SCRIPT
===================================================================== */
