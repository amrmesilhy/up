document.addEventListener('DOMContentLoaded', () => {
  // Disable scroll restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  AOS.init({
    duration: 600,
    once: true,
  });

  // Language Toggle
  const langToggle = document.querySelector('.lang-toggle');
  const elements = document.querySelectorAll('[data-ar][data-en]');
  
  let currentLang = localStorage.getItem('language') || 'ar';
  
  function updateLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelector('.about-container').classList.toggle('ltr', lang === 'en');
    
    elements.forEach(elem => {
      elem.textContent = elem.dataset[lang];
    });
    
    langToggle.textContent = lang === 'ar' ? 'AR/EN' : 'EN/AR';
    localStorage.setItem('language', lang);
  }
  
  updateLanguage(currentLang);
  
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    updateLanguage(currentLang);
  });

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Typing Effect
  const typingElement = document.querySelector('.typing-effect');
  let text = typingElement.dataset[currentLang];
  let index = 0;
  
  function type() {
    if (index < text.length) {
      typingElement.textContent = text.slice(0, index + 1);
      index++;
      setTimeout(type, 100);
    } else {
      setTimeout(() => {
        index = 0;
        typingElement.textContent = '';
        type();
      }, 2000);
    }
  }
  
  type();
  
  // Update typing effect on language change
  langToggle.addEventListener('click', () => {
    text = typingElement.dataset[currentLang];
    index = 0;
    typingElement.textContent = '';
    type();
  });

  // Smooth Scroll for Links
  document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Scroll to Top Button
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Lightbox for Images
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  document.body.appendChild(lightbox);
  
  const lightboxImg = document.createElement('img');
  lightbox.appendChild(lightboxImg);
  
  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close-btn');
  closeBtn.innerHTML = '×';
  lightbox.appendChild(closeBtn);
  
  window.showImage = function(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('active');
  };
  
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // Scroll Partners
  window.scrollPartners = function(direction) {
    const container = document.querySelector('.success-partners-container');
    const scrollAmount = 300; // Adjust scroll distance as needed
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
});