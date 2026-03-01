/*
  MP Web Studio – Kontakt forma (frontend)
  --------------------------------------
  1) Lokalno testiranje: backend radi na http://localhost:3000
  2) Produkcija: kada deploy-ujemo backend, upiši URL u PROD_API_BASE_URL
*/

(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('contactSubmit');

  const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  // TODO: Kad deploy-ujemo backend, ovde upiši npr. "https://mpwebstudio-api.onrender.com"
  const PROD_API_BASE_URL = "";

  const API_BASE_URL = (window.MPWS_API_BASE_URL && String(window.MPWS_API_BASE_URL).trim())
    || (isLocal ? 'http://localhost:3000' : PROD_API_BASE_URL);

  function setStatus(text, type) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.classList.remove('ok', 'err');
    if (type) statusEl.classList.add(type);
  }

  function disableSubmit(disabled) {
    if (!submitBtn) return;
    submitBtn.disabled = disabled;
    submitBtn.style.opacity = disabled ? '0.75' : '1';
    submitBtn.style.cursor = disabled ? 'not-allowed' : 'pointer';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = String(document.getElementById('name')?.value || '').trim();
    const email = String(document.getElementById('email')?.value || '').trim();
    const phone = String(document.getElementById('phone')?.value || '').trim();
    const message = String(document.getElementById('message')?.value || '').trim();

    // Frontend validacija (backend opet proverava)
    if (name.length < 2) {
      setStatus('Unesite ime (min 2 slova).', 'err');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Unesite ispravan email.', 'err');
      return;
    }

    if (message.length < 10) {
      setStatus('Poruka mora imati bar 10 karaktera.', 'err');
      return;
    }

    if (!API_BASE_URL) {
      setStatus('Kontakt forma još nije aktivirana. Pišite nam direktno na info.mpwebstudio@gmail.com.', 'err');
      return;
    }

    disableSubmit(true);
    setStatus('Slanje poruke…');

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          sourcePage: window.location.href,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus(data?.message || 'Došlo je do greške. Pokušajte ponovo.', 'err');
        disableSubmit(false);
        return;
      }

      setStatus(data?.message || 'Hvala! Poruka je poslata.', 'ok');
      form.reset();
      disableSubmit(false);
    } catch (err) {
      setStatus('Ne mogu da se povežem sa serverom. Pokušajte ponovo ili pišite na info.mpwebstudio@gmail.com.', 'err');
      disableSubmit(false);
    }
  });
})();
