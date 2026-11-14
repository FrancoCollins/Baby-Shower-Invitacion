(() => {
  const target = new Date('2026-12-12T18:00:00+01:00').getTime();
  const $ = (id) => document.getElementById(id);
  const timer = $('timer');
  const arrived = $('arrived');
  const updateCountdown = () => {
    const remaining = target - Date.now();
    if (remaining <= 0) {
      timer.hidden = true;
      $('timer-note').hidden = true;
      arrived.hidden = false;
      clearInterval(interval);
      return;
    }
    const seconds = Math.floor(remaining / 1000);
    $('days').textContent = String(Math.floor(seconds / 86400)).padStart(2, '0');
    $('hours').textContent = String(Math.floor((seconds % 86400) / 3600)).padStart(2, '0');
    $('minutes').textContent = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    $('seconds').textContent = String(seconds % 60).padStart(2, '0');
  };
  updateCountdown();
  const interval = window.setInterval(updateCountdown, 1000);

  const message = '¡Hola! ❤️ Quería confirmar que asistiré al Baby Shower de Franco y Agustina el 12 de diciembre. ¡Tengo muchas ganas de compartir este día tan especial con vosotros!';
  $('whatsapp-link').href = `https://wa.me/34640736244?text=${encodeURIComponent(message)}`;

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('is-visible'));
  }
})();
