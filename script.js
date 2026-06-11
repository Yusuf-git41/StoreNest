// script.js - StoreNest Business Webpage

// Interactive features: mobile menu, smooth scroll, form handling, animations, active nav

(function() {
    'use strict';

    // ---------- DOM Elements ----------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobilePanel = document.getElementById('mobilePanel');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    const sections = document.querySelectorAll('section');
    const leadForm = document.getElementById('leadForm');
    const formFeedback = document.getElementById('formFeedback');

    // ---------- Mobile Menu Toggle ----------
    function toggleMobileMenu() {
        if (!mobilePanel) return;
        const isOpen = mobilePanel.style.display === 'flex';
        if (isOpen) {
            mobilePanel.style.display = 'none';
        } else {
            mobilePanel.style.display = 'flex';
        }
    }

    function closeMobileMenu() {
        if (mobilePanel) mobilePanel.style.display = 'none';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on a mobile link
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            closeMobileMenu();
            // Also perform smooth scroll after closing
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ---------- Smooth Scroll for All Anchor Links (nav & buttons) ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update URL without jump (optional)
                history.pushState(null, null, targetId);
                // Active nav highlight handled by scroll spy
            }
        });
    });

    // ---------- Scroll Spy: Update active nav link based on scroll position ----------
    function updateActiveNav() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // offset for sticky header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        if (!currentSectionId) return;
        
        // Update desktop nav
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.substring(1) === currentSectionId) {
                link.classList.add('active-nav');
            } else {
                link.classList.remove('active-nav');
            }
        });
    }
    
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateActiveNav);
    });
    updateActiveNav(); // initial call
    
    // ---------- Form Submission Handler (smart simulation with validation) ----------
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName')?.value.trim() || '';
            const phone = document.getElementById('phone')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const city = document.getElementById('city')?.value || '';
            const message = document.querySelector('textarea')?.value.trim() || '';
            
            // Validation
            if (!fullName) {
                showFormFeedback('Please enter your full name.', 'error');
                return;
            }
            if (!phone || phone.length < 8) {
                showFormFeedback('Please enter a valid phone number.', 'error');
                return;
            }
            if (email && !isValidEmail(email)) {
                showFormFeedback('Please enter a valid email address (or leave empty).', 'error');
                return;
            }
            
            // Simulate API / backend call (demo)
            showFormFeedback('Sending your request... 📡', 'info');
            
            // Simulate network delay
            setTimeout(() => {
                // Success simulation: In real scenario, send data to server
                console.log('Lead captured:', { fullName, phone, email, city, message });
                showFormFeedback('✅ Thank you! Our team will contact you within 24h with free pickup quote & video proof demo.', 'success');
                leadForm.reset();
                
                // Optional: track conversion (ga4 etc)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'submit_lead_form', { event_category: 'contact', event_label: 'StoreNest' });
                }
            }, 800);
        });
    }
    
    // Helper: email validator
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormFeedback(message, type) {
        if (!formFeedback) return;
        formFeedback.textContent = message;
        formFeedback.style.padding = '12px';
        formFeedback.style.borderRadius = '60px';
        formFeedback.style.marginTop = '16px';
        formFeedback.style.fontWeight = '500';
        if (type === 'error') {
            formFeedback.style.backgroundColor = '#FFF2F0';
            formFeedback.style.color = '#C2410C';
            formFeedback.style.border = '1px solid #FFDAD4';
        } else if (type === 'success') {
            formFeedback.style.backgroundColor = '#E6F4EA';
            formFeedback.style.color = '#1F6E3F';
            formFeedback.style.border = '1px solid #BCE0C8';
        } else {
            formFeedback.style.backgroundColor = '#EFF6FF';
            formFeedback.style.color = '#0C4E6E';
            formFeedback.style.border = '1px solid #CDE5F0';
        }
        
        // Auto clear after 5 seconds if success or error
        setTimeout(() => {
            if (formFeedback && (type === 'success' || type === 'error')) {
                formFeedback.textContent = '';
                formFeedback.style.backgroundColor = '';
                formFeedback.style.border = '';
            }
        }, 5000);
    }
    
    // ---------- Intersection Observer for fade-in animations (enhance user experience) ----------
    const animateElements = document.querySelectorAll('.step-card, .trust-item, .price-card, .problem-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // Also add hero visual subtle entrance
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'scale(0.98)';
        heroVisual.style.transition = 'opacity 0.6s ease, transform 0.5s ease';
        setTimeout(() => {
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'scale(1)';
        }, 200);
    }
    
    // ---------- Dynamic Savings Calculator Simulation (optional micro-interaction) ----------
    // Create a small interactive savings note if needed (bonus)
    const addSavingsNote = () => {
        const heroButtons = document.querySelector('.hero-buttons');
        if (heroButtons && !document.querySelector('.savings-note-dynamic')) {
            const note = document.createElement('div');
            note.className = 'savings-note-dynamic';
            note.innerHTML = '💡 Avg customer saves ₹5400 per 3-month break';
            note.style.fontSize = '0.85rem';
            note.style.marginTop = '20px';
            note.style.fontWeight = '500';
            note.style.color = '#1F5E3A';
            note.style.backgroundColor = '#EBF7EE';
            note.style.display = 'inline-block';
            note.style.padding = '6px 16px';
            note.style.borderRadius = '60px';
            heroButtons.parentNode.insertBefore(note, heroButtons.nextSibling);
        }
    };
    addSavingsNote();
    
    // ---------- Telemetry / Click Event Tracking (helps business insights) ----------
    const trackButtonClick = (buttonName) => {
        console.log(`[StoreNest] User clicked: ${buttonName}`);
        // You can integrate with analytics tools like Google Analytics, Facebook Pixel here
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'click_button', { event_category: 'engagement', event_label: buttonName });
        }
    };
    
    const primaryBtns = document.querySelectorAll('.btn-primary, .btn-outline, .btn-outline-nav');
    primaryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnText = btn.innerText.trim().substring(0, 30);
            trackButtonClick(btnText);
        });
    });
    
    // ---------- Close mobile menu on window resize (if screen becomes desktop) ----------
    window.addEventListener('resize', () => {
        if (window.innerWidth > 880 && mobilePanel && mobilePanel.style.display === 'flex') {
            closeMobileMenu();
        }
    });
    
    // ---------- Detect if user visited via special campaign, show banner or not (optional) ----------
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('ref') === 'student') {
        const pricingSection = document.querySelector('#pricing');
        if (pricingSection) {
            const tempBanner = document.createElement('div');
            tempBanner.style.background = '#D9652E';
            tempBanner.style.color = 'white';
            tempBanner.style.padding = '8px';
            tempBanner.style.borderRadius = '40px';
            tempBanner.style.textAlign = 'center';
            tempBanner.style.marginBottom = '20px';
            tempBanner.innerText = '🎓 Student special: 1st month free on 3-month plan! Contact now.';
            pricingSection.prepend(tempBanner);
            setTimeout(() => {
                tempBanner.style.opacity = '0';
                setTimeout(() => tempBanner.remove(), 1000);
            }, 5000);
        }
    }
    
    // ---------- Scroll to top button (optional but UX friendly) ----------
    const createScrollTopButton = () => {
        const btn = document.createElement('button');
        btn.innerHTML = '↑';
        btn.setAttribute('aria-label', 'Back to top');
        btn.style.position = 'fixed';
        btn.style.bottom = '24px';
        btn.style.right = '24px';
        btn.style.width = '48px';
        btn.style.height = '48px';
        btn.style.borderRadius = '50%';
        btn.style.backgroundColor = '#D9652E';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.fontSize = '1.6rem';
        btn.style.cursor = 'pointer';
        btn.style.boxShadow = '0 6px 14px rgba(0,0,0,0.2)';
        btn.style.zIndex = '99';
        btn.style.display = 'none';
        btn.style.transition = '0.2s';
        document.body.appendChild(btn);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });
        
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            trackButtonClick('Scroll to top');
        });
    };
    createScrollTopButton();
    
    // ---------- Lazy load friendly: Preload hover effect on pricing cards ----------
    const priceCards = document.querySelectorAll('.price-card');
    priceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
            card.style.transition = 'transform 0.2s';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
    
    // Buy Space - Select Plan Function
function selectSpace(spaceName, price) {
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Auto-fill the message with selected plan
    const messageField = document.querySelector('textarea');
    if (messageField) {
        messageField.value = `Interested in ${spaceName} - ₹${price}/month. Please contact me with details.`;
    }
    
    // Optional: Show confirmation
    alert(`You selected ${spaceName} (₹${price}/month).\nFill the form below and our team will contact you!`);
}
    
    // ---------- Final console info for business owner (Discreet) ----------
    console.log('StoreNest webpage ready | Tagline: Store it today, move in tomorrow | Trust-driven storage solution');
})();










