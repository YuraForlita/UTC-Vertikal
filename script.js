function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      const translation = translations[lang]?.[key];
        if (translation) el.innerHTML = translation;
      });
      localStorage.setItem("lang", lang);
  }
  document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "ua";
    setLanguage(savedLang);
    document.getElementById('current-lang').innerText = savedLang.toUpperCase();
    startTyping(savedLang);
  });    


  const texts = {
  ua: ['побутової техніки', 'електроніки', 'бананів', 'жартую, не бананів'],
  en: ['home appliances', 'electronics', 'bananas', 'joke, not bananas']
};

let typingIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typingTimer;

    function startTyping(lang) {
      const el = document.getElementById("animated-text");
      const words = texts[lang];
      if (!el || !words) return;
      clearTimeout(typingTimer);

      function type() {
        currentText = words[typingIndex];
        if (isDeleting) {
          el.textContent = currentText.substring(0, charIndex--);
        } else {
          el.textContent = currentText.substring(0, charIndex++);
        }
        if (!isDeleting && charIndex === currentText.length + 1) {
          isDeleting = true;
          typingTimer = setTimeout(type, 1000);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          typingIndex = (typingIndex + 1) % words.length;
          typingTimer = setTimeout(type, 300);
        } else {
          typingTimer = setTimeout(type, isDeleting ? 50 : 100);
        }
      }
      type();
    }

//перемикач мови
function toggleMenu() {
    const navbar = document.getElementById('navbar');
    const langDropdown = document.querySelector('.lang-dropdown');
    navbar.classList.toggle('active');


    if (navbar.classList.contains('active')) {
      langDropdown.classList.add('disabled');
    } else {
      langDropdown.classList.remove('disabled');
    }
  }

  document.getElementById('lang-toggle-btn').addEventListener('click', function (e) {
    e.stopPropagation();
    document.getElementById('lang-menu').classList.toggle('active');
  });

  function changeLang(lang) {
    const lowerLang = lang.toLowerCase();
    document.getElementById('current-lang').innerText = lang;
    document.getElementById('lang-menu').classList.remove('active');
    setLanguage(lowerLang); 
    startTyping(lowerLang);
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.lang-dropdown')) {
      document.getElementById('lang-menu').classList.remove('active');
    }
  }); 

  document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "ua";
  setLanguage(savedLang);
  document.getElementById('current-lang').innerText = savedLang.toUpperCase(); // <- ось це додаємо
});

  document.body.classList.add('fade-in');

  // При натисканні на посилання — затухання перед переходом
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#');
    if (!isExternal) {
      link.classList.add('page-link');
      link.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.style.transition = 'opacity 0.4s ease';
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      });
    }
  });