/* WITHDRAWAL GAMING V2 - router + views. Data: data.js. Legal copy: legal.js.
   Layout never depends on artwork dimensions: covers sit in fixed 3:4 slots (object-fit: contain). */
{
  const D = window.WG, C = D.config, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = { get(k) { try { return sessionStorage.getItem(k); } catch { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch { } } };
  const local = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch { } } };
  document.documentElement.classList.add('js');
  const STATUS = { 'in-development': ['In development', 'dev'], concept: ['Concept', 'concept'], released: ['Released', 'dev'] };
  const stamp = s => `<span class="stamp ${STATUS[s][1]}">${STATUS[s][0]}</span>`;
  const code = g => `WG-${g.lot}`;
  const tbc = (v, t = 'TBC') => v ? esc(v) : `<span class="tbc">${t}</span>`;
  const WORDMARK = $('#wm-src').innerHTML;
  const STAKE = C.providerUrl || C.stakeUrl;
  const ARROW = '<svg class="ext" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 9L9 3M4.5 3H9v4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg>';
  const stakeBtn = (label = 'Play on Stake', cls = '') => `<a class="stake ${cls}" href="${esc(STAKE)}" target="_blank" rel="noopener noreferrer" aria-label="${label} (opens stake.com in a new tab; Withdrawal Gaming releases are not available yet)">${label}${ARROW}</a>`;
  let capsulePlayed = false; // once per page load: refresh replays, internal navigation does not

  /* artwork: one function decides which file a cover uses (see data.js ARTWORK SWAP) */
  function cover(g, sizes = '(max-width: 900px) 46vw, 400px', eager = false, cls = '') {
    const a = g.cover ? `src="${esc(g.cover)}"` : `src="assets/games/${g.slug}_960w.webp" srcset="assets/games/${g.slug}_480w.webp 480w, assets/games/${g.slug}_960w.webp 960w" sizes="${sizes}"`;
    return `<img ${a} alt="${esc(g.title)} cover artwork" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" ${cls ? `class="${cls}"` : ''}>`;
  }
  function barcode(str, h = 30) {
    let x = 0, bars = '', seed = [...str].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
    for (let i = 0; i < 38; i++) { seed = (seed * 1103515245 + 12345) >>> 0; const w = 1 + (seed >>> 28) % 3; if (i % 2 === 0) bars += `<rect x="${x}" y="0" width="${w}" height="${h}"/>`; x += w; }
    return `<span class="barcode"><svg viewBox="0 0 ${x} ${h}" fill="currentColor" aria-hidden="true">${bars}</svg><span>${esc(str)}</span></span>`;
  }
  /* abstract "molecule" - a satirical structural formula for the studio */
  const molecule = () => {
    const at = [[200, 60, 'C', '#F05432'], [286, 110, 'S', '#B6A5ED'], [286, 210, 'M', '#C6DB42'], [200, 260, 'W', '#242522'], [114, 210, 'H', '#F2EEE4'], [114, 110, 'A', '#F2EEE4'], [370, 60, 'L', '#F2EEE4'], [36, 260, 'X', '#F2EEE4']];
    const bonds = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 6], [4, 7]];
    return `<svg viewBox="0 0 410 310" role="img" aria-label="Abstract structural formula with atoms labelled C for characters, S for satire, M for mechanics and W for Withdrawal">
      ${bonds.map(([a, b]) => `<line x1="${at[a][0]}" y1="${at[a][1]}" x2="${at[b][0]}" y2="${at[b][1]}" stroke="#242522" stroke-width="4"/>`).join('')}
      ${at.map(([x, y, l, c]) => `<circle cx="${x}" cy="${y}" r="${l === 'W' ? 30 : 24}" fill="${c}" stroke="#242522" stroke-width="3"/><text x="${x}" y="${y + 7}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="${l === 'W' ? 24 : 19}" fill="${l === 'W' ? '#F2EEE4' : '#242522'}">${l}</text>`).join('')}
    </svg>`;
  };

  /* ---------------- shared blocks ---------------- */
  const release = (g, eager) => `<a class="release rv" href="#game-${g.slug}"><div class="slot">${cover(g, undefined, eager)}</div>
    <div class="tag"><span class="mono">${code(g)}</span><h3>${g.title}</h3>${stamp(g.status)}<p>${esc(g.short)}</p></div></a>`;
  const specRows = g => {
    const s = g.specs;
    return [['Grid', s.grid], ['RTP', s.rtp], ['Volatility', s.volatility], ['Maximum win', s.maxWin], ['Bonus features', s.features], ['Release date', s.release, 'Not announced'], ['Devices', s.devices], ['Availability', 'Planned: Only on Stake, subject to platform approval'], ['Demo', g.demo ? 'Available' : null, 'Not available yet']]
      .map(([k, v, t]) => `<tr><th scope="row">${k}</th><td>${tbc(v, t)}</td></tr>`).join('');
  };
  const pil = g => `<div class="pil"><div class="ph"><span>Product information · ${code(g)}</span><span>${STATUS[g.status][0]}</span></div>
    <table><caption class="sr">${esc(g.title)} specification</caption>${specRows(g)}</table>
    <div class="pf"><span>Figures are published only once verified in approved game documentation. TBC means to be confirmed.</span>${barcode(code(g))}</div></div>`;
  const opener = (c, title, label, text, extra = '') => `<div class="opener rv"><div><p class="code">${c}</p><h2>${title}</h2></div><aside><b>${label}</b>${text}${extra}</aside></div>`;
  const tape = (items, cls = '') => `<div class="tape ${cls}" aria-hidden="true"><div class="track">${Array(2).fill(items.map(t => `<span>${t}</span>`).join('')).join('')}</div></div>`;
  const ledger = (list, thumbs = true) => `<table class="ledger rv"><caption class="sr">Development status of every release</caption><thead><tr><th>Cat. no.</th><th>Release</th><th class="x">Category</th><th>Status</th><th class="x">Release date</th></tr></thead><tbody>
    ${list.map(g => `<tr><td class="mono">${code(g)}</td><td class="t"><a href="#game-${g.slug}">${thumbs ? cover(g, '54px') : ''}${g.title}</a></td><td class="x">${esc(g.theme)}</td><td>${stamp(g.status)}</td><td class="x mono">Not announced</td></tr>`).join('')}</tbody></table>`;
  const index = list => `<div class="index">${list.map(p => `<a class="entry rv" href="#update-${p.slug}"><span class="k">${p.kind}<br><span class="stamp tbd" style="margin-top:10px">Draft · date TBC</span></span><h3>${esc(p.title)}</h3><p>${esc(p.dek)}</p></a>`).join('')}</div>`;
  const faq = () => `<div class="faq"><div class="rv"><p class="code mono" style="font-size:13px;letter-spacing:.12em">PIL · READ BEFORE USE</p><h2 style="font:400 clamp(46px,5.4vw,90px)/.86 var(--cond);text-transform:uppercase">Patient information</h2><p style="margin-top:18px">Frequently asked questions, answered plainly.</p></div>
    <div class="rv">${D.faq.map(([q, a], i) => `<details><summary><span class="mono">Q.${String(i + 1).padStart(2, '0')}</span>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></div>`;
  const head = (c, h, p) => `<section class="page-head"><div class="wrap"><p class="code">${c}</p><h1 id="page-h">${h}</h1>${p ? `<p>${p}</p>` : ''}</div></section>`;


  /* exclusive distribution: replaces trade/partner sections (V2.1) */
  const script = () => `<div class="script"><div class="ph"><span>Rx · Dispense as written</span><span>WG-02</span></div>
    <table><caption class="sr">Distribution label</caption>
      <tr><th scope="row">Platform</th><td>Stake</td></tr><tr><th scope="row">Channel</th><td>Stake Engine</td></tr>
      <tr><th scope="row">Model</th><td>Only on Stake</td></tr><tr><th scope="row">Substitution</th><td>Not permitted</td></tr>
      <tr><th scope="row">Status</th><td>In development. Not yet approved or released</td></tr></table>
    <div class="pf"><span>No generic substitute.</span>${barcode('WG-ONLY-ON-STAKE')}</div></div>`;
  const only = () => `<section class="only" aria-labelledby="only-h"><div class="wrap">
      <div class="rv"><p class="code">Distribution · Single source</p><h2 id="only-h">Exclusively.<br>On Stake.</h2>
        <p class="sub">One studio. One platform. No unnecessary prescriptions.</p>
        <p>Our games are being developed for exclusive distribution on Stake through Stake Engine, under the Only on Stake model. One lobby, one community, one place to find them. No aggregators, no generic substitutes.</p></div>
      <div class="rv">${script()}<div class="cta">${stakeBtn('Visit Stake', 'lg')}<p>Our games are not on Stake yet. Stake is.</p></div></div>
    </div><p class="wrap fine">Withdrawal Gaming is an independent studio. Our games have not yet been approved or released. Stake and Stake Engine are trademarks of their respective owners; no endorsement, approval or placement is implied or guaranteed.</p></section>`;
  function capsuleVideo() {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, still = reduce || capsulePlayed;
    return `<video ${still ? 'poster="assets/video/withdrawal-capsule-poster.webp" preload="metadata"' : 'autoplay preload="auto"'} muted playsinline disablepictureinpicture disableremoteplayback x-webkit-airplay="deny" aria-label="Withdrawal Gaming capsule mascot animation" src="assets/video/withdrawal-capsule.mp4"></video>`;
  }

  /* ---------------- views ---------------- */
  const V = {};
  V.home = () => {
    const f = D.games[0];
    return `
    <section class="hero" aria-labelledby="hero-h">
      <div class="wrap">
        <div class="meta" aria-label="Studio facts"><span>Batch WG-02</span><span>Six releases in the lab</span><span>Only on Stake · planned</span><span>18+ only</span></div>
        <div class="body">
          <div>
            <h1 id="hero-h"><span class="ln"><span>Not as</span></span><span class="ln"><span>prescribed<span class="stop">.</span></span></span></h1>
            <p class="lede">An independent studio making slot games with characters, plots and a questionable sense of humour. Labelled honestly. Developed for exclusive release on Stake.</p>
            <div class="ctas"><a class="btn solid" href="#games">The collection</a><a class="btn" href="#only-on-stake">Only on Stake</a></div>
          </div>
          <div class="stage">
            <div class="capsule">
              ${capsuleVideo()}
            </div>
            <div class="rx" aria-label="Studio label">
              <div class="perf" aria-hidden="true"></div>
              <div class="in"><div class="top"><span>WG-02</span><span>Single source</span></div>
                <strong>Withdrawal Gaming</strong>
                <span>Contents: 6 original slot releases<br>Status: concept &amp; development</span>
                <div class="warn">Keep out of reach of children. 18+ only.</div>
                <div class="foot">${barcode('WG-02-2026')}<span>Side effects<br>may vary.</span></div></div>
            </div>
          </div>
        </div>
      </div>
      <span class="vert" aria-hidden="true">Side effects may vary</span>
      <div class="wrap signoff" aria-hidden="true">${WORDMARK}</div>
    </section>
    ${tape(['Side effects may vary', 'Six releases in the lab', 'Only on Stake', '18+', 'Not as prescribed', 'Characters first'])}

    <section class="wrap" aria-labelledby="col-h">
      ${opener('Catalogue · WG-001 to WG-006', '<span id="col-h">The collection</span>', 'Games', 'Six original releases, each with its own world and cast. All are concepts or in development: nothing here is live or available to play.', '<p style="margin-top:14px"><a class="link" href="#games">Filter the full collection</a></p>')}
      <div class="collection">${D.games.map((g, i) => release(g, i < 3)).join('')}</div>
    </section>

    <section class="spot" style="--band:${f.band}" aria-labelledby="spot-h">
      <div class="wrap">
        <div><a class="art" href="#game-${f.slug}" aria-label="${f.title} release sheet">${cover(f, '(max-width: 860px) 320px, 480px')}</a><div class="lot" aria-hidden="true"><strong>Lot ${f.lot} · Flagship</strong><span>Grid 5×5 proposed<br>Release date not announced</span>${barcode(code(f))}</div></div>
        <div class="copy rv">
          <p class="code">Flagship release · ${code(f)} · ${STATUS[f.status][0]}</p>
          <h2 id="spot-h">${f.title}</h2>
          <p class="tl">${f.taglines.map(t => `<span>${t}</span>`).join('')}</p>
          <p>${esc(f.description)}</p>
          ${pil(f)}
          <div class="ctas"><a class="btn solid" href="#game-${f.slug}">Read the release sheet</a></div>
        </div>
      </div>
    </section>

    <section class="wrap" aria-labelledby="lab-h">
      ${opener('Development ledger', '<span id="lab-h">In the lab</span>', 'Coming soon', 'Where every release stands. Dates appear when they are real, not before.')}
      ${ledger(D.games, false)}
    </section>

    <section class="band-lilac" aria-labelledby="formula-h"><div class="wrap">
      ${opener('About the studio', '<span id="formula-h">The formula</span>', 'Studio', 'What goes into a Withdrawal Gaming release, and what we leave out.').replace('opener rv', 'opener flip rv')}
      <div class="formula">
        <div class="rv">
          <p class="statement">We start with a <em>cast</em>, not a coin.</p>
          <div class="cols">
            <p>Most lobbies run on gold coins, gemstones and the same three ancient gods. We would rather draw a detective bloodhound, a laundromat with excellent cash flow and a man in a red convertible finding himself.</p>
            <p>Every release starts as a premise you could pitch as a cartoon. Mechanics come next, and they have to earn their place. Nothing goes public until it is verified.</p>
            <p>We are a game studio, not a casino. We develop games for exclusive release on Stake; we do not accept wagers or hold player accounts.</p>
          </div>
          <p style="margin-top:10px"><a class="link" href="#studio">Read the full formula</a></p>
        </div>
        <div class="sheet rv">
          <div class="sh"><span>Composition</span><span>Per release</span></div>
          <div class="mol">${molecule()}</div>
          <ul class="comp">${[['Characters', 40], ['Satire', 30], ['Mechanics that earn their place', 25], ['Restraint', 5], ['Gold coins', 0]].map(([k, v]) => `<li><span>${k}</span><span class="mono">${v}%</span><span class="bar"><i style="--w:${v}%"></i></span></li>`).join('')}</ul>
          <p class="note">Percentages are a joke. The games are not.</p>
        </div>
      </div>
    </div></section>

    ${only()}

    <section class="wrap" aria-labelledby="se-h">
      ${opener('News &amp; clinical notes', '<span id="se-h">Side effects</span>', 'News', 'Studio announcements, development notes and the occasional confession.').replace('opener rv', 'opener verm rv')}
      ${index(D.posts)}
    </section>

    <section class="wrap" style="padding-top:clamp(80px,10vw,150px)" aria-label="Frequently asked questions">${faq()}</section>`;
  };

  let filt = { status: 'all', theme: 'all', q: '' };
  V.games = () => {
    const themes = [...new Set(D.games.map(g => g.theme))];
    return head('Games · Catalogue WG-001 to WG-006', 'The collection', 'Six original releases, each with its own world. All are concepts or in development: nothing listed here is live or released.') + `
    <section class="wrap sec">
      <div class="filters" role="search">
        ${[['all', 'All'], ['in-development', 'In development'], ['concept', 'Concept'], ['released', 'Released']].map(([v, t]) => `<button class="chip" type="button" data-status="${v}" aria-pressed="${filt.status === v}">${t}</button>`).join('')}
        <label class="sr" for="theme">Category</label>
        <select id="theme"><option value="all">All categories</option>${themes.map(t => `<option ${filt.theme === t ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>
        <div class="search"><label class="sr" for="q">Search the collection</label><input id="q" type="search" placeholder="Search titles" value="${esc(filt.q)}"></div>
      </div>
      <p class="small mono" id="count" aria-live="polite"></p>
      <div class="collection" id="grid"></div>
    </section>`;
  };
  function drawGrid() {
    const q = filt.q.trim().toLowerCase();
    const list = D.games.filter(g => (filt.status === 'all' || g.status === filt.status) && (filt.theme === 'all' || g.theme === filt.theme) && (!q || (g.title + ' ' + g.theme + ' ' + g.short).toLowerCase().includes(q)));
    $('#grid').innerHTML = list.length ? list.map(g => release(g)).join('') : `<div class="empty"><h3>${filt.status === 'released' ? 'Nothing released yet.' : 'No matches.'}</h3><p style="margin:10px auto 0">${filt.status === 'released' ? 'Every Withdrawal Gaming release is currently a concept or in development.' : 'Try another category or search.'}</p></div>`;
    $('#count').textContent = `${list.length} of ${D.games.length} releases`;
    reveal();
  }

  V.game = slug => {
    const i = D.games.findIndex(g => g.slug === slug); if (i < 0) return null;
    const g = D.games[i], next = D.games[(i + 1) % D.games.length];
    return `<article aria-labelledby="page-h">
      <header class="rhead" style="--band:${g.band}">
        <span class="clip" aria-hidden="true"><span class="cat">${g.lot}</span></span>
        <div class="wrap">
          <div>
            <p class="crumb"><a href="#games">The collection</a><span aria-hidden="true">/</span><span>${code(g)}</span><span aria-hidden="true">/</span><span>${esc(g.theme)}</span></p>
            <h1 id="page-h">${g.title}</h1>
            <p class="tl">${g.taglines ? g.taglines.map(t => `<span>${t}</span>`).join('') : `<span>${esc(g.short)}</span>`}</p>
            <div class="facts">${stamp(g.status)}<span>Release date: not announced</span><span>Demo: not available yet</span></div>
          </div>
          <div class="art">${cover(g, '(max-width: 860px) 290px, 470px', true)}</div>
        </div>
      </header>
      <div class="wrap rbody">
        <div>
          <h2><span class="mono">01</span>What it is</h2>
          <p class="lead">${esc(g.description)}</p>
          <p class="muted">${esc(g.world)}.</p>
          <h2><span class="mono">02</span>The cast</h2>
          <div class="cast">${g.characters.map(([n, d]) => `<div><b>${esc(n)}</b><span>${esc(d)}</span></div>`).join('')}</div>
          <h2><span class="mono">03</span>Creative direction</h2>
          <p>${esc(g.direction)}</p>
          <div class="swatches" aria-label="Release palette">${g.palette.map(c => `<span style="background:${c}"><em>${c}</em></span>`).join('')}</div>
          ${g.alt ? `<div class="alt"><img src="assets/games/${g.slug}_v1_480w.webp" alt="${esc(g.title)} earlier cover concept" loading="lazy" decoding="async"><p>Earlier cover concept, kept on file for comparison.</p></div>` : ''}
        </div>
        <aside class="side">
          <h2 style="margin-top:0"><span class="mono">04</span>Product information</h2>
          ${pil(g)}
          <p>${g.demo ? 'A free-play demo is available.' : 'No public demo yet.'} ${g.title} is being developed for exclusive release on Stake, subject to platform approval. It is not available yet.</p>
          <a class="btn" href="#only-on-stake">How our games are distributed</a>
        </aside>
      </div>
      <a class="next" href="#game-${next.slug}" style="--nb:${next.band}"><div class="wrap"><div><span class="mono">Next release · ${code(next)}</span><strong>${next.title} →</strong></div>${cover(next, '140px')}</div></a>
    </article>`;
  };

  V.studio = () => head('About the studio', 'The formula', 'An independent studio for original slot games with their own worlds, characters and running jokes.') + `
    <section class="wrap sec two">
      <div class="prose">
        <h2>Why we exist</h2>
        <p>Most slot lobbies look the same. We think games can have premises, casts and punchlines, the way a good animated series does.</p>
        <p>So every Withdrawal Gaming release starts as an idea you could pitch as a cartoon: a fallen detective bloodhound, a laundromat with excellent cash flow, a man in a red convertible finding himself. Mechanics come next, and they have to earn their place.</p>
        <h2>How we work</h2>
        <ul><li><b>Characters first.</b> If the cast is not funny without the reels, the reels will not save it.</li><li><b>Readable at lobby size.</b> Every cover is designed to work as a phone thumbnail.</li><li><b>Honest labels.</b> No RTP, maximum win or release date goes public until it is verified.</li><li><b>Satire with limits.</b> The jokes are aimed at our characters and their worlds, never at players, and we never present gambling as a solution to anything.</li></ul>
        <h2>Where we are</h2>
        <p>We are a new studio. Our six releases are concepts or in development, and are planned for exclusive release on Stake. We have no released games, awards or certifications to report, and we will not pretend otherwise.</p>
      </div>
      <div class="sheet in">
        <div class="sh"><span>Studio vs operator</span><span>Fact sheet</span></div>
        <div style="padding:16px">
          <p><b>We are</b> an independent game development studio.</p>
          <p><b>We are not</b> a casino. We do not accept wagers, run player accounts or offer real-money gambling on this website.</p>
          <p><b>Distribution:</b> intended exclusively via Stake Engine, for release on Stake. Not yet approved.</p>
          <p style="margin:0"><b>Age:</b> our games are for adults only (18+, or higher where local law requires).</p>
        </div>
      </div>
    </section>
    <section class="wrap" style="padding-top:clamp(80px,10vw,140px)">${faq()}</section>`;

  V['coming-soon'] = () => head('Coming soon · Development ledger', 'In the lab', 'Development status for every release. Dates appear when they are real, not before.') + `<section class="wrap sec">${ledger(D.games)}</section>`;
  V.updates = () => head('News · Clinical notes', 'Side effects', 'Studio announcements, development notes and behind-the-scenes. Drafts are marked as drafts.') + `<section class="wrap sec">${index(D.posts)}</section>`;
  V.update = slug => {
    const p = D.posts.find(x => x.slug === slug); if (!p) return null;
    return head(`Side effects · ${p.kind}`, esc(p.title), esc(p.dek)) + `<section class="wrap sec prose"><div class="draft"><span class="stamp tbd">Draft</span><span>Publication date to be confirmed. Copy subject to owner approval.</span></div>${p.body.map(b => `<p>${esc(b)}</p>`).join('')}<p style="margin-top:30px"><a class="btn sm" href="#updates">All side effects</a></p></section>`;
  };

  const opts = a => a.map(o => `<option>${o}</option>`).join('');
  function form(kind) {
    return `<form class="form" novalidate data-kind="${kind}">
      <div><label for="f-name">Name <span class="req">*</span></label><input id="f-name" name="name" autocomplete="name" required><span class="err"></span></div>
      <div><label for="f-email">Work email <span class="req">*</span></label><input id="f-email" name="email" type="email" autocomplete="email" required><span class="err"></span></div>
      <div class="full"><label for="f-topic">Topic <span class="req">*</span></label><select id="f-topic" name="topic" required><option value="">Choose one</option>${opts(['General enquiry', 'Business enquiry', 'Technical enquiry', 'Media & press', 'Careers & creative collaboration'])}</select><span class="err"></span></div>
      <div class="full"><label for="f-msg">Message <span class="req">*</span></label><textarea id="f-msg" name="message" rows="5" required></textarea><span class="err"></span></div>
      <div class="full check"><input id="f-ok" name="consent" type="checkbox" required><label for="f-ok">I agree that Withdrawal Gaming may use these details to reply to this enquiry, as described in the <a href="#privacy">privacy policy</a>. <span class="req">*</span></label></div>
      <span class="err full" id="f-ok-err"></span>
      <div class="full" style="display:flex;gap:14px;flex-wrap:wrap;align-items:center"><button class="btn solid" type="submit">Send enquiry</button><span class="small">Fields marked * are required.</span></div>
      <div class="notice" role="status" hidden></div>
    </form>`;
  }

  V['only-on-stake'] = () => head('Distribution · Single source', 'Only on Stake', 'One studio. One platform. No unnecessary prescriptions.') + `
    <section class="wrap sec two">
      <div class="prose">
        <h2>Our distribution, plainly</h2>
        <p>Withdrawal Gaming intends to distribute its games exclusively through Stake Engine, for release on Stake under the Only on Stake model. We are not seeking other casino operators, aggregators or third-party distribution.</p>
        <h2>Why one platform</h2>
        <p>We would rather build for one lobby and one community than spread our releases thin. The Only on Stake model is designed around exclusive distribution within the Stake ecosystem, which is where we want our games to live.</p>
        <h2>Current status</h2>
        <p>Every Withdrawal Gaming release is a concept or in development. No game has been submitted, approved or released on Stake yet, and no promotion or placement is guaranteed. When a release goes live, its release sheet will say so.</p>
        <p class="small">Stake and Stake Engine are trademarks of their respective owners. No endorsement is implied.</p>
      </div>
      <div>${script()}<div class="cta" style="margin-top:22px">${stakeBtn('Visit Stake', 'lg')}<p class="small" style="margin:12px 0 0">Opens stake.com in a new tab. Our games are not available there yet.</p></div>
        <p style="margin-top:34px">Other business, media or technical questions? <a class="link" href="#contact">Contact the studio</a>.</p></div>
    </section>`;

  V.contact = () => {
    const e = v => v ? `<a class="link" href="mailto:${esc(v)}">${esc(v)}</a>` : '<span class="tbc">Address to be confirmed</span>';
    return head('Contact · Desks', 'Say hello', 'Pick the right desk.') + `
    <section class="wrap sec">
      <div class="desks">
        <div><h3>General</h3><p>Questions about the studio.</p>${e(C.contactEmail)}</div>
        <div><h3>Business</h3><p>Legitimate business enquiries. We are not seeking distribution partners.</p><span class="tbc">Address to be confirmed</span></div>
        <div><h3>Media &amp; press</h3><p>Interviews, assets, press kit.</p>${e(C.pressEmail)}</div>
        <div><h3>Technical</h3><p>Integration and build questions.</p><span class="tbc">Address to be confirmed</span></div>
        <div><h3>Careers &amp; collaborations</h3><p>Illustrators, animators, developers.</p><span class="tbc">Address to be confirmed</span></div>
        <div><h3>Complaints</h3><p>How we handle complaints about this website is set out in the <a class="link" href="#terms">terms of use</a>.</p><span></span></div>
      </div>
      <div class="two"><div><h2 style="font:400 clamp(30px,3vw,44px)/1 var(--display)">Send a message</h2><p class="small" style="margin-top:14px">We do not hold player accounts. Questions about a game on a casino platform should go to that platform.</p></div>${form('contact')}</div>
    </section>`;
  };

  for (const [k, p] of Object.entries(window.WG_LEGAL)) V[k] = () => head(`Legal · ${p.kicker}`, p.title, p.lede) + `<section class="wrap sec"><div class="prose">
      <div class="draft"><span class="stamp tbd">Draft</span><span>${p.draft || 'Company jurisdiction, legal structure and licensing status are not yet confirmed. Text marked as to be confirmed must be completed and reviewed by qualified counsel before publication.'}</span></div>
      ${p.body}</div>
      <nav class="legal-nav" aria-label="Legal documents">${Object.entries(window.WG_LEGAL).map(([kk, pp]) => `<a href="#${kk}" ${kk === k ? 'aria-current="page"' : ''}>${pp.short}</a>`).join('')}</nav></section>`;

  V.notfound = () => head('Error 404', 'Discontinued', 'This page has been withdrawn, or never existed.') + `<section class="wrap sec"><a class="btn solid" href="#">Back to the homepage</a></section>`;

  /* ---------------- motion: reveal on scroll ---------------- */
  let io;
  function reveal() {
    const els = $$('.rv:not(.in), .hero:not(.in), .sheet:not(.in)');
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach(e => e.classList.add('in')); return; }
    io ??= new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    els.forEach(e => io.observe(e));
  }

  /* ---------------- router ---------------- */
  const TITLES = { home: 'Withdrawal Gaming · Not as prescribed.', games: 'The collection', studio: 'The formula', 'coming-soon': 'In the lab', updates: 'Side effects', 'only-on-stake': 'Only on Stake', contact: 'Contact' };
  const NAV = { games: 'games', game: 'games', studio: 'studio', 'coming-soon': 'coming-soon', updates: 'updates', update: 'updates', contact: 'contact' };
  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    let key = h === 'partners' ? 'only-on-stake' : (h || 'home'), arg = null;
    if (h.startsWith('game-')) { key = 'game'; arg = h.slice(5); } else if (h.startsWith('update-')) { key = 'update'; arg = h.slice(7); }
    let html = V[key] ? V[key](arg) : null;
    if (html == null) { key = 'notfound'; html = V.notfound(); }
    const main = $('#main');
    main.style.animation = 'none'; main.offsetHeight; main.style.animation = '';
    main.innerHTML = html;
    const g = key === 'game' && D.games.find(x => x.slug === arg), p = key === 'update' && D.posts.find(x => x.slug === arg);
    document.title = g ? `${g.title} · ${code(g)} · Withdrawal Gaming` : p ? `${p.title} · Withdrawal Gaming` : window.WG_LEGAL[key] ? `${window.WG_LEGAL[key].title.replace(/\.$/, '')} · Withdrawal Gaming` : key === 'home' ? TITLES.home : `${TITLES[key] || 'Not found'} · Withdrawal Gaming`;
    $('meta[name=description]').setAttribute('content', g ? `${g.title} (${code(g)}): ${g.short} A ${STATUS[g.status][0].toLowerCase()} slot release from Withdrawal Gaming.` : 'Withdrawal Gaming is an independent slot game studio making character-led, satirical games for licensed operators.');
    $$('nav.main a').forEach(a => a.removeAttribute('aria-current'));
    const nk = NAV[key]; if (nk) $(`nav.main a[href="#${nk}"]`)?.setAttribute('aria-current', 'page');
    $('nav.main').classList.remove('open'); $('.menu-toggle').setAttribute('aria-expanded', 'false');
    window.scrollTo(0, 0);
    if (key !== 'home') { const t = $('#page-h'); if (t) { t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); } }
    if (key === 'home') capsule();
    if (key === 'games') { bindFilters(); drawGrid(); }
    $$('form.form').forEach(bindForm);
    reveal();
  }

  function capsule() {
    const v = $('.capsule video'); if (!v) return;
    v.muted = true; v.defaultMuted = true; v.controls = false;
    const toEnd = () => { const go = () => { try { v.currentTime = Math.max(0, v.duration - 0.05); } catch { } }; v.readyState >= 1 ? go() : v.addEventListener('loadedmetadata', go, { once: true }); };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || capsulePlayed) { v.pause(); toEnd(); return; }
    capsulePlayed = true; // internal navigation back to home shows the final frame instead of replaying
    v.addEventListener('ended', () => v.pause());
    const pr = v.play(); // explicit call for Safari/iOS, which can ignore autoplay on injected video
    if (pr) pr.catch(() => { v.poster = 'assets/video/withdrawal-capsule-poster.webp'; toEnd(); });
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
      const data = Object.fromEntries(new FormData(f)), n = $('.notice', f);
      if (C.formEndpoint) {
        try { const r = await fetch(C.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind: f.dataset.kind, ...data }) }); if (!r.ok) throw 0; n.textContent = 'Thanks. Your enquiry has been sent.'; }
        catch { n.textContent = 'Sorry, the enquiry could not be sent. Please try again later.'; }
        n.hidden = false; return;
      }
      const text = Object.entries(data).filter(([k]) => k !== 'consent').map(([k, v]) => `${k}: ${v}`).join('\n');
      n.innerHTML = `<strong>Not sent.</strong> This demo is not connected to an enquiry inbox yet, so nothing has been transmitted. You can copy your message and send it once a contact address is published. <button class="btn sm plain" type="button" style="margin-top:10px">Copy enquiry text</button>`;
      n.hidden = false;
      $('button', n).addEventListener('click', ev => { navigator.clipboard?.writeText(text).then(() => ev.target.textContent = 'Copied', () => ev.target.textContent = 'Copy not available'); });
    });
  }

  /* ---------------- chrome ---------------- */
  $('.menu-toggle').addEventListener('click', e => { const o = $('nav.main').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); });
  if (local.get('wg-18')) $('.strip .age-note')?.remove();
  $('.strip button')?.addEventListener('click', () => { local.set('wg-18', '1'); $('.strip .age-note').remove(); });
  const live = C.social.filter(s => s.url);
  $('#social').innerHTML = live.length ? live.map(s => `<li><a href="${esc(s.url)}">${s.name}</a></li>`).join('') : `<li>${C.social.map(s => s.name).join(' · ')}</li><li style="opacity:.7">Handles coming soon</li>`;
  const co = ['legalName', 'regNumber', 'address', 'jurisdiction'].map(k => C.company[k]).filter(Boolean);
  $('#co').textContent = co.length ? co.join(', ') : 'registered name, number, address and jurisdiction to be confirmed.';
  $('#yr').textContent = new Date().getFullYear();
  { const a = $('#play-stake'); a.href = STAKE; a.setAttribute('aria-label', 'Play on Stake (opens stake.com in a new tab; Withdrawal Gaming releases are not available yet)'); }
  $('#foot-bc').innerHTML = barcode('WITHDRAWAL-GAMING');
  addEventListener('hashchange', route);
  route();
}
