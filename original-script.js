/* =========================================================
   BLISS MISH BAKERY — SCRIPT
   Vanilla JS — no dependencies
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     1. LOADING SCREEN
     Hide once the page has loaded (with a small minimum
     delay so the animation actually gets seen).
  --------------------------------------------------- */
  const loader = document.getElementById('loader');
  const MIN_LOAD_TIME = 1200;
  const startTime = Date.now();

  function hideLoader() {
    const elapsed = Date.now() - startTime;
    const wait = Math.max(MIN_LOAD_TIME - elapsed, 0);
    setTimeout(() => {
      loader.classList.add('is-hidden');
      document.body.style.overflow = '';
      initHeroLetters(); // start the cinematic title animation once visible
    }, wait);
  }
  document.body.style.overflow = 'hidden';
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }

  /* ---------------------------------------------------
     2. HERO TITLE — letter-by-letter cinematic entrance
  --------------------------------------------------- */
  function initHeroLetters() {
    const titleEl = document.getElementById('heroTitle');
    if (!titleEl || titleEl.dataset.done) return;
    const text = titleEl.getAttribute('aria-label') || 'Bliss Mish Bakery';
    titleEl.innerHTML = '';
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${0.25 + i * 0.045}s`;
      titleEl.appendChild(span);
    });
    titleEl.dataset.done = 'true';
  }

  /* ---------------------------------------------------
     3. SCROLL PROGRESS BAR
  --------------------------------------------------- */
  const scrollProgress = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }

  /* ---------------------------------------------------
     4. NAVBAR — style change on scroll + scrollspy
  --------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link[data-link], a[data-link]');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbarStyle() {
    navbar.classList.toggle('is-scrolled', window.scrollY > 40);
  }

  function updateActiveLink() {
    let current = sections[0]?.id;
    const offset = 140;
    sections.forEach((sec) => {
      if (window.scrollY + offset >= sec.offsetTop) current = sec.id;
    });
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  /* ---------------------------------------------------
     5. BACK TO TOP BUTTON
  --------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');
  function updateBackToTop() {
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  }
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- combine all scroll-driven updates into one listener ---- */
  function onScroll() {
    updateScrollProgress();
    updateNavbarStyle();
    updateActiveLink();
    updateBackToTop();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------
     6. MOBILE NAV TOGGLE
  --------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  /* ---------------------------------------------------
     7. SMOOTH SCROLL for in-page links (with navbar offset)
     + close mobile menu on link click
  --------------------------------------------------- */
  document.querySelectorAll('a[data-link]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = navbar.offsetHeight + 10;
      window.scrollTo({ top: target.offsetTop - navHeight, behavior: 'smooth' });
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-open');
    });
  });

  const scrollCue = document.getElementById('scrollCue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      const about = document.getElementById('about');
      window.scrollTo({ top: about.offsetTop - navbar.offsetHeight, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------
     8. SCROLL REVEAL — IntersectionObserver
  --------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------------------------------------------
     9. ABOUT STATS — count-up animation, triggered on view
  --------------------------------------------------- */
  const statEls = document.querySelectorAll('.about__stat-num');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const startTs = performance.now();
      function tick(now) {
        const progress = Math.min((now - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  statEls.forEach((el) => statObserver.observe(el));

  /* ---------------------------------------------------
     10. HERO MOUSE PARALLAX — floating pastries drift
          with cursor movement (desktop only)
  --------------------------------------------------- */
  const heroFloaters = document.querySelectorAll('.floater');
  const heroSection = document.getElementById('home');
  if (window.matchMedia('(pointer: fine)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const xRatio = (e.clientX / innerWidth - 0.5);
      const yRatio = (e.clientY / innerHeight - 0.5);
      heroFloaters.forEach((el) => {
        const depth = parseInt(el.dataset.depth || 30, 10);
        const moveX = xRatio * depth;
        const moveY = yRatio * depth;
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
  }

  /* ---------------------------------------------------
     11. 3D CAKE — subtle tilt response to mouse position
  --------------------------------------------------- */
  const cake3d = document.getElementById('cake3d');
  if (cake3d && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 14;
      cake3d.style.setProperty('--ry', `${xRatio}deg`);
    });
  }

  /* ---------------------------------------------------
     12. REVIEWS SLIDER
  --------------------------------------------------- */
  const reviewCards = Array.from(document.querySelectorAll('.review-card'));
  const reviewDotsWrap = document.getElementById('reviewDots');
  let activeReview = 0;
  let reviewInterval;

  reviewCards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Go to review ${i + 1}`);
    dot.addEventListener('click', () => showReview(i));
    reviewDotsWrap.appendChild(dot);
  });
  const dots = Array.from(reviewDotsWrap.children);

  function showReview(index) {
    reviewCards[activeReview]?.classList.remove('is-active');
    dots[activeReview]?.classList.remove('is-active');
    activeReview = (index + reviewCards.length) % reviewCards.length;
    reviewCards[activeReview].classList.add('is-active');
    dots[activeReview].classList.add('is-active');
  }
  function nextReview() { showReview(activeReview + 1); }
  function prevReview() { showReview(activeReview - 1); }

  document.getElementById('reviewNext').addEventListener('click', () => { nextReview(); restartAutoplay(); });
  document.getElementById('reviewPrev').addEventListener('click', () => { prevReview(); restartAutoplay(); });

  function restartAutoplay() {
    clearInterval(reviewInterval);
    reviewInterval = setInterval(nextReview, 5500);
  }
  showReview(0);
  restartAutoplay();


  /* ---------------------------------------------------
     13. ORDER FORM — build WhatsApp message & redirect
  // --------------------------------------------------- */
  const WHATSAPP_NUMBER = '919729729901'; // <-- replace with real number, e.g. 919876543210
  const orderForm = document.getElementById('orderForm');

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      name: orderForm.custName.value.trim(),
      phone: orderForm.custPhone.value.trim(),
      category: orderForm.cakeCategory.value,
      flavour: orderForm.flavour.value.trim(),
      weight: orderForm.weight.value,
      date: orderForm.deliveryDate.value,
      address: orderForm.address.value.trim(),
      message: orderForm.customMessage.value.trim(),
      instructions: orderForm.instructions.value.trim(),
    };

    const lines = [
      'Hello Bliss Mish Bakery! I would like to place a cake order 🎂',
      '',
      `*Name:* ${data.name}`,
      `*Phone:* ${data.phone}`,
      `*Cake Category:* ${data.category}`,
      `*Flavour:* ${data.flavour}`,
      `*Weight:* ${data.weight}`,
      `*Delivery Date:* ${data.date}`,
      `*Delivery Address:* ${data.address}`,
    ];
    if (data.message) lines.push(`*Cake Message:* ${data.message}`);
    if (data.instructions) lines.push(`*Special Instructions:* ${data.instructions}`);
lines.push(
      '',
      '📌 *Note:* Agar aapke paas koi reference design ya photo hai, toh please is message ko send karne ke baad niche 📎 attachment icon par click karke apni gallery se photo bhej dein.'
    );

    const text = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, '_blank');
  });

  /* ---------------------------------------------------
     14. FOOTER YEAR
  --------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
