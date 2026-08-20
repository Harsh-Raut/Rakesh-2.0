/* ============================================================
   PROJECT R — booking site
   ------------------------------------------------------------
   ⚑ SET THIS FIRST: WhatsApp number in international format,
     digits only, no + and no spaces. e.g. India 98765 43210
     becomes "919876543210".
   ============================================================ */
const WHATSAPP_NUMBER = '910000000000';   // ← replace
const PHONE_DISPLAY   = '+91 XXXXX XXXXX'; // ← replace
const PHONE_DIAL      = '+910000000000';   // ← replace

(function () {
  'use strict';
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const waLink = msg => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  /* ---------- 1. WHATSAPP WIRING ---------- */
  // Every element with class .wa becomes a click-to-chat link with its own
  // pre-filled message, taken from data-wa.
  $$('.wa').forEach(el => {
    const msg = el.dataset.wa || 'Hi, I want to check availability for my event.';
    el.setAttribute('href', waLink(msg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });
  $('#waNumber').textContent = PHONE_DISPLAY;
  $('#callCard').setAttribute('href', 'tel:' + PHONE_DIAL);

  /* ---------- 2. DOOR ---------- */
  const door = $('#door'), fill = $('#doorFill'), pct = $('#doorPct');
  let p = 0;
  const tick = setInterval(() => {
    p = Math.min(100, p + Math.random() * 14);
    fill.style.width = p + '%';
    pct.textContent = String(Math.floor(p)).padStart(2, '0');
    if (p >= 100) clearInterval(tick);
  }, 120);
  const openDoor = () => {
    door.classList.add('open');
    document.body.style.overflow = '';
    setTimeout(() => door.remove(), 900);
  };
  document.body.style.overflow = 'hidden';
  $('#enterBtn').addEventListener('click', openDoor);
  setTimeout(() => { if (document.body.contains(door)) openDoor(); }, 4500);

  /* ---------- 3. CURSOR ---------- */
  const dot = $('.cursor'), ring = $('.cursor-ring');
  if (!matchMedia('(max-width:900px)').matches) {
    let x = 0, y = 0, rx = 0, ry = 0;
    addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });
    (function loop() {
      rx += (x - rx) * .16; ry += (y - ry) * .16;
      dot.style.transform  = `translate(${x - 3}px,${y - 3}px)`;
      ring.style.transform = `translate(${rx - 18}px,${ry - 18}px)`;
      requestAnimationFrame(loop);
    })();
    const hot = 'a,button,.panel,.svc,.step,.pkg,.kit,.shot,.tst,.faq-q,input,select,textarea';
    document.addEventListener('mouseover', e => { if (e.target.closest(hot)) ring.classList.add('hot'); });
    document.addEventListener('mouseout',  e => { if (e.target.closest(hot)) ring.classList.remove('hot'); });
  }

  /* ---------- 4. AMBIENT SPECKS ---------- */
  if (!reduced) {
    const box = $('#specks'), tones = ['#00f0ff', '#ff2bd1', '#c6ff3d', '#ffb43d'];
    for (let i = 0; i < 34; i++) {
      const s = document.createElement('i');
      s.className = 'speck';
      s.style.left = Math.random() * 100 + '%';
      s.style.background = tones[i % 4];
      s.style.animationDuration = 14 + Math.random() * 22 + 's';
      s.style.animationDelay = -Math.random() * 30 + 's';
      box.appendChild(s);
    }
  }

  /* ---------- 5. NAV ---------- */
  const nav = $('#nav'), burger = $('#burger'), menu = $('#menu');
  addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 60), { passive: true });
  burger.addEventListener('click', () => { burger.classList.toggle('x'); menu.classList.toggle('show'); });
  $$('#menu a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('x'); menu.classList.remove('show');
  }));

  /* ---------- 6. EQUALIZER ---------- */
  const eq = $('#eq');
  for (let i = 0; i < 40; i++) {
    const b = document.createElement('i');
    b.style.animationDuration = (.5 + Math.random() * .8).toFixed(2) + 's';
    b.style.animationDelay = (-Math.random() * 1.2).toFixed(2) + 's';
    eq.appendChild(b);
  }

  /* ---------- 7. TICKER ---------- */
  const lines = ['WEDDINGS &amp; SANGEET', 'CLUB &amp; PUB NIGHTS', 'CORPORATE EVENTS',
    'PRIVATE PARTIES', 'COLLEGE FESTS', 'SOUND · LIGHTING · DHOL · LED',
    'NOW BOOKING 2026 DATES', 'SAME-DAY REPLY'];
  const strip = lines.map(t => `<span>${t} <b>◆</b></span>`).join('');
  $('#ticker').innerHTML = strip + strip;

  /* ---------- 8. FAQ ---------- */
  const faqs = [
    ['How far in advance should I book?',
     'For wedding season and December dates, two to four months is safe — the good dates go early. Club and private bookings can often be arranged within a couple of weeks. If your date is close, message anyway; cancellations happen.'],
    ['How do I confirm the booking?',
     'A part-advance holds the date and you get a written confirmation with the inclusions and timings listed. The balance is settled on the event day. Nothing is held on a verbal yes — that protects both of us.'],
    ['Do you bring your own sound and lighting?',
     'Yes. A complete PA, DJ console, dancefloor lighting and two wireless mics come as standard, sized to your guest count. If the venue already has a rig, I can work on theirs instead and the quote drops accordingly.'],
    ['Can we give you a playlist?',
     'Please do. Send a must-play list and a do-not-play list before the event, plus any entry songs with exact cue points. On the night I read the floor and work your list in where it lands best.'],
    ['Do you travel outside the city?',
     'Yes, across India for destination weddings and out-station events. Travel, stay and transport for the crew and equipment are added to the quote — you will see them itemised, never as a surprise.'],
    ['What happens if equipment fails mid-event?',
     'Backup players, a spare mixer and spare cabling are on site at every booking, and outdoor venues can add a backup generator. The music does not stop while something gets swapped.'],
    ['Do you do clean/family-friendly sets?',
     'Yes — clean edits only is the default for weddings and corporate events. Just confirm it when booking and it is noted on the confirmation.'],
    ['Can you handle the anchoring and announcements?',
     'Basic announcements and cue-ins, yes. For a full MC or anchor, that is an add-on and I can bring someone I have worked with before.']
  ];
  $('#faqList').innerHTML = faqs.map(([q, a]) => `
    <div class="faq-item">
      <div class="faq-q">${q}<i>+</i></div>
      <div class="faq-a"><p>${a}</p></div>
    </div>`).join('');
  $$('.faq-q').forEach(q => q.addEventListener('click', () => {
    const item = q.parentElement, open = item.classList.contains('open');
    $$('.faq-item').forEach(i => { i.classList.remove('open'); $('.faq-a', i).style.maxHeight = null; });
    if (!open) { item.classList.add('open'); $('.faq-a', item).style.maxHeight = $('.faq-a', item).scrollHeight + 'px'; }
  }));

  /* ---------- 9. PANEL SPOTLIGHT ---------- */
  document.addEventListener('mousemove', e => {
    const el = e.target.closest('.panel');
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });

  /* ---------- 10. REVEAL + COUNTERS + METERS ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
      if (en.target.id === 'meters') $$('.meter-bar i', en.target).forEach(b => b.style.width = b.dataset.w + '%');
    });
  }, { threshold: .16 });
  $$('.rv').forEach(el => io.observe(el));

  // Counters animate only when the placeholder has been replaced with a real
  // number. "000" / "00" stay as-is so nobody mistakes them for real stats.
  const co = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, raw = el.dataset.count, target = parseFloat(raw);
      co.unobserve(el);
      if (!isFinite(target) || target === 0) { el.textContent = raw; return; }
      const suffix = el.dataset.suffix || '', dec = target % 1 !== 0 ? 1 : 0;
      let t0 = null;
      const step = ts => {
        if (!t0) t0 = ts;
        const k = Math.min(1, (ts - t0) / 1500);
        el.textContent = (target * (1 - Math.pow(1 - k, 3))).toFixed(dec) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: .5 });
  $$('[data-count]').forEach(el => co.observe(el));

  /* ---------- 11. ENQUIRY FORM → WHATSAPP ---------- */
  // No backend needed: the form composes a message and hands it to WhatsApp.
  $('#bookForm').addEventListener('submit', e => {
    e.preventDefault();
    const val = s => $(s).value.trim();
    let bad = false;
    ['#f-name', '#f-phone', '#f-date'].forEach(s => {
      const f = $(s), empty = !f.value.trim();
      f.style.borderColor = empty ? 'var(--blood)' : '';
      if (empty) bad = true;
    });
    if (bad) return;

    const msg = [
      'Hi, I would like to check availability.',
      '',
      `Name: ${val('#f-name')}`,
      `Phone: ${val('#f-phone')}`,
      `Event date: ${val('#f-date')}`,
      val('#f-city') ? `City: ${val('#f-city')}` : null,
      `Event type: ${val('#f-type')}`,
      `Guests: ${val('#f-guests')}`,
      `Duration: ${val('#f-hours')}`,
      val('#f-msg') ? `Details: ${val('#f-msg')}` : null
    ].filter(Boolean).join('\n');

    $('#formOk').classList.add('show');
    window.open(waLink(msg), '_blank', 'noopener');
  });

  /* ---------- 12. EVENT CARDS — tilt, glow, live BPM ---------- */
  // Pointer-driven 3D tilt. Fine pointers only; touch keeps the CSS fallback.
  if (!reduced && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    $$('.svc').forEach(card => {
      card.classList.add('tilt');
      let raf = null;
      const onMove = e => {
        if (card.dataset.stacked === '1') return;   // still in the crate
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = null;
          const rx = (0.5 - py) * 9, ry = (px - 0.5) * 11;
          card.style.transform =
            `perspective(1400px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-8px) scale(1.015)`;
        });
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  // BPM ticks up to its real value while the card is hovered, then settles back.
  $$('.svc').forEach(card => {
    const el = $('.nm-top b', card);
    if (!el) return;
    const target = parseInt(el.dataset.bpm, 10);
    let timer = null;
    const run = (from, to, done) => {
      clearInterval(timer);
      let v = from;
      timer = setInterval(() => {
        v += (to > v ? 1 : -1) * Math.max(1, Math.round(Math.abs(to - v) / 6));
        if ((to > from && v >= to) || (to < from && v <= to)) { v = to; clearInterval(timer); }
        el.textContent = v + ' BPM';
        if (done && v === to) done();
      }, 26);
    };
    card.addEventListener('mouseenter', () => run(Math.round(target * 0.72), target));
    card.addEventListener('mouseleave', () => { clearInterval(timer); el.textContent = target + ' BPM'; });
  });

  /* ---------- 12b. THE CRATE — cards deal out of a stack ---------- */
  // Cards begin overlapped at the centre of the row, scaled back and dimmed,
  // then slide into their grid slots as the section scrolls into view.
  // Scroll-progress driven, so scrolling back up re-stacks them.
  (function crate() {
    const grid = $('.svc-grid');
    if (!grid || reduced) return;
    const cards = $$('.svc', grid);
    if (!cards.length) return;
    grid.classList.add('crate');

    const FAN = [-10, -3.5, 3.5, 10];  // degrees of rotation while stacked
    let offsets = [], ticking = false;

    // Measure each card's distance from the stack point (the row's centre).
    const measure = () => {
      cards.forEach(c => { c.style.transform = ''; });
      const gr = grid.getBoundingClientRect();
      const cx = gr.left + gr.width / 2, cy = gr.top + gr.height / 2;
      offsets = cards.map(c => {
        const r = c.getBoundingClientRect();
        return { dx: cx - (r.left + r.width / 2), dy: cy - (r.top + r.height / 2) };
      });
    };

    // Only meaningful where the cards sit side by side. In a single column the
    // stack point is vertical, which just throws cards past each other.
    const wide = () => matchMedia('(min-width:981px)').matches;

    const reset = () => cards.forEach(c => {
      c.dataset.stacked = '0'; c.dataset.deployed = '1';
      c.style.transform = ''; c.style.filter = ''; c.style.zIndex = '';
    });

    const apply = () => {
      if (!wide()) { reset(); return; }
      const gr = grid.getBoundingClientRect();
      const vh = innerHeight;
      // 0 while the row is still low in the viewport, 1 once it has risen into place
      // Range is tuned so the cards are ALREADY on screen while still stacked:
      // p=0 when the row's top edge sits at 80% viewport height (just appearing),
      // p=1 by the time it reaches 25% — the whole deal-out happens in view.
      const p = Math.min(1, Math.max(0, (vh * 0.80 - gr.top) / (vh * 0.55)));
      const e = 1 - Math.pow(1 - p, 3);          // ease-out
      const stacked = e < 0.995;

      cards.forEach((c, i) => {
        if (!stacked) {
          if (c.dataset.stacked === '1') {
            c.dataset.stacked = '0';
            c.dataset.deployed = '1';
            c.style.transform = '';
            c.style.filter = '';
            c.style.zIndex = '';
          }
          return;
        }
        c.dataset.stacked = '1';
        c.dataset.deployed = '0';
        const o = offsets[i] || { dx: 0, dy: 0 };
        const k = 1 - e;
        const depth = i / (cards.length - 1);                          // 0 = front, 1 = buried
        const tx = o.dx * k + (i - (cards.length - 1) / 2) * 20 * k;   // crate fan
        const ty = o.dy * k + (52 + depth * 26) * k;                   // deeper cards sit lower
        c.style.transform =
          `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${(1 - (0.26 + depth * 0.06) * k).toFixed(3)}) rotate(${(FAN[i % 4] * k).toFixed(2)}deg)`;
        c.style.filter =
          `brightness(${(1 - 0.58 * k * (depth * 0.7 + 0.3)).toFixed(3)}) blur(${(2.6 * k * depth).toFixed(2)}px)`;
        c.style.zIndex = String(cards.length - i);   // leftmost on top, like the shelf
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; apply(); });
    };

    const init = () => { if (wide()) measure(); apply(); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', () => { measure(); apply(); });
    addEventListener('load', init);
    init();
  })();

  /* ---------- 12c. PINNED HORIZONTAL SCROLL — how it works ---------- */
  // Vertical scroll drives the track sideways while the section is pinned.
  // The runway height is computed from the real track width so the last panel
  // always lands flush — no dead scroll at either end.
  (function hscroll() {
    const sec = $('#process');
    if (!sec) return;
    const wrap = $('.pin-wrap', sec), track = $('#htrack'), prog = $('#hprog');
    if (!wrap || !track) return;
    const panels = $$('.hpanel', track);
    let travel = 0, ticking = false;

    const wide = () => matchMedia('(min-width:981px)').matches && !reduced;

    const measure = () => {
      if (!wide()) { wrap.style.height = ''; track.style.transform = ''; return; }
      // distance the track must move for its right edge to reach the viewport edge
      const pad = parseFloat(getComputedStyle(track).paddingLeft) || 34;
      travel = Math.max(0, track.scrollWidth - innerWidth + pad);
      // 1.25x runway: a little slower than 1:1 so it reads as deliberate
      wrap.style.height = (innerHeight + travel * 1.25) + 'px';
    };

    const apply = () => {
      if (!wide()) return;
      const total = wrap.offsetHeight - innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / total)) : 0;
      track.style.transform = `translate3d(${(-p * travel).toFixed(1)}px,0,0)`;
      if (prog) prog.style.width = (p * 100).toFixed(2) + '%';
      const idx = Math.round(p * (panels.length - 1));
      panels.forEach((el, i) => el.classList.toggle('active', i === idx));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; apply(); });
    };

    // On narrow screens the track is a native swipe strip, so the rail and the
    // active panel follow the track's own horizontal scroll instead.
    track.addEventListener('scroll', () => {
      if (wide()) return;
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 0;
      if (prog) prog.style.width = (p * 100).toFixed(2) + '%';
      const idx = Math.round(p * (panels.length - 1));
      panels.forEach((el, i) => el.classList.toggle('active', i === idx));
    }, { passive: true });

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', () => { measure(); apply(); });
    addEventListener('load', () => { measure(); apply(); });
    measure(); apply();
    if (!wide() && panels[0]) panels[0].classList.add('active');
  })();

  /* ---------- 13. SECTION DIVIDERS ---------- */
  // A line that draws itself in as each section arrives.
  const divIo = new IntersectionObserver(en => {
    en.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); divIo.unobserve(e.target); } });
  }, { threshold: .6 });
  $$('section').forEach(sec => {
    if (sec.id === 'top') return;
    const line = document.createElement('span');
    line.className = 'sdiv';
    sec.parentNode.insertBefore(line, sec);
    divIo.observe(line);
  });

  /* ---------- 14. ROOM HUE — background shifts per section ---------- */
  const hue = $('#hue');
  const hueIo = new IntersectionObserver(en => {
    en.forEach(e => {
      if (e.isIntersecting && e.target.dataset.hue) hue.style.setProperty('--hue', e.target.dataset.hue);
    });
  }, { threshold: .35 });
  $$('[data-hue]').forEach(sec => hueIo.observe(sec));

  /* ---------- 15. SCROLL PLAYHEAD ---------- */
  const head = $('#playhead');
  let phTick = false;
  addEventListener('scroll', () => {
    if (phTick) return;
    phTick = true;
    requestAnimationFrame(() => {
      phTick = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      head.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    });
  }, { passive: true });

  /* ---------- 16. MISC ---------- */
  $('#yr').textContent = new Date().getFullYear();
  if (!reduced) {
    const rig = $('#lasers');
    addEventListener('mousemove', e => {
      rig.style.transform = `translateX(${(e.clientX / innerWidth - .5) * 26}px)`;
    });
  }
})();
