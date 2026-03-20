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

// Contact Form
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const nameInput = document.getElementById("name");
  const mobileInput = document.getElementById("mobile_number");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const mobileError = document.getElementById("mobileError");
  const messageError = document.getElementById("messageError");
  const formMessage = document.getElementById("formMessage");

  function resetMessages() {
    if (nameError) nameError.textContent = "";
    if (mobileError) mobileError.textContent = "";
    if (messageError) messageError.textContent = "";
    if (formMessage) {
      formMessage.textContent = "";
      formMessage.classList.remove("success", "error");
    }
  }

  function validateForm() {
    let valid = true;
    const name = nameInput.value.trim();
    const mobile = mobileInput.value.trim();
    const message = messageInput.value.trim();

    resetMessages();

    if (!name) {
      nameError.textContent = "Name is required.";
      valid = false;
    }

    if (!mobile) {
      mobileError.textContent = "Mobile number is required.";
      valid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      mobileError.textContent = "Mobile number must be exactly 10 digits.";
      valid = false;
    }

    if (!message) {
      messageError.textContent = "Message is required.";
      valid = false;
    }

    return valid;
  }

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      name: nameInput.value.trim(),
      mobile_number: mobileInput.value.trim(),
      message: messageInput.value.trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        formMessage.textContent =
          data.message || "Thank you! We will contact you soon.";
        formMessage.classList.add("success");
        nameInput.value = "";
        mobileInput.value = "";
        messageInput.value = "";
      } else {
        if (data.errors) {
          if (data.errors.name && nameError) {
            nameError.textContent = data.errors.name;
          }
          if (data.errors.mobile_number && mobileError) {
            mobileError.textContent = data.errors.mobile_number;
          }
          if (data.errors.message && messageError) {
            messageError.textContent = data.errors.message;
          }
        }

        formMessage.textContent =
          data.message ||
          "There was a problem submitting the form. Please try again.";
        formMessage.classList.add("error");
      }
    } catch (error) {
      formMessage.textContent =
        "Network error. Please check your connection and try again.";
      formMessage.classList.add("error");
    }
  });
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
