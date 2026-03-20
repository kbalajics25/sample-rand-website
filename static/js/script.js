// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        
        // Update active state
        navLinkItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Intersection Observer for section animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// Style Quiz
const quizQuestions = [
    {
        id: 'q1',
        question: 'What design aesthetic appeals to you most?',
        options: [
            { value: 'clean', label: 'Clean & Minimal', icon: 'fas fa-square' },
            { value: 'ornate', label: 'Ornate & Detailed', icon: 'fas fa-crown' },
            { value: 'mixed', label: 'Mix of Styles', icon: 'fas fa-palette' },
            { value: 'natural', label: 'Natural & Organic', icon: 'fas fa-leaf' }
        ]
    },
    {
        id: 'q2',
        question: 'What color palette do you prefer?',
        options: [
            { value: 'neutral', label: 'Neutral & Calm', icon: 'fas fa-circle' },
            { value: 'vibrant', label: 'Bold & Vibrant', icon: 'fas fa-fire' },
            { value: 'earthy', label: 'Earthy Tones', icon: 'fas fa-mountain' },
            { value: 'monochrome', label: 'Black & White', icon: 'fas fa-adjust' }
        ]
    },
    {
        id: 'q3',
        question: 'How do you want your space to feel?',
        options: [
            { value: 'functional', label: 'Functional & Practical', icon: 'fas fa-tools' },
            { value: 'cozy', label: 'Cozy & Warm', icon: 'fas fa-home' },
            { value: 'luxurious', label: 'Luxurious & Elegant', icon: 'fas fa-gem' },
            { value: 'creative', label: 'Creative & Inspiring', icon: 'fas fa-lightbulb' }
        ]
    },
    {
        id: 'q4',
        question: 'What materials do you gravitate towards?',
        options: [
            { value: 'wood', label: 'Natural Wood', icon: 'fas fa-tree' },
            { value: 'metal', label: 'Metal & Glass', icon: 'fas fa-cog' },
            { value: 'fabric', label: 'Soft Fabrics', icon: 'fas fa-tshirt' },
            { value: 'stone', label: 'Stone & Concrete', icon: 'fas fa-cubes' }
        ]
    },
    {
        id: 'q5',
        question: 'How important is sustainability?',
        options: [
            { value: 'very', label: 'Very Important', icon: 'fas fa-recycle' },
            { value: 'somewhat', label: 'Somewhat Important', icon: 'fas fa-leaf' },
            { value: 'neutral', label: 'Neutral', icon: 'fas fa-balance-scale' },
            { value: 'notmuch', label: 'Not a Priority', icon: 'fas fa-minus' }
        ]
    }
];

let currentQuestion = 0;
let quizAnswers = {};

function startQuiz() {
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizQuestions').style.display = 'block';
    currentQuestion = 0;
    quizAnswers = {};
    renderQuestion();
}

