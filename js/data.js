/* WITHDRAWAL GAMING - site content & game metadata.
   Presentation lives in app.js; this file is data only, so games can be added
   (or moved to a CMS / JSON feed) without touching layout code.
   ARTWORK SWAP: each game's `cover` is null -> the site uses assets/games/<slug>_480w.webp
   and <slug>_960w.webp. To use new art, either overwrite those two files (same names),
   or set cover: 'assets/games/final/<file>.png' (any proportion - it is fitted to a 3:4 slot).
   RULE: no RTP, certified max win, release date or mechanic is published
   unless it comes from approved game documentation. Unknown = null -> "TBC". */
window.WG = {
  config: {
    // Owner to supply. Until then the UI shows these as "to be confirmed".
    contactEmail: null, pressEmail: null,
    // PLAY ON STAKE destination. Official 'Only on Stake' collection (owner-supplied, to be verified).
    // When the official Withdrawal Gaming provider page exists, put its URL in providerUrl - it takes priority.
    stakeUrl: 'https://stake.com/casino/group/only-on-stake', providerUrl: null,
    formEndpoint: null, // e.g. "https://api.example.com/enquiry" - forms refuse to fake a send while null
    company: { legalName: null, regNumber: null, address: null, jurisdiction: null },
    social: [ { name: 'Instagram', url: null }, { name: 'X', url: null }, { name: 'LinkedIn', url: null }, { name: 'YouTube', url: null } ],
  },

  games: [
    {
      slug: 'sinners', band: '#7A1216', cover: null, lot: '001', title: 'SINNERS', status: 'in-development', featured: true, alt: true,
      theme: 'Religious satire', world: 'Candlelit gothic cathedral, stained glass, heaven and hell sharing a pew',
      palette: ['#9E1A1A', '#E8B53A', '#F3E2C0'],
      taglines: ['REPENT. SIN. WIN.', 'FORGIVE ME FATHER, FOR I HAVE SPUN.'],
      short: 'Heaven and hell share a pew. Neither is behaving.',
      description: 'A saviour in sunglasses who is clearly off duty, a devil in a gold chain who has done this before, and one golden apple everybody pretends not to want. SINNERS is our flagship: a candlelit cathedral comedy about temptation, where the halo and the horns finally get the same screen time.',
      characters: [
        ['The Saviour', 'Halo on, crown of thorns on, shades on. Utterly unbothered, eyes half closed, taking the day off.'],
        ['The Devil', 'Crimson, horned, gold-chained and grinning. Leaning in with the apple like a salesman who already knows you will say yes.'],
        ['The Golden Apple', 'The signature symbol. Polished, tempting and entirely the point.'],
      ],
      direction: 'Gothic arches, stained glass and candlelight in deep reds and gold, drawn in heavy cartoon ink. Provocative satire about temptation and hypocrisy, pitched as mischief rather than hate.',
      specs: { grid: '5×5 (proposed)', maxWin: '66,666× (development target, not independently verified)', rtp: null, volatility: null, features: null, release: null, devices: 'Desktop and mobile (planned)' },
      demo: false,
    },
    {
      slug: 'sniffers', band: '#1E2577', cover: null, lot: '002', title: 'SNIFFERS', status: 'concept', featured: true, alt: true,
      theme: 'Dark comedy', world: 'A neon city after midnight, one table and some very bad decisions',
      palette: ['#26309A', '#E0218A', '#C7782E'],
      short: 'He used to have the best nose on the force. That was the problem.',
      description: 'Basil Hound was the finest sniffer dog in the city, until he followed one lead too far. Now he is off duty, in a tracksuit, at a table he should not be at, and his informant has stopped asking questions. SNIFFERS is a pitch-black comedy about a hero who lost the plot, set against a neon skyline that has seen it all before.',
      characters: [
        ['Basil Hound', 'Ex-detective bloodhound. Blue fedora, tracksuit, bloodshot stare. A cautionary tale with excellent ears.'],
        ['Little Coo', 'The pigeon. Pink shades, gold chain, zero remorse. Knows everyone, trusts no one.'],
      ],
      direction: 'Night-city noir in electric blue, violet and neon pink, with heavy ink and grimy texture. The joke is the fall from grace, not the habit.',
      specs: { grid: null, maxWin: null, rtp: null, volatility: null, features: null, release: null, devices: null },
      demo: false,
    },
    {
      slug: 'doom-scroll', band: '#8C3412', cover: null, lot: '003', title: 'DOOM SCROLL', status: 'concept', featured: true, alt: true,
      theme: 'Internet satire', world: 'A sagging purple sofa, a dozen open feeds and no idea what time it is',
      palette: ['#E3641E', '#2B6FE0', '#7A2C8C'],
      short: 'One more notification. Then sleep. Probably.',
      description: 'He sat down for five minutes. That was three days ago. Likes, hearts, bells and autoplay keep arriving faster than he can blink, and the energy drink is doing all the heavy lifting. DOOM SCROLL is a satire of the endless feed, starring one hollow-eyed man and a phone that will not let him go.',
      characters: [
        ['The Scroller', 'Orange hoodie, green skin, eyes like road maps. Has not looked up since the last software update.'],
        ['The Feed', 'Thumbs, hearts, play buttons and bells. Never finished, never quiet.'],
      ],
      direction: 'Phone-glow blues against a hot orange hoodie and deep purple sofa, framed by a wall of screens. Gritty comic ink. The joke is on digital obsession.',
      specs: { grid: null, maxWin: null, rtp: null, volatility: null, features: null, release: null, devices: null },
      demo: false,
    },
    {
      slug: 'mid-life-crisis', band: '#8E0F2B', cover: null, lot: '004', title: 'MID-LIFE CRISIS', status: 'concept', alt: true,
      theme: 'Lifestyle satire', world: 'Ocean boulevard at permanent sunset',
      palette: ['#C8102E', '#F7A531', '#7B2A8C'],
      short: 'New car. New shirt. Same guy.',
      description: 'He has sold the sensible saloon, bought the red convertible and rediscovered a floral shirt last seen in 1986. Now he is parked on the boulevard, chin up, gold watch out, convinced the sunset is for him. MID-LIFE CRISIS is a comedy of reinvention: confidence unlimited, self-awareness pending.',
      characters: [
        ['Big Ron', 'Aviators, chest hair, gold watch, gold chain. Leaning back in the convertible like he invented it.'],
      ],
      direction: 'Synth-sunset oranges and magentas, palm silhouettes and art-deco hotels, with a glossy red car filling the frame. Affectionate satire of reinvention.',
      specs: { grid: null, maxWin: null, rtp: null, volatility: null, features: null, release: null, devices: null },
      demo: false,
    },
    {
      slug: 'dirty-laundry', band: '#0B4F45', cover: null, lot: '005', title: 'DIRTY LAUNDRY', status: 'concept', alt: true,
      theme: 'Crime comedy', world: 'A laundromat that is somehow always busy and never has customers',
      palette: ['#0F6B5C', '#E84FA8', '#9BC66A'],
      short: 'Open 24 hours. Nobody has ever seen a customer.',
      description: 'Sal runs a laundromat with spotless machines, a neon sign and suspiciously excellent cash flow. The socks are on the line, the bubbles are everywhere and the money is somehow always clean. DIRTY LAUNDRY is a crime comedy about a business that looks good on paper and nowhere else.',
      characters: [
        ['Sal', 'Black beanie, pencil moustache, gold tooth, a smile that says "receipts available on request". Fanning out a stack of notes that did not come from the coin slot.'],
      ],
      direction: 'Deep teal tiles, chrome machines, neon pink and cyan signage, and soap bubbles everywhere. Pulp-crime attitude in painted cartoon ink. Pure fiction, satirising the trope.',
      specs: { grid: null, maxWin: null, rtp: null, volatility: null, features: null, release: null, devices: null },
      demo: false,
    },
    {
      slug: 'cult-classic', band: '#46206B', cover: null, lot: '006', title: 'CULT CLASSIC', status: 'concept', alt: true,
      theme: 'Absurd fiction', world: 'Purple clouds, a blazing sunburst and a very devoted audience',
      palette: ['#5B2A86', '#F2B53A', '#F4EDE1'],
      short: 'Membership is free. Leaving is complicated.',
      description: 'He has the robes, the gold visor, the glowing medallion and a crowd of hooded followers holding candles in perfect silence. What he is actually selling remains unclear, even to him. CULT CLASSIC is an absurd comedy about charisma, conformity and the power of a really good entrance.',
      characters: [
        ['The Enlightened One', 'White turban, gold visor, arms spread wide and a grin of total self-belief. Backlit by his own sunburst.'],
        ['The Faithful', 'Rows of hooded followers with candles. Very quiet. Probably fine.'],
      ],
      direction: 'Royal purples, candle gold and radiant light in a grand, symmetrical composition. An entirely fictional movement, not based on any real faith or organisation.',
      specs: { grid: null, maxWin: null, rtp: null, volatility: null, features: null, release: null, devices: null },
      demo: false,
    },
  ],

  faq: [
    ['Is Withdrawal Gaming a casino?', 'No. We are an independent game development studio. We do not accept wagers, operate player accounts or provide real-money gambling services.'],
    ['Can I play your games?', 'Not yet. Every title is a concept or in development. We intend to release them exclusively on Stake, subject to platform approval, in the markets where Stake makes them available.'],
    ['When is the first release?', 'No release date has been announced. We will publish dates when they are real.'],
    ['Do you hold a gambling licence?', 'Not at present. Our current regulatory status is set out on the licensing page and will be updated as anything is confirmed.'],
    ['Are the RTP and maximum win figures final?', 'No. Figures such as the 66,666× SINNERS target are development targets. Certified figures will be published with each approved build.'],
    ['Will your games be available on other casinos?', 'No. We intend to distribute our games exclusively through Stake Engine under the Only on Stake model. We are not seeking other operators or aggregators.'],
  ],

  posts: [
    { slug: 'introducing-withdrawal-gaming', kind: 'Studio announcement', title: 'Introducing Withdrawal Gaming', date: null,
      dek: 'An independent studio for slot games with characters, plots and a questionable sense of humour.',
      body: ['Withdrawal Gaming is a new independent studio building original slot games. We start with a world, a cast and a joke worth telling, and only then work out the reels.', 'Our first six titles are in concept or development. This site shows the art direction and the thinking behind each one. Technical specifications will appear only when they come from approved documentation.', 'Our games are being developed for exclusive distribution on Stake through Stake Engine. They will appear there once they have been approved, and not before.'] },
    { slug: 'sinners-development-update', kind: 'Clinical notes', title: 'SINNERS: notes from the confessional', date: null,
      dek: 'Our flagship enters development. What we can share, and what we cannot yet.',
      body: ['SINNERS is our flagship concept: a 5×5 slot about temptation, with heaven and hell competing over a golden apple.', 'The 66,666× figure you may have heard is a development target. It is not a certified specification and will not be presented as one until independent testing confirms it.', 'RTP, volatility and features will be published with the certified build. Until then, expect artwork, characters and the occasional confession.'] },
    { slug: 'why-our-games-have-a-plot', kind: 'Behind the scenes', title: 'Why our games have a plot', date: null,
      dek: 'On characters, satire and not drawing another gold coin.',
      body: ['Most lobbies are full of gold coins, gemstones and lightning. We prefer people: a detective bloodhound, a laundromat owner with excellent cash flow, a man in a red convertible discovering himself.', 'Every Withdrawal Gaming title starts as a premise you could pitch as a cartoon. If the characters are not funny without the reels, the reels will not save them.', 'The satire is aimed at the characters and their worlds, never at players. Our games are for adults only, and should be played responsibly.'] },
  ],
};
