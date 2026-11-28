# Withdrawal Gaming · website demo (V2.1)

Static site, no build step. Served by GitHub Pages from `main` / root:
https://thehouse-edge.github.io/Withdrawal-gaming/

All releases shown are concepts or in development. Not as prescribed.

## Replacing game artwork (no code changes needed)

Covers live in `assets/games/`. Every cover sits in a fixed 3:4 slot and is fitted
inside it, so new art of any proportion will not break the layout.

**Option A, same file names (easiest):** export each new cover as WebP at two widths
and overwrite the existing files:

    assets/games/sinners_480w.webp       assets/games/sinners_960w.webp
    assets/games/sniffers_480w.webp      assets/games/sniffers_960w.webp
    assets/games/doom-scroll_480w.webp   assets/games/doom-scroll_960w.webp
    assets/games/mid-life-crisis_480w.webp  assets/games/mid-life-crisis_960w.webp
    assets/games/dirty-laundry_480w.webp    assets/games/dirty-laundry_960w.webp
    assets/games/cult-classic_480w.webp     assets/games/cult-classic_960w.webp

**Option B, any single file (PNG/JPG/WebP):** upload it, for example to
`assets/games/final/sinners.png`, then in `js/data.js` change that game's
`cover: null` to `cover: 'assets/games/final/sinners.png'`.

Commit to `main`. GitHub Pages redeploys in about a minute. (Hard-refresh to bypass the cache.)

The earlier v1 covers (`*_v1_*.webp`) appear as "Earlier cover concept" on each game page.
To hide them, set `alt: false` for that game in `js/data.js`.

## Where to edit content
- `js/data.js`: games, descriptions, specs (unverified values stay `null` and show as TBC), FAQ, news, contact details, form endpoint
- `js/legal.js`: legal drafts
- `css/site.css`: design system

## Play on Stake link
`js/data.js`: `stakeUrl` (currently the Only on Stake collection, owner-supplied, unverified). When the official
Withdrawal Gaming provider page exists, set `providerUrl`; it takes priority everywhere. No affiliate parameters are added.

## Favicons
`favicon.ico` (16/32/48), `assets/brand/favicon/` (SVG, 16, 32, 48, 180 Apple touch, 192/512 manifest icons).

## Rollback
- V2: branch `v2-archive` (commit 185c50f)
- V1: branch `v1-archive` (commit 895400a)

To restore one, set Pages to deploy from that branch, or reset `main` to its commit.
