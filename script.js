// Initialize EmailJS with environment variable
(function() {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "J-yR0NG8QbzeJYatb";
    emailjs.init(publicKey);
})();

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Feature card animation
const featureCards = document.querySelectorAll('.feature-card');

const animateOnScroll = () => {
    featureCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.8;
        
        if (cardPosition < screenPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
// Trigger once on load
animateOnScroll();

// Form submission with EmailJS
document.getElementById('waitlist-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Set timestamp
    document.getElementById('timestamp').value = new Date().toLocaleString();
    
    // Show loading state
    document.getElementById('loading').style.display = 'block';
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    // EmailJS credentials with environment variables
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_c28u0zk';
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_c1lejjk';
    
    // Send form using EmailJS
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
        .then(() => {
            // Success message
            document.getElementById('form-message').className = 'form-message success-message';
            document.getElementById('form-message').textContent = 'Thank you for joining the Solara waitlist! You\'ll receive early access details soon.';
            document.getElementById('form-message').style.display = 'block';
            
            // Reset form
            this.reset();
            document.getElementById('loading').style.display = 'none';
            submitButton.disabled = false;
            
            // Scroll to message
            document.getElementById('form-message').scrollIntoView({ behavior: 'smooth' });
        }, (error) => {
            // Error message
            document.getElementById('form-message').className = 'form-message error-message';
            document.getElementById('form-message').textContent = 'There was an error submitting your form. Please try again.';
            document.getElementById('form-message').style.display = 'block';
            document.getElementById('loading').style.display = 'none';
            submitButton.disabled = false;
            
            console.error('EmailJS Error:', error);
        });
});