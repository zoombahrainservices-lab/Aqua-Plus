// Smooth scroll for navigation links
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

// Form validation and submission
const registrationForm = document.querySelector('.registration-form');
if (registrationForm) {
  registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const company = document.getElementById('company').value.trim();
    const role = document.getElementById('role').value;
    const message = document.getElementById('message').value.trim();
    const newsletter = document.getElementById('newsletter').checked;
    
    // Validate required fields
    if (!firstName || !lastName || !email) {
      alert('Please fill in all required fields (marked with *)');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Success message
    const formData = {
      firstName,
      lastName,
      email,
      phone,
      company,
      role,
      message,
      newsletter
    };
    
    console.log('Form submitted:', formData);
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    registrationForm.reset();
  });
}

// Function to show success message
function showSuccessMessage() {
  const successDiv = document.createElement('div');
  successDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #004aad, #0084ff);
    color: white;
    padding: 40px 60px;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    text-align: center;
    animation: fadeIn 0.3s ease-out;
  `;
  
  successDiv.innerHTML = `
    <div style="font-size: 3rem; margin-bottom: 20px;">✓</div>
    <h2 style="margin-bottom: 15px; font-size: 1.8rem;">Registration Successful!</h2>
    <p style="margin-bottom: 20px; opacity: 0.9;">Thank you for registering. We'll send you event details via email.</p>
    <button onclick="this.parentElement.remove()" style="
      background: white;
      color: #004aad;
      border: none;
      padding: 12px 30px;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      font-size: 1rem;
    ">Close</button>
  `;
  
  document.body.appendChild(successDiv);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (successDiv.parentElement) {
      successDiv.remove();
    }
  }, 5000);
}

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animateElements = document.querySelectorAll('.about-card, .feature-item, .timeline-item, .contact-card, .stat-item');
  
  animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
  });
});

// Countdown timer for stats (animated counting)
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    if (typeof end === 'string') {
      element.innerHTML = end; // For non-numeric values
    } else {
      element.innerHTML = Math.floor(progress * (end - start) + start) + '%';
    }
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Animate stats when visible
const statsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const text = stat.textContent;
        if (text.includes('%')) {
          const value = parseInt(text);
          animateValue(stat, 0, value, 2000);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Add active state to form inputs
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
    this.parentElement.style.transition = 'transform 0.2s ease';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight);
  }
});

// Add hover effect to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
  // Placeholder for mobile menu functionality
  console.log('Mobile menu toggled');
}

// Add loading animation
window.addEventListener('load', function() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Print event details
function printEventDetails() {
  window.print();
}

// Share event
function shareEvent() {
  if (navigator.share) {
    navigator.share({
      title: 'Aquaplus & Prins Launch Event',
      text: 'Join us for the launch of Aquaplus & Prins - Towards a Sustainable Planet',
      url: window.location.href
    }).catch(err => console.log('Error sharing:', err));
  } else {
    // Fallback - copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert('Event link copied to clipboard!');
  }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
  // Press 'R' to scroll to registration
  if (e.key === 'r' || e.key === 'R') {
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Press 'Escape' to close any modal
  if (e.key === 'Escape') {
    document.querySelectorAll('[style*="position: fixed"]').forEach(modal => {
      if (modal.parentElement) {
        modal.remove();
      }
    });
  }
});

// Console message
console.log('%c🚀 Welcome to Aquaplus & Prins Launch Event!', 'color: #0084ff; font-size: 20px; font-weight: bold;');
console.log('%cTowards a Sustainable Planet | Net Zero 2050', 'color: #004aad; font-size: 14px;');

