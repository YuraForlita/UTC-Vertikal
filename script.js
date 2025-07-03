
  const translations = {
    ua: {
      "nav.home": "Головна",
      "nav.about": "Про нас",
      "nav.brands": "Бренди",
      "nav.contacts": "Контакти",
      "home.greeting": "Привіт , це UTS <span>VERTIKAL</span>",
      "home.subtitle.static": "Ми є дистриб'ютор",
      "home.description": "Ми займаємось дистрибуцією побутової техніки, електроніки, бананів і може ще чогось.",
      "home.more": "Детальніше про нас"
    },
    en: {
      "nav.home": "Home",
      "nav.about": "About Us",
      "nav.brands": "Brands",
      "nav.contacts": "Contacts",
      "home.greeting": "Hello, this is UTS <span>VERTIKAL</span>",
      "home.subtitle.static": "We are a distributor of",
      "home.description": "We distribute household appliances, electronics, bananas and maybe something else.",
      "home.more": "More about us"
    }
  };

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