function renderQuestion() {
    const container = document.getElementById('quizQuestions');
    const question = quizQuestions[currentQuestion];
    
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    
    container.innerHTML = `
        <div class="quiz-progress">
            <div class="quiz-progress-bar" style="width: ${progress}%"></div>
        </div>
        <div class="quiz-question">
            <h4>Question ${currentQuestion + 1} of ${quizQuestions.length}</h4>
            <h3>${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map(option => `
                    <div class="quiz-option" onclick="selectQuizOption('${question.id}', '${option.value}')">
                        <i class="${option.icon}"></i>
                        <div>${option.label}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        <div style="display: flex; gap: 16px; margin-top: 32px;">
            ${currentQuestion > 0 ? `
                <button class="btn btn-outline" onclick="previousQuestion()">
                    <i class="fas fa-arrow-left"></i> Previous
                </button>
            ` : ''}
        </div>
    `;
}

function selectQuizOption(questionId, value) {
    quizAnswers[questionId] = value;
    
    // Visual feedback
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    event.target.closest('.quiz-option').classList.add('selected');
    
    // Auto-advance after selection
    setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
            nextQuestion();
        } else {
            submitQuiz();
        }
    }, 500);
}

function nextQuestion() {
    currentQuestion++;
    renderQuestion();
}

function previousQuestion() {
    currentQuestion--;
    renderQuestion();
}

async function submitQuiz() {
    try {
        const response = await fetch('/api/style-quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: quizAnswers })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayQuizResults(data);
        }
    } catch (error) {
        console.error('Quiz error:', error);
        showModal('Error', 'Failed to process quiz. Please try again.');
    }
}

function displayQuizResults(data) {
    const container = document.getElementById('quizQuestions');
    const results = document.getElementById('quizResults');
    const recommendations = data.recommendations;
    
    container.style.display = 'none';
    results.style.display = 'block';
    
    results.innerHTML = `
        <div class="modal-icon success">
            <i class="fas fa-check-circle"></i>
        </div>
        <h2 class="result-style">${data.primary_style}</h2>
        <p class="result-description">${recommendations.description}</p>
        
        <div class="result-recommendations">
            <div class="result-section">
                <h4><i class="fas fa-palette"></i> Recommended Colors</h4>
                <div class="result-items">
                    ${recommendations.colors.map(color => `
                        <span class="result-item">${color}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="result-section">
                <h4><i class="fas fa-cube"></i> Materials</h4>
                <div class="result-items">
                    ${recommendations.materials.map(material => `
                        <span class="result-item">${material}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="result-section">
                <h4><i class="fas fa-couch"></i> Furniture Styles</h4>
                <div class="result-items">
                    ${recommendations.furniture.map(item => `
                        <span class="result-item">${item}</span>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div style="display: flex; gap: 16px; margin-top: 40px;">
            <button class="btn btn-large btn-primary" onclick="scrollToSection('site-visit')">
                <i class="fas fa-calendar-check"></i> Book Free Consultation
            </button>
            <button class="btn btn-large btn-outline" onclick="resetQuiz()">
                <i class="fas fa-redo"></i> Retake Quiz
            </button>
        </div>
    `;
}

function resetQuiz() {
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizStart').style.display = 'block';
    currentQuestion = 0;
    quizAnswers = {};
}

// Cost Calculator
document.getElementById('estimateForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        property_type: document.getElementById('propertyType').value,
        sqft: document.getElementById('sqft').value,
        quality: document.querySelector('input[name="quality"]:checked').value,
        rooms: Array.from(document.querySelectorAll('input[name="rooms"]:checked'))
            .map(cb => cb.value)
    };
    
    if (formData.rooms.length === 0) {
        showModal('Error', 'Please select at least one room to design.');
        return;
    }
    
    try {
        const response = await fetch('/api/estimate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayEstimate(data.estimate);
        }
    } catch (error) {
        console.error('Estimate error:', error);
        showModal('Error', 'Failed to calculate estimate. Please try again.');
    }
});

function displayEstimate(estimate) {
    const container = document.getElementById('calculatorResult');
    
    container.innerHTML = `
        <div class="estimate-header">
            <h3>Your Estimated Cost</h3>
            <div class="estimate-total">₹${formatCurrency(estimate.total_cost)}</div>
            <p class="estimate-subtitle">₹${formatCurrency(estimate.cost_per_sqft)}/sq.ft</p>
        </div>
        
        <div class="estimate-info">
            <div class="info-box">
                <strong>${estimate.timeline_days} Days</strong>
                <span>Project Timeline</span>
            </div>
            <div class="info-box">
                <strong style="color: ${getEcoColor(estimate.eco_score)}">${estimate.eco_score}/100</strong>
                <span>Eco-Score</span>
            </div>
        </div>
        
        <div class="estimate-details">
            <h4 style="margin-bottom: 16px;">Cost Breakdown</h4>
            <div class="estimate-row">
                <span>Modular Work</span>
                <strong>₹${formatCurrency(estimate.breakdown.modular_work)}</strong>
            </div>
            <div class="estimate-row">
                <span>False Ceiling</span>
                <strong>₹${formatCurrency(estimate.breakdown.false_ceiling)}</strong>
            </div>
            <div class="estimate-row">
                <span>Electrical Work</span>
                <strong>₹${formatCurrency(estimate.breakdown.electrical)}</strong>
            </div>
            <div class="estimate-row">
                <span>Painting</span>
                <strong>₹${formatCurrency(estimate.breakdown.painting)}</strong>
            </div>
            <div class="estimate-row">
                <span>Flooring</span>
                <strong>₹${formatCurrency(estimate.breakdown.flooring)}</strong>
            </div>
            <div class="estimate-row">
                <span>Miscellaneous</span>
                <strong>₹${formatCurrency(estimate.breakdown.miscellaneous)}</strong>
            </div>
        </div>
        
        <button class="btn btn-large btn-primary full-width" onclick="scrollToSection('site-visit')">
            <i class="fas fa-calendar-check"></i> Schedule Free Site Visit
        </button>
        
        <p style="text-align: center; font-size: 14px; color: var(--text-medium); margin-top: 16px;">
            *This is an approximate estimate. Final quote will be provided after site visit.
        </p>
    `;
    
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN').format(Math.round(amount));
}

function getEcoColor(score) {
    if (score >= 80) return 'var(--secondary-color)';
    if (score >= 60) return 'var(--accent-color)';
    return 'var(--error-color)';
}

// Site Visit Form
document.getElementById('siteVisitForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('visitName').value,
        email: document.getElementById('visitEmail').value,
        phone: document.getElementById('visitPhone').value,
        property_type: document.getElementById('visitPropertyType').value,
        sqft: document.getElementById('visitSqft').value,
        address: document.getElementById('visitAddress').value,
        city: document.getElementById('visitCity').value,
        pincode: document.getElementById('visitPincode').value,
        preferred_date: document.getElementById('visitDate').value,
        preferred_time: document.getElementById('visitTime').value
    };
    
    try {
        const response = await fetch('/api/site-visit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showModal(
                'Site Visit Scheduled! 🎉',
                data.message_detail || data.message
            );
            e.target.reset();
        }
    } catch (error) {
        console.error('Site visit error:', error);
        showModal('Error', 'Failed to schedule site visit. Please try again or call us.');
    }
});

// Contact Form
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        message: document.getElementById('contactMessage').value
    };
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showModal('Message Sent!', data.message);
            e.target.reset();
        }
    } catch (error) {
        console.error('Contact error:', error);
        showModal('Error', 'Failed to send message. Please try again.');
    }
});

// Newsletter Form
document.getElementById('newsletterForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('newsletterEmail').value;
    
    try {
        const response = await fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showModal('Subscribed!', data.message);
            e.target.reset();
        }
    } catch (error) {
        console.error('Newsletter error:', error);
        showModal('Error', 'Failed to subscribe. Please try again.');
    }
});

// Modal Functions
function showModal(title, message) {
    const modal = document.getElementById('successModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}

// Close modal on outside click
document.getElementById('successModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'successModal') {
        closeModal();
    }
});

// Set minimum date for site visit
const dateInput = document.getElementById('visitDate');
if (dateInput) {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Tomorrow
    dateInput.min = today.toISOString().split('T')[0];
}

// Add active state to nav links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animation on scroll for cards
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .timeline-item');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .timeline-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toString().includes('+') ? target : Math.round(target) + (target.toString().includes('%') ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.round(start);
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                stat.textContent = '0';
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

console.log('DesignNest Studio - Website Loaded Successfully! 🏠✨');
