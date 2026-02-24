/* ================================================================
   main.js — Institución Educativa Islas del Rosario
   Contiene: Loader de página, Navbar scroll + hamburguesa,
   Slider del hero, Botón subir, Observador de animaciones,
   Modal de publicidad, Burbujas marítimas decorativas,
   Contador de estadísticas.
================================================================ */

/* ─────────────────────────────────────────────────────────────
   UTILIDAD: Ejecutar cuando el DOM esté listo
───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initSlider();
  initScrollButtons();
  initRevealAnimations();
  initAdModal();
  initBubbles();
  initCounters();
  initActiveNavLink();
});

/* ═══════════════════════════════════════════════════════════════
   1. LOADER DE PÁGINA — desaparece cuando carga todo
═══════════════════════════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  // Ocultar loader al terminar de cargar la página
  window.addEventListener('load', () => {
    // Pequeña demora para que la animación se vea suave
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500);
  });

  // Fallback: si tarda más de 4s, ocultar de todas formas
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 4000);
}

/* ═══════════════════════════════════════════════════════════════
   2. NAVBAR — fijo con sombra al scroll + menú hamburguesa
═══════════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar      = document.getElementById('navbar');
  const toggle      = document.getElementById('navToggle');
  const mobileMenu  = document.getElementById('mobileMenu');

  if (!navbar) return;

  /* — Sombra al hacer scroll ─────────────────────────────── */
  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // comprobar estado inicial

  /* — Hamburguesa: abrir/cerrar menú móvil ─────────────── */
  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    // Accesibilidad
    toggle.setAttribute('aria-expanded', isOpen);
  });

  /* — Cerrar menú al hacer clic en un enlace ───────────── */
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', false);
    });
  });

  /* — Cerrar menú al hacer clic fuera ─────────────────── */
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      mobileMenu.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', false);
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   3. HERO SLIDER — 3 slides, auto-avance cada 7s, dots + flechas
═══════════════════════════════════════════════════════════════ */
function initSlider() {
  const slides      = document.querySelectorAll('.hero__slide');
  const dots        = document.querySelectorAll('.hero__dot');
  const prevBtn     = document.getElementById('heroPrev');
  const nextBtn     = document.getElementById('heroNext');
  const progressBar = document.getElementById('heroProgress');

  if (!slides.length) return;

  let current  = 0;
  let timer    = null;
  let isAnimating = false;

  /* Ir a un slide específico */
  function goTo(index) {
    if (isAnimating) return;
    isAnimating = true;

    // Quitar clase activa del slide y dot actuales
    slides[current].classList.remove('is-active');
    dots[current]?.classList.remove('is-active');

    // Actualizar índice
    current = (index + slides.length) % slides.length;

    // Activar nuevo slide y dot
    slides[current].classList.add('is-active');
    dots[current]?.classList.add('is-active');

    // Reiniciar barra de progreso
    if (progressBar) {
      progressBar.style.animation = 'none';
      // Forzar reflow para reiniciar la animación
      void progressBar.offsetWidth;
      progressBar.style.animation = 'slideProgress 7s linear';
    }

    // Esperar a que termine la transición CSS (~900ms)
    setTimeout(() => { isAnimating = false; }, 950);
  }

  /* Avanzar al siguiente */
  function next() { goTo(current + 1); }

  /* Retroceder al anterior */
  function prev() { goTo(current - 1); }

  /* Iniciar temporizador de auto-avance */
  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 7000);
  }

  /* Reiniciar temporizador al interactuar */
  function resetTimer() {
    startTimer();
  }

  /* Evento clic en dots */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      resetTimer();
    });
  });

  /* Evento clic en flechas */
  prevBtn?.addEventListener('click', () => { prev(); resetTimer(); });
  nextBtn?.addEventListener('click', () => { next(); resetTimer(); });

  /* Swipe táctil para móviles */
  let touchStartX = 0;
  const heroEl = document.querySelector('.hero');

  heroEl?.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  heroEl?.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
      resetTimer();
    }
  });

  /* Pausar al hacer hover (solo desktop) */
  heroEl?.addEventListener('mouseenter', () => clearInterval(timer));
  heroEl?.addEventListener('mouseleave', () => startTimer());

  /* Arrancar */
  goTo(0);
  startTimer();
}

