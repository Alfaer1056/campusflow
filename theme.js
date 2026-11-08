const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const densitySelect = document.querySelector('#density-select');
const demoAction = document.querySelector('#demo-action');
const demoFeedback = document.querySelector('#demo-feedback');

const THEME_KEY = 'atlas-theme';
const VALID_THEMES = ['auto', 'light', 'dark'];

function applyTheme(choice) {
  if (!VALID_THEMES.includes(choice)) choice = 'auto';

  if (choice === 'auto') {
    root.removeAttribute('data-theme');
  } else {
    root.dataset.theme = choice;
  }

  if (themeSelect) {
    themeSelect.value = choice;
  }
}

function initTheme() {
  let savedTheme = 'auto';
  try {
    savedTheme = localStorage.getItem(THEME_KEY) || 'auto';
  } catch (e) {
    // localStorage недоступен
  }
  applyTheme(savedTheme);
}

themeSelect?.addEventListener('change', (e) => {
  const choice = e.target.value;
  applyTheme(choice);
  try {
    localStorage.setItem(THEME_KEY, choice);
  } catch (e) {
    // localStorage недоступен
  }
});

initTheme();

/* Плотность */
const DENSITY_KEY = 'atlas-density';

function applyDensity(choice) {
  if (choice === 'compact') {
    root.dataset.density = 'compact';
  } else {
    root.removeAttribute('data-density');
  }
  if (densitySelect) densitySelect.value = choice || 'normal';
}

function initDensity() {
  let saved = 'normal';
  try { saved = localStorage.getItem(DENSITY_KEY) || 'normal'; } catch (e) {}
  applyDensity(saved);
}

densitySelect?.addEventListener('change', (e) => {
  applyDensity(e.target.value);
  try { localStorage.setItem(DENSITY_KEY, e.target.value); } catch (e) {}
});

initDensity();

/* Обратная связь от кнопки */
demoAction?.addEventListener('click', () => {
  demoFeedback.textContent = 'Демонстрация: действие выполнено, новая заявка создана.';
});