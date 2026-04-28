// Block right-click on profile photo
document.getElementById('heroPhoto').addEventListener('contextmenu', e => e.preventDefault());

// Dark mode toggle
const toggle = document.getElementById('themeToggle');
const icon = toggle.querySelector('.theme-icon');
const stored = localStorage.getItem('theme');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  icon.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', theme);
}

if (stored) {
  applyTheme(stored);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  applyTheme('dark');
}

toggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Smooth active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));
