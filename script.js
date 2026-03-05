// BugBarrier Experts - Main JavaScript
// Pure JavaScript (No React)

document.addEventListener('DOMContentLoaded', function() {
  
  // ===========================================
  // Mobile Menu Toggle
  // ===========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      const isActive = mobileMenu.classList.contains('active');
      
      if (isActive) {
        mobileMenu.classList.remove('active');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      } else {
        mobileMenu.classList.add('active');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
      }
    });
  }

  // Close mobile menu when a link is clicked
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
  mobileMenuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    });
  });

  // ===========================================
  // Contact Form Handling
  // ===========================================
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };
      
      // Log form data (in a real app, this would send to a backend)
      console.log('Form submitted:', formData);
      
      // Show success message
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Message Sent!';
      submitBtn.disabled = true;
      
      // Show success message element if it exists
      const successMessage = document.getElementById('form-success');
      if (successMessage) {
        successMessage.style.display = 'block';
      }
      
      // Reset form after 3 seconds
      setTimeout(function() {
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        if (successMessage) {
          successMessage.style.display = 'none';
        }
      }, 3000);
    });
  }

  // ===========================================
  // FAQ Accordion
  // ===========================================
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(function(question) {
    question.addEventListener('click', function() {
      const isActive = this.classList.contains('active');
      const answer = this.nextElementSibling;
      
      // Close all other FAQ items
      faqQuestions.forEach(function(q) {
        if (q !== question) {
          q.classList.remove('active');
          q.nextElementSibling.classList.remove('active');
        }
      });
      
      // Toggle current FAQ item
      if (isActive) {
        this.classList.remove('active');
        answer.classList.remove('active');
      } else {
        this.classList.add('active');
        answer.classList.add('active');
      }
    });
  });

  // ===========================================
  // Smooth Scroll for Anchor Links
  // ===========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        const headerHeight = 80; // Height of sticky header
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===========================================
  // Current Year in Footer
  // ===========================================
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(function(element) {
    element.textContent = currentYear;
  });

  // ===========================================
  // Image Fallback Handling
  // ===========================================
  const images = document.querySelectorAll('img[data-fallback]');
  
  images.forEach(function(img) {
    img.addEventListener('error', function() {
      const fallback = this.getAttribute('data-fallback');
      if (fallback && this.src !== fallback) {
        this.src = fallback;
      }
    });
  });

  // ===========================================
  // Add active class to current page in navigation
  // ===========================================
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-desktop a, .mobile-menu a');
  
  navLinks.forEach(function(link) {
    const linkPath = new URL(link.href).pathname;
    
    // Check if current page matches link
    if (linkPath === currentPath || 
        (currentPath === '/' && linkPath.includes('index.html')) ||
        (currentPath.includes(linkPath) && linkPath !== '/')) {
      link.style.color = 'var(--color-primary)';
      link.style.fontWeight = 'var(--font-weight-semibold)';
    }
  });

});

// ===========================================
// SVG Icon Helper Function
// ===========================================
function createSVGIcon(type, className = '') {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', className);
  svg.setAttribute('width', '24');
  svg.setAttribute('height', '24');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  
  // Different icon types
  const icons = {
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
    menu: '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>',
    x: '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
    mapPin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>',
    chevronDown: '<polyline points="6 9 12 15 18 9"></polyline>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
    award: '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>',
    clock: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
    checkCircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>'
  };
  
  if (icons[type]) {
    svg.innerHTML = icons[type];
  }
  
  return svg;
}
