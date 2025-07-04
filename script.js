function setLanguage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      const translation = translations[lang][key];
      if (translation) el.innerHTML = translation;
    });

    // Зберегти обрану мову в localStorage
    localStorage.setItem("lang", lang);
  }

  // Автоматичне застосування мови при завантаженні
  document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "ua";
    setLanguage(savedLang);
  });


  const texts = {
  ua: ['побутової техніки', 'електроніки', 'бананів', 'жартую, не бананів'],
  en: ['home appliances', 'electronics', 'bananas', 'joke, not bananas']
};

function startTyping(lang) {
  const el = document.getElementById("animated-text");
  const words = texts[lang];
  let i = 0;

  setInterval(() => {
    el.textContent = words[i];
    i = (i + 1) % words.length;
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("lang") || "ua";
  startTyping(lang);
});

const counters = document.querySelectorAll('.counter');
  const speed = 300;

  counters.forEach(counter => {
    const animate = () => {
      const value = +counter.getAttribute('data-target');
      const data = +counter.innerText;
      const time = value / speed;
      if (data < value) {
        counter.innerText = Math.ceil(data + time);
        setTimeout(animate, 20);
      } else {
        counter.innerText = value.toLocaleString('en-US');
      }
    };

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) animate();
    }, { threshold: 1 });

    observer.observe(counter);
  });

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