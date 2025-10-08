// Scroll to top function for floating area
function scrollToTop() {
    console.log("scrollToTop function called");
    try {
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo(0, 0);
        }
        console.log("Scrolled to top successfully");
    } catch (error) {
        console.error("Error scrolling to top:", error);
        window.scrollTo(0, 0);
    }
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    initializeCounters();
    initializeContactForm();
    initializeResponsiveMenu();
    initializeFloatingArea();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
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
}

// Responsive menu functionality (First JavaScript interaction)
function initializeResponsiveMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Handle window resize for menu alignment
    window.addEventListener('resize', function() {
        const windowWidth = window.innerWidth;
        
        if (windowWidth >= 992) {
            // Desktop view - ensure menu is expanded
            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
        } else {
            // Mobile view - handle menu positioning
            handleMobileMenuAlignment();
        }
    });
    
    // Handle mobile menu alignment
    function handleMobileMenuAlignment() {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar.offsetHeight;
        
        // Adjust menu positioning based on screen size
        if (window.innerWidth < 576) {
            // Extra small screens
            navbarCollapse.style.marginTop = '10px';
        } else if (window.innerWidth < 768) {
            // Small screens
            navbarCollapse.style.marginTop = '5px';
        } else {
            // Medium screens
            navbarCollapse.style.marginTop = '0px';
        }
    }
    
    // Initial call
    handleMobileMenuAlignment();
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .team-card, .contact-info-card, .stat-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Counter animation (Second JavaScript interaction)
function initializeCounters() {
    const counters = [
        { id: 'projectsCount', target: 85, duration: 2000 },
        { id: 'clientsCount', target: 42, duration: 2000 },
        { id: 'yearsCount', target: 3, duration: 2000 },
        { id: 'teamCount', target: 18, duration: 2000 }
    ];
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = counters.find(c => c.id === entry.target.id);
                if (counter && !entry.target.classList.contains('counted')) {
                    animateCounter(entry.target, counter.target, counter.duration);
                    entry.target.classList.add('counted');
                }
            }
        });
    }, { threshold: 0.5 });
    
    // Observe counter elements
    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            counterObserver.observe(element);
        }
    });
}

// Animate counter function
function animateCounter(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (validateForm(data)) {
                showFormSuccess();
                contactForm.reset();
            }
        });
    }
}

// Form validation
function validateForm(data) {
    const errors = [];
    
    if (!data.firstName.trim()) errors.push('First name is required');
    if (!data.lastName.trim()) errors.push('Last name is required');
    if (!data.email.trim()) errors.push('Email is required');
    if (!isValidEmail(data.email)) errors.push('Please enter a valid email');
    if (!data.subject) errors.push('Please select a subject');
    if (!data.message.trim()) errors.push('Message is required');
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form success message
function showFormSuccess() {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.innerHTML = `
        <strong>Success!</strong> Your message has been sent successfully. We'll get back to you soon!
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Show form error messages
function showFormErrors(errors) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show';
    alertDiv.innerHTML = `
        <strong>Please fix the following errors:</strong>
        <ul class="mb-0">
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form);
    
    // Auto-dismiss after 7 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 7000);
}

// Utility function for smooth scrolling
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add CSS for navbar scroll effect
const style = document.createElement('style');
style.textContent = `
    .navbar-scrolled {
        background-color: rgba(58, 49, 83, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(58, 49, 83, 0.2);
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize floating area functionality
function initializeFloatingArea() {
    const floatingArea = document.querySelector('.floating-area');
    if (floatingArea) {
        console.log("Floating area found, adding event listener");
        
        // Add click event listener as backup to onclick attribute
        floatingArea.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Floating area clicked via event listener");
            scrollToTop();
        });
        
        // Add visual feedback on click
        floatingArea.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(0.95)';
        });
        
        floatingArea.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        // Ensure the element is visible and positioned correctly
        floatingArea.style.display = 'block';
        floatingArea.style.visibility = 'visible';
        floatingArea.style.opacity = '1';
        
        console.log("Floating area initialized successfully");
    } else {
        console.warn("Floating area not found on this page");
    }
}
