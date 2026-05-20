/* ================================================
   PORTFOLIO — Osiax Tcheoubi
   script.js
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PARTICULES ── */
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, dots = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function randomDot() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + .3,
        vx: (Math.random() - .5) * .25,
        vy: (Math.random() - .5) * .25,
        alpha: Math.random() * .5 + .1
      };
    }
    for (let i = 0; i < 90; i++) dots.push(randomDot());

    function drawParticles() {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = W;
        if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H;
        if (d.y > H) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${d.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${(1 - dist / 110) * 0.12})`;
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  /* ── CURSEUR ── */
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
        ring.style.width = '54px'; ring.style.height = '54px'; ring.style.opacity = '.7';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width = '36px'; ring.style.height = '36px'; ring.style.opacity = '.4';
      });
    });
  }

  /* ── GLOW ── */
  const glow = document.getElementById('glow');
  if (glow) {
    document.addEventListener('mousemove', e => {
      glow.style.transform = `translate(${e.clientX - 350}px, ${e.clientY - 350}px)`;
    });
  }

  /* ── HAMBURGER ── */
  const toggle = document.getElementById('nav-toggle');
  const mMenu  = document.getElementById('mobile-menu');
  if (toggle && mMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.textContent = isOpen ? '✕' : '☰';
    });
    mMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mMenu.classList.remove('open');
        toggle.textContent = '☰';
        toggle.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ── NAV ACTIVE LINK ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + entry.target.id
            ? 'var(--blue-bright)' : '';
        });
      }
    });
  }, { threshold: .4 });
  sections.forEach(s => observer.observe(s));

  /* ── SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.w + '%';
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── EFFET DE FRAPPE HERO ── */
  const roles = [
    'Développeur Web Full Stack',
    'PHP · Laravel · MySQL',
    'UI Designer & Analyste',
    'Basé à Parakou · 🇧🇯'
  ];
  const roleEl = document.querySelector('.hero-role');
  if (roleEl) {
    let ri = 0, ci = 0, deleting = false;
    function typeRole() {
      const current = roles[ri];
      if (!deleting) {
        roleEl.textContent = current.slice(0, ci + 1);
        ci++;
        if (ci === current.length) { deleting = true; setTimeout(typeRole, 2200); return; }
      } else {
        roleEl.textContent = current.slice(0, ci - 1);
        ci--;
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
        }
      }
      setTimeout(typeRole, deleting ? 45 : 80);
    }
    setTimeout(typeRole, 1500);
  }

  /* ── FORMULAIRE ── */
  const form      = document.getElementById('contact-form');
  const msgOk     = document.getElementById('form-success');
  const msgErr    = document.getElementById('form-error');
  const submitBtn = document.getElementById('form-submit');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      submitBtn.disabled    = true;
      submitBtn.textContent = '⏳ Envoi en cours...';
      msgOk.style.display = msgErr.style.display = 'none';

      fetch('https://formspree.io/f/xlgzkayj', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          msgOk.style.display   = 'block';
          form.reset();
          submitBtn.textContent = '✓ Message envoyé !';
          setTimeout(() => {
            submitBtn.textContent = '→ Envoyer le message';
            submitBtn.disabled    = false;
            msgOk.style.display   = 'none';
          }, 5000);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        msgErr.style.display  = 'block';
        submitBtn.textContent = '→ Envoyer le message';
        submitBtn.disabled    = false;
      });
    });
  }

});