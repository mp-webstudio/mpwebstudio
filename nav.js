(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;
  const toggle = (open) => {
    const on = typeof open === 'boolean' ? open : !mobileNav.classList.contains('active');
    hamburger.classList.toggle('active', on);
    mobileNav.classList.toggle('active', on);
    hamburger.setAttribute('aria-expanded', String(on));
    hamburger.setAttribute('aria-label', on ? 'Zatvori meni' : 'Otvori meni');
    hamburger.setAttribute('title', on ? 'Zatvori meni' : 'Otvori meni');
    mobileNav.setAttribute('aria-hidden', String(!on));
  };
  hamburger.addEventListener('click', () => toggle());
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
})();
