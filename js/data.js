/* WITHDRAWAL GAMING - site content & game metadata.
   Presentation lives in app.js; this file is data only, so games can be added
   (or moved to a CMS / JSON feed) without touching layout code.
   RULE: no RTP, certified max win, release date or mechanic is published
   unless it comes from approved game documentation. Unknown = null -> "TBC". */
window.WG = {
  config: {
    // Owner to supply. Until then the UI shows these as "to be confirmed".
    contactEmail: null, partnersEmail: null, pressEmail: null,
    formEndpoint: null, // e.g. "https://api.example.com/enquiry" - forms refuse to fake a send while null
    company: { legalName: null, regNumber: null, address: null, jurisdiction: null },
    social: [ { name: 'Instagram', url: null }, { name: 'X', url: null }, { name: 'LinkedIn', url: null }, { name: 'YouTube', url: null } ],
  },

  games: [
    {
      slug: 'sinners', lot: '001', title: 'SINNERS', status: 'in-development', featured: true,
      theme: 'Religious satire', world: 'Stained-glass cathedral, heaven and hell on the same pew',
      palette: ['#B5121B', '#F2B53A', '#F6E7C8'],
      taglines: ['REPENT. SIN. WIN.', 'FORGIVE ME FATHER, FOR I HAVE SPUN.'],
      short: 'Heaven and hell share a pew. Neither is behaving.',
      description: 'A saviour in sunglasses, a devil who has clearly done this before, and one golden apple everybody pretends not to want. SINNERS is our flagship: a stained-glass comedy about temptation, told in bold cartoon ink and far too much gold leaf.',
      characters: [
        ['The Saviour', 'Halo slightly off-centre, aviators firmly on. Calm, unbothered, pointing at the apple like he already knows how this ends.'],
        ['The Devil', 'Crimson, horned and persuasive. Cigar in one hand, elbow on your shoulder, an opinion on everything.'],
        ['The Golden Apple', 'The signature symbol. Shiny, slightly bitten, entirely the point.'],
      ],
      direction: 'Gothic architecture meets contemporary cartoon. Rich reds, gold, cream and heavenly blues. Mischievous rather than hateful: the joke is on temptation, not on anyone\'s faith.',
      specs: { grid: '5×5 (proposed)', maxWin: '66,666× (development target, not independently verified)', rtp: null, volatility: null, features: null, release: null, devices: 'Desktop and mobile (planned)' },
      demo: false,
    },
    {
      slug: 'sniffers', lot: '002', title: 'SNIFFERS', status: 'concept', featured: true,
      theme: 'Cartoon noir', world: 'A rain-soaked city, one lamp-post and a lot of brick',
      palette: ['#1E2C8C', '#C67A2E', '#F2C14B'],
      short: 'A bloodhound detective with a nose for trouble and an informant who knows too much.',
      description: 'Inspector Basil Hound has worked the night beat longer than anyone can remember, mostly because nobody else will. His informant is a pigeon in gold chains. Together they follow every lead the city leaves lying around. A deadpan noir comedy about following your nose wherever it takes you.',
      characters: [
        ['Inspector Basil Hound', 'Hangdog eyes, blue fedora, trench coat with a past. Has never once looked surprised.'],
        ['Little Coo', 'Pigeon informant. Shades, chain, perch. Sells information, buys nothing.'],
      ],
      direction: 'Cartoon noir in electric blue and lamplight amber. Brick textures, graffiti, a full moon doing most of the lighting. Satire of detective clichés: the sniffing is strictly investigative.',
      specs: { grid: null, maxWin: null, rtp: null, volatility: null, features: null, release: null, devices: null },
      demo: false,
    },
    {
      slug: 'doom-scroll', lot: '003', title: 'DOOM SCROLL', status: 'concept', featured: true,
      theme: 'Internet satire', world: 'Notifications, all of them, at once',
      palette: ['#E4571D', '#2F7DE1', '#9CCB5A'],
      short: 'One more notification. Then sleep. Probably.',
      description: 'Our hero has not blinked since Tuesday. The likes are climbing, the comments are multiplying and the follower count keeps ticking up for reasons nobody can explain. DOOM SCROLL is a satire of the endless feed, built around one exhausted man and a phone that will not let him go.',
      characters: [
        ['The Scroller', 'Hood up, eyes bloodshot, skin the colour of a low battery. Holding his phone like it owes him money.'],
        ['The Feed', 'Red and blue notification bubbles that never, ever stop arriving.'],
      ],
      direction: 'Split lighting: furious orange on one side, cold notification blue on the other. Gritty comic texture. The joke is on digital obsession.',
      specs: { grid: null, maxWin: null, rtp: null, volatility: null, features: null, release: null, devices: null },
      demo: false,
    },
    {
      slug: 'mid-life-crisis', lot: '004', title: 'MID-LIFE CRISIS', status: 'concept',
      theme: 'Lifestyle satire', world: 'Coastal boulevard at permanent sunset',
      palette: ['#D9126B', '#F7B733', '#5C2D91'],
      short: 'New car. New shirt. Same guy.',
      description: 'He has sold the sensible saloon, bought the red convertible and rediscovered a shirt pattern last seen in 1986. MID-LIFE CRISIS follows one man\'s heroic attempt to reinvent himself in a single sunset. Confidence: unlimited. Self-awareness: pending.',
      characters: [
        ['Big Ron', 'Aviators, open shirt, gold watch, the smile of a man who has just told his family he is "finding himself".'],
      ],
      direction: 'Synth-sunset pinks, hot magentas and palm silhouettes. Painted cartoon with heavy ink. Affectionate satire of reinvention.',
      specs: { grid: null, maxWin: null, rtp: null, volatility: null, features: null, release: null, devices: null },
      demo: false,
    },
    {
      slug: 'dirty-laundry', lot: '005', title: 'DIRTY LAUNDRY', status: 'concept',
      theme: 'Crime comedy', world: 'A laundromat that is busier than it should be',
      palette: ['#138C86', '#F04FA0', '#E9E2D2'],
      short: 'Open 24 hours. Nobody has ever seen a customer.',
      description: 'Sal\'s laundromat has six machines, one neon sign and suspiciously excellent cash flow. Sal himself is always happy to help, provided you do not ask what is in the basket. DIRTY LAUNDRY is a crime comedy about a business that is clean on paper and nowhere else.',
      characters: [
        ['Sal', 'Flat cap, gold hoop, cloud tattoo, a wink he uses as punctuation. Counting something that is not laundry tokens.'],
      ],
      direction: 'Teal laundromat tiles, neon pink signage, soap bubbles that catch the light. Painted cartoon with a pulp-crime attitude. Pure fiction, satirising the trope rather than the crime.',
      specs: { grid: null, maxWin: null, rtp: null, volatility: null, features: null, release: null, devices: null },
      demo: false,
    },
    {
      slug: 'cult-classic', lot: '006', title: 'CULT CLASSIC', status: 'concept',
      theme: 'Absurd fiction', world: 'Candlelit hall, purple clouds, one very bright halo',
      palette: ['#6A2C91', '#F2B53A', '#7A1E3A'],
      short: 'Membership is free. Leaving is complicated.',
      description: 'He has the robe, the sunglasses, the golden medallion and an audience that hangs on every word. What he is actually selling remains unclear, even to him. CULT CLASSIC is an absurd comedy about charisma, hooded followers and the power of a really good entrance.',
      characters: [
        ['The Enlightened One', 'Turban, shades, arms wide open, beaming like he has just heard his own sermon.'],
        ['The Faithful', 'Rows of hooded followers. Very quiet. Holding candles. Probably fine.'],
      ],
      direction: 'Royal purples, candle gold and radiant light. Grand, theatrical composition. An entirely fictional movement, not based on any real faith or organisation.',
      specs: { grid: null, maxWin: null, rtp: null, volatility: null, features: null, release: null, devices: null },
      demo: false,
    },
  ],

  posts: [
    { slug: 'introducing-withdrawal-gaming', kind: 'Studio announcement', title: 'Introducing Withdrawal Gaming', date: null,
      dek: 'An independent studio for slot games with characters, plots and a questionable sense of humour.',
      body: ['Withdrawal Gaming is a new independent studio building original slot concepts for licensed operators. We start with a world, a cast and a joke worth telling, and only then work out the reels.', 'Our first six titles are in concept or development. This site shows the art direction and the thinking behind each one. Technical specifications will appear only when they come from approved documentation.', 'If you run a platform, an aggregator or a casino brand and want an early look, the partners page is the place to start.'] },
    { slug: 'sinners-development-update', kind: 'Development update', title: 'SINNERS: notes from the confessional', date: null,
      dek: 'Our flagship enters development. What we can share, and what we cannot yet.',
      body: ['SINNERS is our flagship concept: a 5×5 slot about temptation, with heaven and hell competing over a golden apple.', 'The 66,666× figure you may have heard is a development target. It is not a certified specification and will not be presented as one until independent testing confirms it.', 'RTP, volatility and features will be published with the certified build. Until then, expect artwork, characters and the occasional confession.'] },
    { slug: 'why-our-games-have-a-plot', kind: 'Behind the scenes', title: 'Why our games have a plot', date: null,
      dek: 'On characters, satire and not drawing another gold coin.',
      body: ['Most lobbies are full of gold coins, gemstones and lightning. We prefer people: a detective bloodhound, a laundromat owner with excellent cash flow, a man in a red convertible discovering himself.', 'Every Withdrawal Gaming title starts as a premise you could pitch as a cartoon. If the characters are not funny without the reels, the reels will not save them.', 'The satire is aimed at the characters and their worlds, never at players. Our games are for adults, played responsibly, on licensed platforms only.'] },
  ],
};
