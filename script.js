/* ================================================
   PORTFOLIO — Osiax Tcheoubi
   script.js
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR (desktop seulement) ── */
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');

  if (dot && ring && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', e => {
      dot.style.left  = e.clientX + 'px';
      dot.style.top   = e.clientY + 'px';
      setTimeout(() => {
        ring.style.left = e.clientX + 'px';
        ring.style.top  = e.clientY + 'px';
      }, 70);
    });

    document.querySelectorAll('a, button, .proj-item, .tech-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width   = '52px';
        ring.style.height  = '52px';
        ring.style.opacity = '.7';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width   = '32px';
        ring.style.height  = '32px';
        ring.style.opacity = '.4';
      });
    });
  }

  /* ── GLOW suit la souris ── */
  const glow = document.getElementById('glow');
  if (glow) {
    document.addEventListener('mousemove', e => {
      glow.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    });
  }

  /* ── HAMBURGER MENU MOBILE ── */
  const toggle = document.getElementById('nav-toggle');
  const mMenu  = document.getElementById('mobile-menu');

  if (toggle && mMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.textContent = isOpen ? '✕' : '☰';
    });

    // Fermer le menu au clic sur un lien
    mMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mMenu.classList.remove('open');
        toggle.textContent = '☰';
        toggle.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');

        // Animer les barres de compétences
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.w + '%';
        });

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── FORMULAIRE NETLIFY ── */
  const form    = document.getElementById('contact-form');
  const msgOk   = document.getElementById('form-success');
  const msgErr  = document.getElementById('form-error');
  const submitBtn = document.getElementById('form-submit');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      // Désactiver le bouton
      submitBtn.disabled    = true;
      submitBtn.textContent = '⏳ Envoi en cours...';
      msgOk.style.display   = 'none';
      msgErr.style.display  = 'none';

      try {
        const formData = new FormData(form);

const response = await fetch('https://formspree.io/f/xlgzkayj', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString(),
        });

        if (response.ok) {
          // Succès
          msgOk.style.display   = 'block';
          form.reset();
          submitBtn.textContent = '✓ Message envoyé !';
          setTimeout(() => {
            submitBtn.textContent = '→ Envoyer le message';
            submitBtn.disabled    = false;
            msgOk.style.display   = 'none';
          }, 5000);
        } else {
          throw new Error('Erreur serveur');
        }
      } catch (err) {
        // Erreur
        msgErr.style.display  = 'block';
        submitBtn.textContent = '→ Envoyer le message';
        submitBtn.disabled    = false;
      }
    });
  }

});
