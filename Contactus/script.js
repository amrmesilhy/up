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
});