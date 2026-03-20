// Typing effect for hero section
const typingTexts = [
    "Android Developer",
    "Kotlin & Jetpack Compose",
    "Clean Architecture",
    "Open to work"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = typingTexts[textIndex];
    const typingElement = document.getElementById('typing-text');
    
    if (!typingElement) return;
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Start typing effect
    typeText();
    
    // Cargar proyectos desde la API
    loadProjectsFromAPI();
    
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Enviar a la API de Vercel
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, subject, message }),
                });

                const result = await response.json();

                if (response.ok) {
                    showNotification(result.message || 'Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    showNotification(result.message || 'Failed to send message. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Network error. Please try again later.', 'error');
            }
        });
    }
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
    });
    
    // Add animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-6 px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    
    // Set colors based on type
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add parallax effect to hero section con requestAnimationFrame para optimizar rendimiento
let ticking = false;
function updateParallax() {
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const scrolled = window.pageYOffset;
        const parallax = heroSection.querySelector('.container');
        if (parallax) {
            const speed = 0.5;
            parallax.style.transform = `translateY(${scrolled * speed}px)`;
        }
    }
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Add hover effect to project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.card-hover');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-purple-600');
        link.classList.add('text-gray-700');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.remove('text-gray-700');
            link.classList.add('text-purple-600');
        }
    });
});

// Cargar proyectos desde la API
async function loadProjectsFromAPI() {
    try {
        const response = await fetch('/api/test');
        const data = await response.json();
        
        if (response.ok && data.sampleData.projects) {
            renderProjects(data.sampleData.projects);
        } else {
            console.error('Error loading projects from API');
        }
    } catch (error) {
        console.error('API call failed:', error);
    }
}

// Renderizar proyectos dinámicamente
function renderProjects(projects) {
    const projectsContainer = document.querySelector('#projects .grid');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = projects.map(project => `
        <div class="card-hover bg-white rounded-lg shadow-lg p-6 transition-all duration-300">
            <h3 class="text-xl font-bold text-gray-800 mb-2">${project.title}</h3>
            <p class="text-gray-600 mb-4">${project.description}</p>
            <div class="flex flex-wrap gap-2">
                ${project.tech.map(tech => `
                    <span class="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">${tech}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
}