/* ═══════════════════════════════════════════════════════════════
   4. BOTONES FLOTANTES — WhatsApp siempre visible, subir al inicio
═══════════════════════════════════════════════════════════════ */
function initScrollButtons() {
  const btnScrollTop = document.getElementById('btnScrollTop');
  if (!btnScrollTop) return;

  /* Mostrar/ocultar botón subir según scroll */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btnScrollTop.classList.add('visible');
    } else {
      btnScrollTop.classList.remove('visible');
    }
  }, { passive: true });

  /* Clic: desplazar suavemente al inicio */
  btnScrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════════════════════
   5. ANIMACIONES CON SCROLL — IntersectionObserver
   Agrega .visible a elementos con clase .reveal al entrar en pantalla
═══════════════════════════════════════════════════════════════ */
function initRevealAnimations() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  /* Configuración del observador */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Dejar de observar una vez animado para mejor rendimiento
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,    // Activar cuando el 12% del elemento sea visible
    rootMargin: '0px 0px -40px 0px'  // Activar un poco antes del borde inferior
  });

  elements.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   6. MODAL DE PUBLICIDAD
   - Se muestra al cargar la página si está habilitado
   - ACTIVAR/DESACTIVAR: cambiar AD_ENABLED
   - Controlar en qué páginas aparece: lista AD_PAGES
   - Botón cerrar: solo cierra el modal
   - Botón de acción: abre URL en nueva pestaña
