document.documentElement.classList.add('js');

const effectCopy = {
  shake: {
    label: 'SHAKE / MOTION',
    description: 'Add impact and energy to your cuts with rhythmic movement.'
  },
  aura: {
    label: 'AURA / GLOW',
    description: 'Give a clip presence with bright outlines and atmospheric glow.'
  },
  freeze: {
    label: 'FREEZE / FRAME',
    description: 'Hold a single moment and let it do the talking.'
  }
};

const previewStage = document.getElementById('showcase-stage');
const previewLabel = document.getElementById('effect-label');
const previewDescription = document.getElementById('effect-description');
const effectTabs = document.querySelectorAll('[data-effect-button]');

effectTabs.forEach((button) => {
  button.addEventListener('click', () => {
    const effect = button.dataset.effectButton;
    if (!effectCopy[effect]) return;
    previewStage.dataset.effect = effect;
    previewLabel.textContent = effectCopy[effect].label;
    previewDescription.textContent = effectCopy[effect].description;
    effectTabs.forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-pressed', String(selected));
    });
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-nav');

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', isOpen);
  });
  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('is-open');
    });
  });
}

const year = document.getElementById('current-year');
if (year) year.textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -16px 0px' });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
