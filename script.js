// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
const contentSections = document.querySelectorAll('.content-section');

// Navigation functionality
function handleNavigation(clickedButton) {
    const targetSection = clickedButton.getAttribute('data-section');
    
    // Remove active class from all buttons and sections
    navButtons.forEach(btn => btn.classList.remove('active'));
    mobileNavButtons.forEach(btn => btn.classList.remove('active'));
    contentSections.forEach(section => section.classList.remove('active'));
    
    // Add active class to clicked button and target section
    clickedButton.classList.add('active');
    document.getElementById(targetSection).classList.add('active');
    
    // Add smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Desktop navigation
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleNavigation(button);
    });
});

// Mobile navigation
mobileNavButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleNavigation(button);
    });
});

// Typing animation for the love letter
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animate letter content on load
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations
    const letterBody = document.querySelector('.letter-body');
    const paragraphs = letterBody.querySelectorAll('p');
    
    paragraphs.forEach((paragraph, index) => {
        paragraph.style.opacity = '0';
        paragraph.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            paragraph.style.transition = 'all 0.8s ease';
            paragraph.style.opacity = '1';
            paragraph.style.transform = 'translateY(0)';
        }, index * 300);
    });
    
    // Animate collage items on scroll
    const collageItems = document.querySelectorAll('.collage-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, observerOptions);
    
    collageItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
    
    // Add click effects to collage items
    collageItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Initialize lightbox functionality
    initLightbox();
});

// Parallax effect for floating hearts
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hearts = document.querySelectorAll('.heart');
    
    hearts.forEach((heart, index) => {
        const speed = 0.5 + (index * 0.1);
        heart.style.transform = `rotate(45deg) translateY(${scrolled * speed}px)`;
    });
});

// Add hover effects to collage items
document.querySelectorAll('.collage-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add touch feedback for mobile
    item.addEventListener('touchstart', () => {
        item.style.transform = 'scale(0.98)';
    });
    
    item.addEventListener('touchend', () => {
        item.style.transform = 'scale(1)';
    });
});

// Smooth scrolling for navigation
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

// Add confetti effect on special moments
function createConfetti() {
    const colors = ['#ff4081', '#e91e63', '#f06292', '#ff80ab'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => {
            confetti.remove();
        };
    }
}

// Trigger confetti on special interactions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('heart-icon') || 
        e.target.closest('.letter-paper') ||
        e.target.closest('.collage-item')) {
        createConfetti();
    }
});

// Add music player functionality
function addBackgroundMusic() {
    // Create audio element
    const audio = document.createElement('audio');
    audio.id = 'background-music';
    audio.loop = true;
    audio.preload = 'auto';
    
    // Add your music URL here
    // Replace this URL with your actual music file
    audio.src = './assets/audio/background_music.mp3';
    // Alternative: use a local file in your project
    // audio.src = './music/romantic-song.mp3';
    
    // Add audio to page
    document.body.appendChild(audio);
    
    // Try to autoplay when the page loads
    audio.play().catch(error => {
        console.log('Initial autoplay failed:', error);
        // This is expected in most browsers due to autoplay policies
    });
    
    // Auto-play when user interacts with the page (required by browsers)
    document.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(error => {
                console.log('Auto-play failed:', error);
            });
        }
    }, { once: true });
    
    // Also try to autoplay on any user interaction
    document.addEventListener('touchstart', () => {
        if (audio.paused) {
            audio.play().catch(error => {
                console.log('Touch autoplay failed:', error);
            });
        }
    }, { once: true });
    
    document.addEventListener('keydown', () => {
        if (audio.paused) {
            audio.play().catch(error => {
                console.log('Keyboard autoplay failed:', error);
            });
        }
    }, { once: true });
}

// Initialize music button
addBackgroundMusic();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const activeButton = document.querySelector('.nav-btn.active') || document.querySelector('.mobile-nav-btn.active');
    const currentIndex = Array.from(navButtons).indexOf(activeButton);
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const nextIndex = (currentIndex + 1) % navButtons.length;
        navButtons[nextIndex].click();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prevIndex = currentIndex === 0 ? navButtons.length - 1 : currentIndex - 1;
        navButtons[prevIndex].click();
    }
});

// Enhanced touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let isScrolling = false;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    isScrolling = false;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    const touchY = e.changedTouches[0].screenY;
    const touchX = e.changedTouches[0].screenX;
    const diffY = Math.abs(touchY - touchStartY);
    const diffX = Math.abs(touchX - touchStartX);
    
    // If vertical scroll is more than horizontal, it's a scroll gesture
    if (diffY > diffX && diffY > 10) {
        isScrolling = true;
    }
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (isScrolling) return; // Don't handle swipe if user was scrolling
    
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 80; // Increased threshold for better accuracy
    const diff = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);
    
    // Only handle horizontal swipes with minimal vertical movement
    if (Math.abs(diff) > swipeThreshold && diffY < 100) {
        const activeButton = document.querySelector('.nav-btn.active') || document.querySelector('.mobile-nav-btn.active');
        const currentIndex = Array.from(navButtons).indexOf(activeButton);
        
        if (diff > 0) {
            // Swipe left - next section
            const nextIndex = (currentIndex + 1) % navButtons.length;
            navButtons[nextIndex].click();
        } else {
            // Swipe right - previous section
            const prevIndex = currentIndex === 0 ? navButtons.length - 1 : currentIndex - 1;
            navButtons[prevIndex].click();
        }
    }
}

// Mobile-specific optimizations
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Disable floating hearts on mobile for better performance
        const floatingHearts = document.querySelector('.floating-hearts');
        if (floatingHearts) {
            floatingHearts.style.display = 'none';
        }
        
        // Add smooth scrolling for timeline
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            timeline.style.scrollBehavior = 'smooth';
        }
        
        // Optimize touch targets
        const touchTargets = document.querySelectorAll('.nav-btn, .memory-card, .gallery-item');
        touchTargets.forEach(target => {
            target.style.minHeight = '44px'; // iOS minimum touch target
        });
        
        // Add haptic feedback for iOS
        if ('vibrate' in navigator) {
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-btn') || 
                    e.target.closest('.memory-card') || 
                    e.target.closest('.gallery-item')) {
                    navigator.vibrate(10);
                }
            });
        }
    }
}

// Initialize mobile optimizations
optimizeForMobile();

// Re-optimize on resize
window.addEventListener('resize', throttle(() => {
    optimizeForMobile();
}, 250));

// Performance optimization - throttle scroll events
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can go here
}, 16)); // 60fps

// Lightbox functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Add click event to all collage images
    document.querySelectorAll('.collage-item img').forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close lightbox when clicking the close button
    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

 