(function () {
  document.addEventListener('click', function (event) {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link || typeof window.gtag !== 'function') return;
    const href = link.getAttribute('href');
    let method;
    if (/^https:\/\/wa\.me\//i.test(href)) method = 'whatsapp';
    else if (/^viber:/i.test(href)) method = 'viber';
    else if (/^mailto:/i.test(href)) method = 'email';
    else if (/^tel:/i.test(href)) method = 'phone';
    if (!method) return;
    window.gtag('event', 'contact_click', {
      contact_method: method,
      contact_location: link.closest('footer') ? 'footer' : 'page',
      transport_type: 'beacon'
    });
  });
})();