═══════════════════════════════════════════════════════════════ */
function initAdModal() {
  /* ══ CONFIGURACIÓN DE PUBLICIDAD ══════════════════════════

     AD_ENABLED  → true  = publicidad activa globalmente
                   false = desactivada en todas las páginas

     AD_PAGES    → lista de páginas donde aparece el popup.
                   'index'         = página de inicio
                   'nosotros'      = página Nosotros
                   'inscripciones' = página Inscripciones
                   'equipo'        = página Equipo
                   'sedes'         = página Sedes
                   'contacto'      = página Contacto
                   []              = en TODAS las páginas

     Ejemplos:
       ['index']                     → solo en inicio
       ['index', 'inscripciones']    → inicio e inscripciones
       []                            → en todas las páginas

     AD_URL      → URL que se abre al hacer clic en el botón
     AD_DELAY    → milisegundos antes de mostrar el popup

  ══════════════════════════════════════════════════════════ */
  const AD_ENABLED = true;                              // ← activar/desactivar
  const AD_PAGES   = ['index'];                         // ← páginas donde aparece
  const AD_URL     = 'https://wa.me/573128149500';      // ← URL de destino
  const AD_DELAY   = 1200;                              // ← demora en ms

  if (!AD_ENABLED) return;

  /* Detectar la página actual */
  const pageName = location.pathname
    .split('/').pop()           // toma el último segmento de la ruta
    .replace('.html', '')       // quita la extensión
    || 'index';                 // si está en '/' lo trata como 'index'

  /* Si hay páginas configuradas y la actual no está en la lista → salir */
  if (AD_PAGES.length > 0 && !AD_PAGES.includes(pageName)) return;

  const overlay  = document.getElementById('adModal');
  const closeBtn = document.getElementById('adModalClose');
  const actionBtn = document.getElementById('adModalAction');

  if (!overlay) return;

  /* Mostrar después del delay */
  setTimeout(() => {
    overlay.classList.remove('hidden');
    // Bloquear scroll mientras el modal está abierto
    document.body.style.overflow = 'hidden';
  }, AD_DELAY);

  /* Cerrar al hacer clic en el botón X */
  closeBtn?.addEventListener('click', closeModal);

  /* Clic en el fondo oscuro también cierra */
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  /* Botón de acción → abrir URL en nueva pestaña */
  actionBtn?.addEventListener('click', () => {
    window.open(AD_URL, '_blank', 'noopener,noreferrer');
    closeModal();
  });

  function closeModal() {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

/* ═══════════════════════════════════════════════════════════════
   7. BURBUJAS MARÍTIMAS DECORATIVAS
   Crea burbujas flotantes en el fondo de forma aleatoria
═══════════════════════════════════════════════════════════════ */
function initBubbles() {
  const container = document.getElementById('bubblesContainer');
  if (!container) return;

  const BUBBLE_COUNT = 10;

  for (let i = 0; i < BUBBLE_COUNT; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    /* Propiedades aleatorias */
    const size     = Math.random() * 60 + 20;           // 20–80px
    const left     = Math.random() * 100;               // 0–100%
    const duration = Math.random() * 20 + 15;           // 15–35s
    const delay    = Math.random() * 12;                // 0–12s
    const opacity  = Math.random() * 0.12 + 0.03;      // 0.03–0.15

    bubble.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${left}%;
      animation-duration: ${duration}s;
      animation-delay:    ${delay}s;
      opacity: ${opacity};
    `;

    container.appendChild(bubble);
  }
}

/* ─── Animación CSS para las burbujas ─────────────────────── */
const bubbleStyle = document.createElement('style');
bubbleStyle.textContent = `
  .bubble {
    position: absolute;
    bottom: -80px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(0,168,232,.3), rgba(0,126,167,.1));
    border: 1px solid rgba(0,168,232,.2);
    animation: bubbleRise linear infinite;
    pointer-events: none;
  }

  @keyframes bubbleRise {
    0%   { transform: translateY(0)     scale(1);    opacity: 0;   }
    5%   { opacity: 1; }
    95%  { opacity: 1; }
    100% { transform: translateY(-110vh) scale(1.15); opacity: 0; }
  }
`;
document.head.appendChild(bubbleStyle);

/* ═══════════════════════════════════════════════════════════════
   8. CONTADORES ANIMADOS DE ESTADÍSTICAS
   Los números suben desde 0 hasta su valor final al entrar en pantalla
═══════════════════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el      = entry.target;
      const target  = parseInt(el.dataset.count, 10);
      const suffix  = el.dataset.suffix || '';
      const duration = 1800; // ms
      const step    = 16;    // ~60fps
      const increment = target / (duration / step);
      let current = 0;

      const update = () => {
        current += increment;
        if (current >= target) {
          el.textContent = target + suffix;
        } else {
          el.textContent = Math.floor(current) + suffix;
          setTimeout(update, step);
        }
      };

      update();
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   9. ENLACE ACTIVO EN NAVBAR
   Marca el enlace del nav que corresponde a la página actual
═══════════════════════════════════════════════════════════════ */
function initActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';

  /* Marcar en ambos menús (desktop y móvil) */
  document.querySelectorAll('.navbar__nav a, .navbar__mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   10. FILTROS DE EQUIPO DOCENTE (solo en equipo.html)
═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    /* Actualizar botón activo */
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    /* Mostrar/ocultar cards */
    document.querySelectorAll('.docente-card').forEach(card => {
      if (filter === 'all' || card.dataset.area === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ═══════════════════════════════════════════════════════════════
   11. VALIDACIÓN BÁSICA DEL FORMULARIO
   Muestra mensajes de error inline sin recargar la página
═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('.js-validate-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    /* Validar campos requeridos */
    form.querySelectorAll('[required]').forEach(field => {
      const error = field.nextElementSibling;
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    if (isValid) {
      /* Simulación de envío exitoso */
      const submitBtn = form.querySelector('.form-submit');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> ¡Enviado con éxito!';
      submitBtn.disabled = true;
      submitBtn.style.background = '#22c55e';

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        form.reset();
      }, 3500);
    }
  });

  /* Limpiar error al escribir */
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
    });
  });
});

/* ═══════════════════════════════════════════════════════════════
   LIGHTBOX — galería de imágenes con vista expandida
   Uso: añadir data-src="ruta/imagen.jpg" a .galeria-preview__item
═══════════════════════════════════════════════════════════════ */
(function initLightbox() {
  const lightbox   = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg      = document.getElementById('lightboxImg');
  const lbClose    = document.getElementById('lightboxClose');
  const lbPrev     = document.getElementById('lightboxPrev');
  const lbNext     = document.getElementById('lightboxNext');
  const items      = Array.from(document.querySelectorAll('.galeria-preview__item[data-src]'));

  if (!items.length) return;

  let current = 0;

  function open(index) {
    current = index;
    lbImg.src = items[current].dataset.src;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lbImg.focus?.();
  }

  function close() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function prev() {
    current = (current - 1 + items.length) % items.length;
    lbImg.src = items[current].dataset.src;
  }

  function next() {
    current = (current + 1) % items.length;
    lbImg.src = items[current].dataset.src;
  }

  // Abrir al hacer clic en cualquier item de la galería
  items.forEach((item, i) => {
    item.addEventListener('click', () => open(i));
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);

  // Clic en el fondo oscuro cierra
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  // Teclado: ESC cierra, flechas navegan
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });
})();
