// 3D Flip Card JavaScript
// Handles mobile touch interactions and button functionality

// Mobile touch support for flip cards
const flipCards = document.querySelectorAll('.flip-card');

// Check if device is touch-enabled
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
    // Add click/touch functionality for mobile devices
    flipCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent button clicks from triggering flip
            if (e.target.classList.contains('buy-button')) {
                return;
            }
            
            // Toggle flipped class
            this.classList.toggle('flipped');
        });
    });

    // Add touch feedback
    flipCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Button functionality
const buyButtons = document.querySelectorAll('.buy-button');

buyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card flip on button click
        
        const originalText = this.textContent;
        const card = this.closest('.flip-card');
        const productName = card.querySelector('.product-name').textContent;
        const price = card.querySelector('.price').textContent;
        
        // Button animation - Adding to cart
        this.textContent = 'Adding...';
        this.style.background = '#fbbf24';
        this.style.color = 'white';
        this.disabled = true;
        
        // Simulate adding to cart
        setTimeout(() => {
            this.textContent = 'Added! ✓';
            this.style.background = '#4ade80';
            this.style.color = 'white';
            
            // Show console message (in real app, this would add to cart)
            console.log(`Added to cart: ${productName} - ${price}`);
            
            // Show alert with product details
            showNotification(`${productName} added to cart!`);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = 'white';
                this.style.color = '#764ba2';
                this.disabled = false;
            }, 2000);
        }, 1000);
    });
});

// Notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notificationStyle')) {
        const style = document.createElement('style');
        style.id = 'notificationStyle';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Optional: Add keyboard accessibility
flipCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Product card - press Enter to flip');
    
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (isTouchDevice) {
                this.classList.toggle('flipped');
            }
        }
    });
});

// Track card flips for analytics (optional)
let flipCount = 0;

flipCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        if (!isTouchDevice) {
            flipCount++;
            console.log(`Card ${index + 1} flipped. Total flips: ${flipCount}`);
        }
    });
});

// Prevent accidental text selection during flip
flipCards.forEach(card => {
    card.addEventListener('mousedown', function(e) {
        e.preventDefault();
    });
});

// Add smooth scroll to top if cards are clicked (optional feature)
window.addEventListener('load', () => {
    console.log('3D Flip Cards loaded successfully!');
    console.log(`Total cards: ${flipCards.length}`);
    console.log(`Touch device: ${isTouchDevice}`);
});

// Performance: Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        flipCards.forEach(card => {
            card.style.animationPlayState = 'paused';
        });
    } else {
        flipCards.forEach(card => {
            card.style.animationPlayState = 'running';
        });
    }
});

// Optional: Add cart counter
let cartCount = 0;
const updateCartCount = () => {
    cartCount++;
    console.log(`Items in cart: ${cartCount}`);
    // In a real application, you would update a cart icon here
};

// Attach to buy buttons
buyButtons.forEach(button => {
    button.addEventListener('click', updateCartCount);
});
