(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  /* ---------- WhatsApp (config/site.json) ---------- */
  fetch('config/site.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(cfg => {
    const wa = cfg && cfg.whatsapp;
    const float = $('[data-wa-float]');
    if (wa && wa.enabled === false) { if (float) float.hidden = true; return; }
    const num = wa && String(wa.number || '').replace(/\D/g, '');
    if (!num) return; // sem número: os botões levam ao formulário
    const url = `https://wa.me/${num}?text=${encodeURIComponent('Olá! Quero saber sobre um ensaio fotográfico.')}`;
    $$('[data-wa-link]').forEach(a => { a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; });
  }).catch(() => {});

  /* ---------- loader ---------- */
  const loader = $('.loader');
  const count = $('.loader__count');
  let n = 0;
  const imgs = $$('img').slice(0, 6);
  let done = 0;
  const finish = () => {
    if (!loader || loader.classList.contains('is-done')) return;
    loader.classList.add('is-done');
    intro();
  };
  const bump = () => { done++; };
  imgs.forEach(i => i.complete ? bump() : (i.addEventListener('load', bump), i.addEventListener('error', bump)));
  const step = () => {
    const target = Math.min(100, (done / Math.max(1, imgs.length)) * 100);
    n += (Math.max(target, n + 2.5) - n) * .2;
    if (count) count.textContent = Math.min(100, Math.round(n));
    if (n >= 99.5) return finish();
    requestAnimationFrame(step);
  };
  if (reduce) finish(); else requestAnimationFrame(step);
  setTimeout(finish, 1200);

  function intro() {
    const lines = $$('.hero__title .line > span');
    document.querySelector('.hero').classList.add('is-in');
    if (!hasGsap || reduce) return;
    gsap.from(['.hero__eyebrow', '.hero__lead', '.hero__actions'], { y: 30, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: .1, delay: .7 });
  }

  /* ---------- nav ---------- */
  const nav = $('.nav');
  let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    nav.classList.toggle('is-solid', y > 40);
    nav.classList.toggle('is-hidden', y > lastY && y > 600 && !sheet.classList.contains('is-open'));
    lastY = y;
  }, { passive: true });
  const menuBtn = $('.nav__menu');
  const sheet = $('.sheet');
  const toggleMenu = (open) => {
    sheet.classList.toggle('is-open', open);
    sheet.setAttribute('aria-hidden', String(!open));
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn.addEventListener('click', () => toggleMenu(!sheet.classList.contains('is-open')));
  $$('a', sheet).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  const cursor0 = $('.cursor'); if (cursor0) cursor0.hidden = true;

  /* ---------- lightbox ---------- */
  const lb = $('.lightbox'), lbImg = $('img', lb);
  const openLb = (src, alt) => {
    lbImg.src = src; lbImg.alt = alt || '';
    lb.hidden = false; requestAnimationFrame(() => lb.classList.add('is-open'));
    $('.lightbox__close').focus();
  };
  const closeLb = () => { lb.classList.remove('is-open'); setTimeout(() => lb.hidden = true, 450); };
  $$('[data-zoom]').forEach(f => {
    f.tabIndex = 0; f.setAttribute('role', 'button');
    const im = $('img', f);
    f.setAttribute('aria-label', 'Ampliar: ' + (im.alt || 'foto'));
    const go = () => openLb(f.dataset.full || im.src, im.alt);
    f.addEventListener('click', go);
    f.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });
  lb.addEventListener('click', e => { if (e.target !== lbImg) closeLb(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') { if (!lb.hidden) closeLb(); if (sheet.classList.contains('is-open')) toggleMenu(false); } });

  /* ---------- services hover image ---------- */
  const flt = $('.svc__float'), fltImg = flt && $('img', flt);
  if (fine && flt) {
    let fx = 0, fy = 0, tx = 0, ty = 0, on = false;
    $$('.svc__row').forEach(r => {
      r.addEventListener('pointerenter', () => { fltImg.src = r.dataset.img; flt.classList.add('is-on'); on = true; });
      r.addEventListener('pointerleave', () => { flt.classList.remove('is-on'); on = false; });
    });
    addEventListener('pointermove', e => { tx = e.clientX + 180; ty = e.clientY; }, { passive: true });
    (function loop() { fx += (tx - fx) * .12; fy += (ty - fy) * .12; flt.style.left = fx + 'px'; flt.style.top = fy + 'px'; requestAnimationFrame(loop); })();
  }

  /* ---------- manifesto words ---------- */
  const mt = $('[data-words]');
  

  if (!hasGsap || reduce) return;
  gsap.registerPlugin(ScrollTrigger);

  $$('[data-count]').forEach(el => {
    const o = { v: 0 }, end = +el.dataset.count, suf = el.dataset.suffix || '';
    gsap.to(o, { v: end, duration: 2, ease: 'power3.out', onUpdate: () => el.textContent = Math.round(o.v) + suf,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  // portfólio horizontal
  const track = $('[data-track]');
  const pin = $('.portfolio__pin');
  const dist = () => track.scrollWidth - innerWidth;
  const hz = gsap.to(track, { x: () => -dist(), ease: 'none',
    scrollTrigger: { trigger: '.portfolio', start: 'top top', end: () => '+=' + dist(), pin: pin, scrub: .8, invalidateOnRefresh: true,
      onUpdate: s => gsap.set('[data-progress]', { scaleX: s.progress }) } });
  gsap.from('.slide__meta', { y: 20, opacity: 0, stagger: .08, scrollTrigger: { trigger: '.portfolio', start: 'top 60%' } });

  // foto que abre até a tela cheia
  const ex = gsap.timeline({ scrollTrigger: { trigger: '.expand', start: 'top top', end: 'bottom bottom', scrub: 1 } });
  ex.fromTo('.expand__frame', { clipPath: 'inset(28% 34% 28% 34% round 8px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut', duration: 1 })
    .fromTo('.expand__frame img', { scale: 1.4 }, { scale: 1, ease: 'power2.inOut', duration: 1 }, 0)
    .fromTo('.expand__words', { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: .5 }, .55)
    .to('.expand__words', { opacity: 1, duration: .3 });

  // títulos de seção sobem
  $$('.h2, .contact__title').forEach(h => gsap.from(h, { yPercent: 40, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 88%' } }));
  gsap.from('.svc__row', { y: 50, opacity: 0, duration: 1, ease: 'expo.out', stagger: .07, scrollTrigger: { trigger: '.svc', start: 'top 80%' } });

  // mosaico: profundidade 3D com o scroll e o ponteiro
  $$('.m').forEach(m => gsap.from(m, { y: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: m, start: 'top 90%' } }));

  // processo: linha e passos acendem
  gsap.to('.steps', { '--p': 1, ease: 'none', scrollTrigger: { trigger: '.steps', start: 'top 75%', end: 'bottom 55%', scrub: true,
    onUpdate: s => $$('.step').forEach((st, i, a) => st.classList.toggle('is-on', s.progress >= i / a.length + .05)) } });
  gsap.from('.step', { y: 40, opacity: 0, duration: 1, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: '.steps', start: 'top 85%' } });

  // sobre: fotos abrem de baixo para cima
  $$('[data-reveal]').forEach((f, i) => {
    gsap.to(f, { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'expo.inOut', delay: i * .15, scrollTrigger: { trigger: '.about', start: 'top 65%' } });
    gsap.to($('img', f), { scale: 1, duration: 2, ease: 'expo.out', delay: i * .15, scrollTrigger: { trigger: '.about', start: 'top 65%' } });
  });

  // contato: fundo em paralaxe, nome do rodapé desliza
  gsap.from('.form', { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.contact', start: 'top 70%' } });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
