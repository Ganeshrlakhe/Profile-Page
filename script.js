// Typewriter effect for header h1
const constantText = 'I AM ';
const dynamicTexts = ['GANESH LAKHE', 'A DEVELOPER', 'A FREELANCER'];
const h1Element = document.querySelector('header .header-content h1');
let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = dynamicTexts[currentTextIndex];

  if (!isDeleting) {
    // Typing
    h1Element.innerHTML =
      constantText +
      currentText.substring(0, charIndex + 1) +
      '<span class="cursor">_</span>';
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2000); // Pause before deleting
      return;
    }
  } else {
    // Deleting
    h1Element.innerHTML =
      constantText +
      currentText.substring(0, charIndex) +
      '<span class="cursor">_</span>';
    charIndex--;
    if (charIndex < 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % dynamicTexts.length;
      setTimeout(typeWriter, 500); // Pause before typing next
      return;
    }
  }

  setTimeout(typeWriter, isDeleting ? 50 : 150); // Slower typing, faster deleting
}

// Start typewriter when page loads
window.addEventListener('load', () => {
  h1Element.textContent = constantText; // Start with constant text
  typeWriter();
});

// Scroll reveal animation for paragraph
const paragraphObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const paragraph = entry.target;
      if (entry.isIntersecting) {
        paragraph.style.opacity = '0.9';
      } else {
        paragraph.style.opacity = '0';
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }
);

// Observe the header paragraph
const headerParagraph = document.querySelector('header .header-content p');
if (headerParagraph) {
  paragraphObserver.observe(headerParagraph);
}

// Observe all elements in the about section with staggered animation
const aboutElements = document.querySelectorAll('#about *');
aboutElements.forEach((element, index) => {
  element.style.transitionDelay = `${index * 0}s`;
  paragraphObserver.observe(element);
});

// Scroll reveal animation for sections
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }
);

// Observe sections for scroll reveal
document.querySelectorAll('section').forEach((section) => {
  sectionObserver.observe(section);
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    const navHeight = document.querySelector('nav').offsetHeight;
    const targetPosition = targetSection.offsetTop - navHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  });
});

// Back to top button functionality
const backToTopBtn = document.querySelector('.back-to-top-link');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Add some interactive hover effects
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Form submission handling with notification
document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const notification = document.getElementById('notification');
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000); // Hide after 3 seconds
});
