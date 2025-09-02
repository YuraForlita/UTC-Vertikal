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
    particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#00d7ff"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00aaff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode:
          "grab"
      },
      onclick: {
        enable: true,
        mode:
          "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true,
  config_demo: {
    hide_card: false,
    background_color: "#b61924",
    background_image: "",
    background_position: "50% 50%",
    background_repeat: "no-repeat",
    background_size: "cover"
  }
});
    const savedLang = localStorage.getItem("lang") || "ua";
    setLanguage(savedLang);
    document.getElementById('current-lang').innerText = savedLang.toUpperCase();
    startTyping(savedLang);
  });    


  const texts = {
  ua: ['побутової техніки', 'електроніки', 'гаджетів'],
  en: ['home appliances', 'electronics', 'gadgets']
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

  const counters = document.querySelectorAll(".counter");
const speed = 300;

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target.toLocaleString("en-US");
    }
  };

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) updateCount();
  }, { threshold: 1 });

  observer.observe(counter);
});