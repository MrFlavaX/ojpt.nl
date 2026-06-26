// OJPT.nl — Main JavaScript
// Carousel, mobile menu, FAQ accordion, form handling

document.addEventListener('DOMContentLoaded', function() {

  // ===== MOBILE MENU =====
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const header = document.querySelector('.site-header');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('open');
      mainNav.classList.toggle('open');
    });

    // Close menu when clicking a link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mainNav.classList.remove('open');
      });
    });
  }

  // ===== HEADER SCROLL EFFECT =====
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.12)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
      }
      lastScroll = currentScroll;
    });
  }

  // ===== CAROUSEL =====
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots
    if (dotsContainer) {
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', 'Ga naar slide ' + (i + 1));
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];

    function updateCarousel() {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function goToSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      updateCarousel();
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto-advance every 6 seconds
    setInterval(nextSlide, 6000);
  }

  // ===== FAQ ACCORDION =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // ===== CONTACT FORM =====
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn');
      const originalText = btn.textContent;
      btn.textContent = 'Verzenden...';
      btn.disabled = true;

      // Simulate sending (replace with actual endpoint)
      setTimeout(() => {
        btn.textContent = '✓ Verzonden!';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 2000);
      }, 1500);
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ===== ACTIVE NAV LINK BASED ON CURRENT PAGE =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

});