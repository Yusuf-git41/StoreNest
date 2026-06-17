// ========== REVIEWS SYSTEM ==========
const API_URL = 'http://storenest.rf.gd/api.php';

// Load reviews
async function loadReviews() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    try {
        const response = await fetch(`${API_URL}?action=get_reviews`);
        const reviews = await response.json();
        if (reviews && reviews.length > 0) {
            container.innerHTML = '';
            reviews.forEach(review => {
                const savedAmount = review.saved_amount || 'Happy Customer';
                container.innerHTML += `
                    <div class="review-card">
                        <p class="review-text">"${escapeHtml(review.review_text)}"</p>
                        <div class="reviewer">
                            <div class="reviewer-avatar"><i class="fas fa-user-circle"></i></div>
                            <div class="reviewer-info">
                                <h4>${escapeHtml(review.customer_name)}</h4>
                                <span>${escapeHtml(review.city)}</span>
                                <span class="saved-amount">Saved ${escapeHtml(savedAmount)}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.log('Showing sample reviews');
        showSampleReviews();
    }
}

function showSampleReviews() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    const samples = [
        { customer_name: 'Priya Sharma', city: 'Pune', review_text: 'Saved ₹7,500 during my summer break!', saved_amount: '₹7,500' },
        { customer_name: 'Amit Patel', city: 'Bengaluru', review_text: 'Finally no more dead rent!', saved_amount: '₹10,800/year' }
    ];
    container.innerHTML = '';
    samples.forEach(review => {
        container.innerHTML += `
            <div class="review-card">
                <p class="review-text">"${review.review_text}"</p>
                <div class="reviewer">
                    <div class="reviewer-avatar"><i class="fas fa-user-circle"></i></div>
                    <div class="reviewer-info">
                        <h4>${review.customer_name}</h4>
                        <span>${review.city}</span>
                        <span class="saved-amount">Saved ${review.saved_amount}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

function openReviewPopup() {
    document.getElementById('reviewPopup').style.display = 'flex';
}

function closeReviewPopup() {
    document.getElementById('reviewPopup').style.display = 'none';
    document.getElementById('reviewForm').reset();
    document.getElementById('reviewPopupMessage').innerHTML = '';
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', loadReviews);

document.getElementById('reviewForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('reviewName').value.trim();
    const city = document.getElementById('reviewCity').value.trim();
    const review = document.getElementById('reviewText').value.trim();
    const saved = document.getElementById('reviewSaved').value.trim();
    const messageDiv = document.getElementById('reviewPopupMessage');
    if (!name || !city || !review) {
        messageDiv.innerHTML = 'Please fill all required fields.';
        messageDiv.style.color = 'red';
        return;
    }
    const formData = new FormData();
    formData.append('action', 'add_review');
    formData.append('name', name);
    formData.append('city', city);
    formData.append('review', review);
    formData.append('saved', saved || '');
    try {
        const response = await fetch(API_URL, { method: 'POST', body: formData });
        const result = await response.json();
        if (result.success) {
            messageDiv.innerHTML = '✅ Thank you! Your review will appear after approval.';
            messageDiv.style.color = '#1F5E3A';
            document.getElementById('reviewForm').reset();
            setTimeout(() => { closeReviewPopup(); loadReviews(); }, 2000);
        } else {
            messageDiv.innerHTML = '❌ ' + (result.error || 'Something went wrong.');
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        messageDiv.innerHTML = '❌ Connection error. Please try again.';
        messageDiv.style.color = 'red';
    }
});orAll('.btn-primary, .btn-outline, .btn-outline-nav');
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










