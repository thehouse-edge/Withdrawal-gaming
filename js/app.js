/* WITHDRAWAL GAMING - router + views. Data: data.js. Legal copy: legal.js. */
{
  const D = window.WG, C = D.config, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = { get(k) { try { return sessionStorage.getItem(k); } catch { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch { } } };
  const local = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch { } } };
  const STATUS = { 'in-development': ['In development', 'dev'], concept: ['Concept', ''], released: ['Released', 'dev'] };
  const pill = s => `<span class="pill ${STATUS[s][1]}">${STATUS[s][0]}</span>`;
  const tbc = (v, t = 'TBC') => v ? esc(v) : `<span class="tbc">${t}</span>`;
  const img = (g, sizes = '(max-width: 900px) 46vw, 380px', eager = false) =>
    `<img src="assets/games/${g.slug}_480w.webp" srcset="assets/games/${g.slug}_480w.webp 480w, assets/games/${g.slug}_960w.webp 960w" sizes="${sizes}" alt="${esc(g.title)} cover artwork" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

  /* barcode: decorative, derived from a string so each batch looks different */
  function barcode(str, h = 30) {
    let x = 0, bars = '', seed = [...str].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
    for (let i = 0; i < 34; i++) { seed = (seed * 1103515245 + 12345) >>> 0; const w = 1 + (seed >>> 28) % 3; if (i % 2 === 0) bars += `<rect x="${x}" y="0" width="${w}" height="${h}"/>`; x += w; }
    return `<svg viewBox="0 0 ${x} ${h}" fill="currentColor" aria-hidden="true">${bars}</svg>`;
  }

  /* ---------------- shared blocks ---------------- */
  const coverCard = (g, eager) => `<a class="cover" href="#game-${g.slug}"><div class="slot">${img(g, undefined, eager)}</div>
    <div class="cap"><span class="lot">Lot ${g.lot} · ${esc(g.theme)}</span>${pill(g.status)}</div></a>`;
  const specRows = g => {
    const s = g.specs;
    return [['Grid', s.grid], ['RTP', s.rtp], ['Volatility', s.volatility], ['Maximum win', s.maxWin], ['Bonus features', s.features], ['Release date', s.release, 'Not announced'], ['Devices', s.devices], ['Demo', g.demo ? 'Available' : null, 'Not available yet']]
      .map(([k, v, t]) => `<tr><th scope="row">${k}</th><td>${tbc(v, t)}</td></tr>`).join('');
  };
  const label = g => `<div class="label"><div class="lh"><span>WITHDRAWAL GAMING · LOT ${g.lot}</span><span>${STATUS[g.status][0]}</span></div>
    <table><caption class="sr">${esc(g.title)} specification</caption>${specRows(g)}</table>
    <div class="lf"><span>Figures appear only once verified in approved game documentation. TBC = to be confirmed.</span>${barcode('WG' + g.lot)}</div></div>`;

  /* ---------------- views ---------------- */
  const V = {};
  V.home = () => {
    const f = D.games[0];
    return `
    <section class="hero" aria-labelledby="hero-h">
      <div class="wrap">
        <div>
          <p class="kicker">Independent slot studio · Batch WG-01</p>
          <h1 id="hero-h"><span class="ln">Not as</span><span class="ln">prescribed<span class="stop">.</span></span></h1>
          <p class="lede">We make slot games with characters, plots and a questionable sense of humour. Built for licensed operators. Labelled honestly.</p>
          <div class="ctas"><a class="btn solid" href="#games">See the lineup</a><a class="btn" href="#partners">Partner with us</a></div>
        </div>
        <div class="stage">
          <div class="capsule">
            <video muted playsinline preload="auto" aria-label="Withdrawal Gaming capsule mascot animation" src="assets/video/withdrawal-capsule.mp4"></video>
            <button class="btn sm replay" type="button" aria-label="Replay the capsule animation">↺ Replay</button>
          </div>
          <div class="rx" aria-label="Studio label">
            <header><span>Rx · WG-01</span><span>For trade use</span></header>
            <div class="bd"><strong>Withdrawal Gaming</strong>
              <dl><dt>Contents</dt><dd>6 original slot concepts</dd><dt>Status</dt><dd>Concept and development</dd><dt>Audience</dt><dd>Licensed operators, 18+</dd></dl></div>
            <div class="bc">${barcode('WITHDRAWAL')}<span class="small">Side effects may vary.</span></div>
          </div>
        </div>
      </div>
    </section>
    <div class="tape" aria-hidden="true"><div class="track">${Array(2).fill(['Side effects may vary', 'Six titles in concept & development', 'For licensed operators only', '18+', 'Not as prescribed', 'Characters first'].map(t => `<span>${t}</span>`).join('')).join('')}</div></div>

    <section class="band" aria-labelledby="feat-h"><div class="wrap feature">
      <a class="art" href="#game-${f.slug}">${img(f, '(max-width: 820px) 80vw, 440px')}</a>
      <div>
        <p class="kicker">Flagship · Lot ${f.lot}</p>
        <h2 id="feat-h">${f.title}</h2>
        <p class="taglines">${f.taglines.map(t => `<span>${t}</span>`).join('')}</p>
        <p>${esc(f.description)}</p>
        ${label(f)}
        <div class="ctas" style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn solid" href="#game-${f.slug}">Open the file</a><a class="btn" href="#partners" data-game="${f.slug}">Enquire about ${f.title}</a></div>
      </div>
    </div></section>

    <section class="band" style="padding-top:0" aria-labelledby="lineup-h"><div class="wrap">
      <div class="sec-head"><div><p class="kicker">The lineup</p><h2 id="lineup-h">Six titles. None of them sensible.</h2>
        <p>Every game is a concept or in development. Nothing here is live, released or available to play yet.</p></div>
        <a class="btn" href="#games">Filter the catalogue</a></div>
      <div class="lineup">${D.games.map(g => coverCard(g)).join('')}</div>
    </div></section>

    <section class="band" style="padding-top:0" aria-labelledby="studio-h"><div class="wrap leaflet">
      <div><p class="kicker">Patient information leaflet</p><h2 id="studio-h">A different kind of slot studio.</h2>
        <p style="margin-top:20px">Withdrawal Gaming is an independent studio building original slot concepts with their own worlds, casts and running jokes. We would rather draw a bloodhound in a trench coat than another gold coin.</p>
        <a class="btn" href="#studio">Read the full leaflet</a></div>
      <div class="folds">
        <div><h3>What it is</h3><p>A B2B game studio. We design and build slot games for licensed operators and platforms.</p></div>
        <div><h3>What it is not</h3><p>A casino. We do not take bets, hold player accounts or offer real-money play on this site.</p></div>
        <div><h3>Active ingredients</h3><p>Characters first, satire throughout, mechanics that earn their place, art that reads at lobby size.</p></div>
        <div><h3>Known side effects</h3><p>Strong opinions about typography. Allergy to stock photography. Honest labelling.</p></div>
      </div>
    </div></section>

    <section class="band" style="padding-top:0" aria-labelledby="soon-h"><div class="wrap">
      <div class="sec-head"><div><p class="kicker">In the pipeline</p><h2 id="soon-h">Coming soon, eventually.</h2></div><a class="btn" href="#coming-soon">Development status</a></div>
      ${pipeline(D.games.slice(0, 3))}
    </div></section>

    <section class="partner-band band" aria-labelledby="pb-h"><div class="wrap">
      <div><p class="kicker">Operators & partnerships</p><h2 id="pb-h">Stock our shelves.</h2>
        <p style="margin-top:18px">We are opening early conversations with operators, aggregators and platforms about distribution, integration and launch planning.</p>
        <a class="btn solid" href="#partners">Start an enquiry</a></div>
      <ul><li>Operators & casino brands</li><li>Aggregators & distribution</li><li>Platform integrations</li><li>Marketing & promotional assets</li></ul>
    </div></section>

    <section class="band" aria-labelledby="up-h"><div class="wrap">
      <div class="sec-head"><div><p class="kicker">Studio updates</p><h2 id="up-h">The small print.</h2></div><a class="btn" href="#updates">All updates</a></div>
      ${posts(D.posts)}
    </div></section>`;
  };

  const pipeline = list => `<div class="rows">${list.map(g => `<a class="row" href="#game-${g.slug}">${img(g, '90px')}
    <h3>${g.title}</h3><p>${esc(g.short)} Release date not announced.</p>${pill(g.status)}</a>`).join('')}</div>`;
  const posts = list => `<div class="posts">${list.map(p => `<a class="post" href="#update-${p.slug}"><span class="meta"><span>${p.kind}</span><span class="tbc">Draft · date TBC</span></span>
    <h3>${esc(p.title)}</h3><p>${esc(p.dek)}</p></a>`).join('')}</div>`;
  const head = (k, h, p) => `<section class="page-head"><div class="wrap"><p class="kicker">${k}</p><h1 id="page-h">${h}</h1>${p ? `<p>${p}</p>` : ''}</div></section>`;

  let filt = { status: 'all', theme: 'all', q: '' };
  V.games = () => {
    const themes = [...new Set(D.games.map(g => g.theme))];
    return head('Games', 'The lineup.', 'Six original titles, each with its own world. All are concepts or in development: nothing listed here is live or released.') + `
    <section class="band" style="padding-top:40px"><div class="wrap">
      <div class="filters" role="search">
        <span class="sr" id="st-l">Filter by status</span>
        ${[['all', 'All'], ['in-development', 'In development'], ['concept', 'Concept'], ['released', 'Released']].map(([v, t]) => `<button class="chip" type="button" data-status="${v}" aria-pressed="${filt.status === v}">${t}</button>`).join('')}
        <label class="sr" for="theme">Theme</label>
        <select id="theme" style="width:auto;border-radius:999px;min-height:44px"><option value="all">All themes</option>${themes.map(t => `<option ${filt.theme === t ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>
        <div class="search"><label class="sr" for="q">Search games</label><input id="q" type="search" placeholder="Search titles or themes" value="${esc(filt.q)}"></div>
      </div>
      <p class="small" id="count" aria-live="polite"></p>
      <div class="lineup" id="grid"></div>
    </div></section>`;
  };
  function drawGrid() {
    const q = filt.q.trim().toLowerCase();
    const list = D.games.filter(g => (filt.status === 'all' || g.status === filt.status) && (filt.theme === 'all' || g.theme === filt.theme) && (!q || (g.title + ' ' + g.theme + ' ' + g.short).toLowerCase().includes(q)));
    $('#grid').innerHTML = list.length ? list.map(g => coverCard(g)).join('') : `<div class="empty" style="grid-column:1/-1"><h3>${filt.status === 'released' ? 'Nothing released yet.' : 'No matches.'}</h3><p style="margin:10px auto 0">${filt.status === 'released' ? 'Every Withdrawal Gaming title is currently a concept or in development.' : 'Try a different theme or search.'}</p></div>`;
    $('#count').textContent = `${list.length} of ${D.games.length} titles`;
  }

  V.game = slug => {
    const i = D.games.findIndex(g => g.slug === slug); if (i < 0) return null;
    const g = D.games[i], prev = D.games[(i + D.games.length - 1) % D.games.length], next = D.games[(i + 1) % D.games.length];
    return `<div class="wrap"><article class="game" aria-labelledby="page-h">
      <div class="art">${img(g, '(max-width: 860px) 340px, 520px', true)}</div>
      <div>
        <p class="meta"><a href="#games">Games</a><span aria-hidden="true">/</span><span>Lot ${g.lot}</span>${pill(g.status)}</p>
        <h1 id="page-h">${g.title}</h1>
        ${g.taglines ? `<p class="taglines">${g.taglines.map(t => `<span>${t}</span>`).join('')}</p>` : `<p class="taglines"><span>${esc(g.short)}</span></p>`}
        <p>${esc(g.description)}</p>
        <p class="meta" style="margin:20px 0 6px"><span>Theme: ${esc(g.theme)}</span><span style="flex-basis:100%;font-weight:400;color:var(--ink2)">${esc(g.world)}</span></p>
        <div class="meta" style="margin-bottom:30px"><span>Palette</span><span class="swatches">${g.palette.map(c => `<i style="background:${c}" title="${c}"></i>`).join('')}</span></div>
        <h2 style="font-size:28px;margin:10px 0 12px">Cast</h2>
        <div class="cast">${g.characters.map(([n, d]) => `<div><b>${esc(n)}</b><span>${esc(d)}</span></div>`).join('')}</div>
        <h2 style="font-size:28px;margin:10px 0 12px">Creative direction</h2>
        <p>${esc(g.direction)}</p>
        <h2 style="font-size:28px;margin:34px 0 0">Specification</h2>
        ${label(g)}
        <h2 style="font-size:28px;margin:34px 0 10px">Demo & operators</h2>
        <p>${g.demo ? 'A demo is available.' : 'No public demo is available yet. A free-play demo will be published when a build is approved.'} Operators can request early access to artwork, game sheets and integration timelines.</p>
        <a class="btn solid" href="#partners" data-game="${g.slug}">Enquire about ${g.title}</a>
        <nav class="pager" aria-label="More games"><a class="btn sm" href="#game-${prev.slug}">← ${prev.title}</a><a class="btn sm" href="#game-${next.slug}">${next.title} →</a></nav>
      </div></article></div>`;
  };

  V.studio = () => head('About the studio', 'Not your usual slot studio.', 'An independent studio for original slot games with their own worlds, characters and running jokes.') + `
    <section class="band"><div class="wrap leaflet">
      <div class="prose">
        <h2 style="margin-top:0">Why we exist</h2>
        <p>Most slot lobbies look the same: gold coins, gemstones, lightning and the same three ancient gods. We think games can have premises, casts and punchlines, the way a good animated series does.</p>
        <p>So every Withdrawal Gaming title starts as an idea you could pitch as a cartoon: a detective bloodhound on the night beat, a laundromat with excellent cash flow, a man in a red convertible finding himself. Mechanics come next, and they have to earn their place.</p>
        <h2>How we work</h2>
        <ul><li><b>Characters first.</b> If the cast is not funny without the reels, the reels will not save it.</li><li><b>Readable at lobby size.</b> Every cover is designed to work as a thumbnail on a phone.</li><li><b>Honest labels.</b> No RTP, maximum win or release date goes public until it is verified.</li><li><b>Satire with limits.</b> We aim the jokes at our characters and their worlds, never at players, and we never present gambling as a solution to anything.</li></ul>
        <h2>Where we are</h2>
        <p>We are a new studio. Our six titles are in concept or development, and we are opening conversations with operators and platforms. We have no released games, awards or certifications to report yet, and we will not pretend otherwise.</p>
      </div>
      <div>
        <div class="folds" style="grid-template-columns:1fr">
          <div><h3>Studio vs operator</h3><p>Withdrawal Gaming develops and supplies game software to licensed businesses. We do not accept wagers, run player accounts or offer real-money gambling on this website.</p></div>
          <div><h3>Who we work with</h3><p>Licensed operators, aggregators and platform partners, subject to applicable law and certification in each market.</p></div>
          <div><h3>Age</h3><p>Our games are designed for adults (18+, or higher where local law requires). This site is not directed at minors.</p></div>
        </div>
      </div>
    </div></section>`;

  V['coming-soon'] = () => head('Coming soon', 'In the pipeline.', 'Development status for every title. Dates appear when they are real, not before.') +
    `<section class="band" style="padding-top:40px"><div class="wrap">${pipeline(D.games)}</div></section>`;

  V.updates = () => head('Studio updates', 'The small print.', 'Announcements, development notes and behind-the-scenes. Draft posts are marked as drafts.') + `<section class="band" style="padding-top:40px"><div class="wrap">${posts(D.posts)}</div></section>`;
  V.update = slug => {
    const p = D.posts.find(x => x.slug === slug); if (!p) return null;
    return head(p.kind, esc(p.title), esc(p.dek)) + `<section class="band" style="padding-top:40px"><div class="wrap prose"><div class="draft"><strong>Draft post</strong><span>Publication date to be confirmed. Copy subject to owner approval.</span></div>${p.body.map(b => `<p>${esc(b)}</p>`).join('')}<p><a class="btn sm" href="#updates">← All updates</a></p></div></section>`;
  };

  const opts = (a) => a.map(o => `<option>${o}</option>`).join('');
  function form(kind) {
    const pre = store.get('wg-game');
    const partner = kind === 'partner';
    return `<form class="form" novalidate data-kind="${kind}">
      <div><label for="f-name">Name <span class="req">*</span></label><input id="f-name" name="name" autocomplete="name" required><span class="err"></span></div>
      <div><label for="f-email">Work email <span class="req">*</span></label><input id="f-email" name="email" type="email" autocomplete="email" required><span class="err"></span></div>
      ${partner ? `<div><label for="f-co">Company <span class="req">*</span></label><input id="f-co" name="company" autocomplete="organization" required><span class="err"></span></div>
      <div><label for="f-type">Enquiry type <span class="req">*</span></label><select id="f-type" name="type" required><option value="">Choose one</option>${opts(['Operator / casino brand', 'Aggregator', 'Distribution partner', 'Platform integration', 'Commercial partnership', 'Marketing & promotional assets'])}</select><span class="err"></span></div>
      <div><label for="f-mk">Markets of interest</label><input id="f-mk" name="markets" placeholder="e.g. Ontario, Sweden, Brazil"></div>
      <div><label for="f-game">Title of interest</label><select id="f-game" name="game"><option value="">Any / whole lineup</option>${D.games.map(g => `<option value="${g.title}" ${pre === g.slug ? 'selected' : ''}>${g.title}</option>`).join('')}</select></div>`
      : `<div class="full"><label for="f-topic">Topic <span class="req">*</span></label><select id="f-topic" name="topic" required><option value="">Choose one</option>${opts(['General enquiry', 'Commercial partnership', 'Technical enquiry', 'Media & press', 'Careers & creative collaboration'])}</select><span class="err"></span></div>`}
      <div class="full"><label for="f-msg">Message <span class="req">*</span></label><textarea id="f-msg" name="message" rows="5" required></textarea><span class="err"></span></div>
      <div class="full check"><input id="f-ok" name="consent" type="checkbox" required><label for="f-ok" style="font-weight:400;margin:0">I agree that Withdrawal Gaming may use these details to reply to this enquiry, as described in the <a href="#privacy">privacy policy</a>. <span class="req">*</span></label></div>
      <span class="err full" id="f-ok-err"></span>
      <div class="full" style="display:flex;gap:12px;flex-wrap:wrap;align-items:center"><button class="btn solid" type="submit">Send enquiry</button><span class="small">Fields marked * are required.</span></div>
      <div class="notice" role="status" hidden></div>
    </form>`;
  }

  V.partners = () => head('Operators & partnerships', 'Stock our shelves.', 'For operators, aggregators and platforms interested in distributing Withdrawal Gaming titles.') + `
    <section class="band" style="padding-top:40px"><div class="wrap leaflet">
      <div class="prose">
        <h2 style="margin-top:0">Who this is for</h2>
        <ul><li>Licensed operators and casino brands</li><li>Aggregators and distribution partners</li><li>Platform and RGS integrations</li><li>Commercial and co-marketing partnerships</li></ul>
        <h2>What partners can expect</h2>
        <ul><li>Early access to artwork, characters and game sheets</li><li>Game specifications once verified in approved documentation</li><li>Promotional asset packs: covers, logos and key art, on request</li><li>Integration planning and launch timelines when builds are approved</li></ul>
        <h2>Status, plainly</h2>
        <p>Withdrawal Gaming does not currently claim any gambling licence, testing certification, regulatory approval or operator partnership. When any of these are confirmed they will be listed on the <a href="#licensing">licensing page</a>.</p>
      </div>
      <div><h2 style="font-size:30px;margin-bottom:16px">Commercial enquiry</h2>${form('partner')}</div>
    </div></section>`;

  V.contact = () => {
    const e = v => v ? `<a href="mailto:${esc(v)}">${esc(v)}</a>` : '<span class="tbc">Address to be confirmed</span>';
    return head('Contact', 'Say hello.', 'Pick the right desk and we will get back to you.') + `
    <section class="band" style="padding-top:40px"><div class="wrap">
      <div class="contact-grid">
        <div><h3>General</h3><p>Questions about the studio.</p>${e(C.contactEmail)}</div>
        <div><h3>Commercial</h3><p>Operators, aggregators, platforms.</p>${e(C.partnersEmail)}<p style="margin-top:8px"><a href="#partners">Use the partner form →</a></p></div>
        <div><h3>Media & press</h3><p>Interviews, assets, press kit.</p>${e(C.pressEmail)}</div>
        <div><h3>Technical</h3><p>Integration and build questions.</p><span class="tbc">Address to be confirmed</span></div>
        <div><h3>Careers & collaborations</h3><p>Illustrators, animators, developers.</p><span class="tbc">Address to be confirmed</span></div>
        <div><h3>Complaints</h3><p>See <a href="#terms">Terms of Use</a> for how we handle complaints about this website.</p></div>
      </div>
      <div class="leaflet"><div><h2 style="font-size:34px">Send a message</h2><p class="small" style="margin-top:12px">Players with a query about a game on a casino site should contact that operator directly. We do not hold player accounts.</p></div>${form('contact')}</div>
    </div></section>`;
  };

  // legal pages come from legal.js
  for (const [k, p] of Object.entries(window.WG_LEGAL)) V[k] = () => head(p.kicker, p.title, p.lede) + `<section class="band" style="padding-top:40px"><div class="wrap"><div class="prose">
      <div class="draft"><strong>Draft</strong><span>${p.draft || 'This document is a draft. Company jurisdiction, legal structure and licensing status have not been confirmed; text marked as to be confirmed must be completed and reviewed by qualified counsel before publication.'}</span></div>
      ${p.body}</div>
      <nav class="legal-nav" aria-label="Legal documents">${Object.entries(window.WG_LEGAL).map(([kk, pp]) => `<a class="chip" style="display:inline-flex;align-items:center;text-decoration:none" href="#${kk}" ${kk === k ? 'aria-current="page"' : ''}>${pp.short}</a>`).join('')}</nav></div></section>`;

  V.notfound = () => head('404', 'Not found.', 'This page has been discontinued, or never existed.') + `<section class="band"><div class="wrap"><a class="btn solid" href="#">Back to home</a></div></section>`;

  /* ---------------- router ---------------- */
  const TITLES = { home: 'Withdrawal Gaming: independent slot game studio', games: 'Games', studio: 'About the studio', 'coming-soon': 'Coming soon', updates: 'Studio updates', partners: 'Operators & partnerships', contact: 'Contact' };
  const NAV = { games: 'games', game: 'games', studio: 'studio', 'coming-soon': 'coming-soon', updates: 'updates', update: 'updates', partners: 'partners', contact: 'contact' };
  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    let key = h || 'home', arg = null, html;
    if (h.startsWith('game-')) { key = 'game'; arg = h.slice(5); }
    else if (h.startsWith('update-')) { key = 'update'; arg = h.slice(7); }
    html = V[key] ? V[key](arg) : null;
    if (html == null) { key = 'notfound'; html = V.notfound(); }
    const main = $('#main');
    main.style.animation = 'none'; main.offsetHeight; main.style.animation = '';
    main.innerHTML = html;
    const g = key === 'game' ? D.games.find(x => x.slug === arg) : null;
    const p = key === 'update' ? D.posts.find(x => x.slug === arg) : null;
    const t = g ? `${g.title} · Withdrawal Gaming` : p ? `${p.title} · Withdrawal Gaming` : window.WG_LEGAL[key] ? `${window.WG_LEGAL[key].title} · Withdrawal Gaming` : key === 'home' ? TITLES.home : `${TITLES[key] || 'Not found'} · Withdrawal Gaming`;
    document.title = t;
    $('meta[name=description]').setAttribute('content', g ? `${g.title}: ${g.short} A ${STATUS[g.status][0].toLowerCase()} slot title from Withdrawal Gaming.` : 'Withdrawal Gaming is an independent slot game studio making character-led, satirical games for licensed operators.');
    $$('nav.main a').forEach(a => a.removeAttribute('aria-current'));
    const nk = NAV[key]; if (nk) $(`nav.main a[href="#${nk}"]`)?.setAttribute('aria-current', 'page');
    $('nav.main').classList.remove('open'); $('.menu-toggle').setAttribute('aria-expanded', 'false');
    window.scrollTo(0, 0);
    if (key !== 'home') $('#page-h')?.setAttribute('tabindex', '-1'), $('#page-h')?.focus({ preventScroll: true });
    if (key === 'home') capsule();
    if (key === 'games') { bindFilters(); drawGrid(); }
    $$('form.form').forEach(bindForm);
  }

  function capsule() {
    const box = $('.capsule'), v = box && $('video', box); if (!v) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = store.get('wg-capsule');
    const toEnd = () => { const go = () => { v.currentTime = Math.max(0, v.duration - 0.04); box.classList.add('done'); }; v.readyState >= 1 ? go() : v.addEventListener('loadedmetadata', go, { once: true }); };
    v.muted = true; v.defaultMuted = true;
    if (reduce) { v.poster = 'assets/video/withdrawal-capsule-poster.webp'; v.preload = 'metadata'; box.classList.add('still'); toEnd(); }
    else if (seen) toEnd();
    else { const p = v.play(); if (p) p.catch(() => { v.poster = 'assets/video/withdrawal-capsule-poster.webp'; box.classList.add('still'); }); }
    v.addEventListener('ended', () => { box.classList.add('done'); store.set('wg-capsule', '1'); });
    $('.replay', box).addEventListener('click', () => { box.classList.remove('done', 'still'); v.currentTime = 0; v.play().catch(() => { }); });
  }

  function bindFilters() {
    $$('[data-status]').forEach(b => b.addEventListener('click', () => { filt.status = b.dataset.status; $$('[data-status]').forEach(x => x.setAttribute('aria-pressed', x === b)); drawGrid(); }));
    $('#theme').addEventListener('change', e => { filt.theme = e.target.value; drawGrid(); });
    $('#q').addEventListener('input', e => { filt.q = e.target.value; drawGrid(); });
  }

  function bindForm(f) {
    f.addEventListener('submit', async e => {
      e.preventDefault();
      let ok = true;
      $$('[required]', f).forEach(el => {
        const bad = el.type === 'checkbox' ? !el.checked : el.type === 'email' ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()) : !el.value.trim();
        el.setAttribute('aria-invalid', bad);
        const err = el.type === 'checkbox' ? $('#f-ok-err', f) : el.parentNode.querySelector('.err');
        if (err) err.textContent = bad ? (el.type === 'email' && el.value ? 'Enter a valid email address.' : el.type === 'checkbox' ? 'Please confirm to continue.' : 'This field is required.') : '';
        if (bad && ok) { el.focus(); ok = false; }
      });
      if (!ok) return;
      const data = Object.fromEntries(new FormData(f));
      const n = $('.notice', f);
      if (C.formEndpoint) {
        try { const r = await fetch(C.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind: f.dataset.kind, ...data }) }); if (!r.ok) throw 0; n.textContent = 'Thanks. Your enquiry has been sent.'; }
        catch { n.textContent = 'Sorry, the enquiry could not be sent. Please try again later.'; }
        n.hidden = false; return;
      }
      const text = Object.entries(data).filter(([k]) => k !== 'consent').map(([k, v]) => `${k}: ${v}`).join('\n');
      n.innerHTML = `<strong>Not sent.</strong> This demo is not connected to an enquiry inbox yet, so nothing has been transmitted. You can copy your message and send it once a contact address is published. <button class="btn sm" type="button" style="margin-top:10px">Copy enquiry text</button>`;
      n.hidden = false;
      $('button', n).addEventListener('click', ev => { navigator.clipboard?.writeText(text).then(() => ev.target.textContent = 'Copied', () => ev.target.textContent = 'Copy not available'); });
    });
  }

  /* ---------------- chrome ---------------- */
  document.addEventListener('click', e => { const a = e.target.closest('[data-game]'); if (a) store.set('wg-game', a.dataset.game); });
  $('.menu-toggle').addEventListener('click', e => { const o = $('nav.main').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); });
  if (local.get('wg-18')) $('.ribbon .age-note')?.remove();
  $('.ribbon button')?.addEventListener('click', () => { local.set('wg-18', '1'); $('.ribbon .age-note').remove(); });
  $('#social').innerHTML = C.social.map(s => `<li>${s.url ? `<a href="${esc(s.url)}">${s.name}</a>` : `${s.name} <span class="tbc">Handle TBC</span>`}</li>`).join('');
  $('#co').innerHTML = ['legalName', 'regNumber', 'address', 'jurisdiction'].map(k => C.company[k] ? esc(C.company[k]) : `<span class="tbc">${{ legalName: 'Registered company name', regNumber: 'Company number', address: 'Registered address', jurisdiction: 'Jurisdiction' }[k]} to be confirmed</span>`).join(' ');
  $('#yr').textContent = new Date().getFullYear();
  addEventListener('hashchange', route);
  route();
}
