(() => {
  const $ = (id) => document.getElementById(id);
  const welcomeScreen = $('welcome-screen');
  const invitationContent = $('invitation-content');
  if (welcomeScreen && invitationContent) {
    document.body.classList.add('envelope-locked');
    invitationContent.inert = true;
    invitationContent.setAttribute('aria-hidden', 'true');
    let isOpening = false;
    document.querySelectorAll('.open-invitation').forEach((button) => {
      button.addEventListener('click', () => {
        if (isOpening) return;
        isOpening = true;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('.open-invitation').forEach((control) => { control.disabled = true; });
        welcomeScreen.classList.add('is-dismissed');
        document.body.classList.remove('envelope-locked');
        invitationContent.inert = false;
        invitationContent.removeAttribute('aria-hidden');
        $('hero-title').focus({ preventScroll: true });
        window.setTimeout(() => welcomeScreen.remove(), reduceMotion ? 0 : 700);
      });
    });
  }

  const target = new Date('2026-12-12T20:00:00+01:00').getTime();
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
