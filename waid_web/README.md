# WAID Website — Owner's Guide

This is a plain HTML/CSS/JavaScript website — no build tools, no
installs, no server required to edit it. Open the files, change the
text, save, refresh your browser.

## Where everything lives

| What you want to change | Which file |
|---|---|
| Shoe products (name, price, photos, description, specs, care, sizes) | `js/products.js` |
| Everything else (hero text, contact info, WhatsApp number, nav menu, footer, Privacy Policy & Terms text, page title/description for Google) | `js/content.js` |
| Colors, fonts, spacing, layout | `css/style.css` |
| Photos, logo, icons | `assets/` folder |

You should almost never need to open `index.html`, `privacy.html`,
`terms.html`, or `js/main.js` — they just display whatever is in
`content.js` and `products.js`.

## Adding / editing a shoe

Open `js/products.js`. Each shoe is one `{ ... }` block in the
`PRODUCTS` list. To add a new shoe, copy an existing block, paste it
as a new entry, give it a unique `id`, and fill in your details — it
appears on the site automatically.

**Photos:** each product has an `images` list.
- One photo in the list → shown as-is, no arrows.
- Two or more photos → hovering the product card shows left/right
  arrows to flip between them, and opening the shoe's detail pop-up
  shows a bigger gallery with arrows + dots.

Two products ("The Longwing Derby" and "The Venetian Slip-On") are
included with placeholder "PHOTO NEEDED" artwork and a "Coming Soon"
badge so the collection has 6 shoes ready to go. Replace their
`images`/`image` paths with your real photos (and remove the
`badge: "Coming Soon"` line) whenever they're ready to sell.

**Before uploading a new photo:** compress it first — see the
checklist at the top of `js/products.js`. Large, uncompressed photos
straight from a phone will slow the whole site down.

## Privacy Policy & Terms of Service

Both pages (`privacy.html`, `terms.html`) pull their text from
`js/content.js` under `SITE_CONTENT.legal`. Edit the wording there;
both pages update automatically. They're linked from the footer on
every page.

These are general starting templates, not legal advice — have a
lawyer review them before relying on them, especially once you start
shipping internationally or taking payments directly on the site.

## Getting found on Google for "leather shoes"

On-page SEO is done: fast-loading pages, descriptive titles, meta
descriptions, Open Graph/WhatsApp link previews, and structured data
(`ShoeStore` schema) are all wired up in `index.html`. But showing up
in search results also requires steps outside this code:

1. **Put the site on a real domain** (e.g. `www.waidshoes.com`) —
   right now it's a placeholder used throughout the code.
2. Once live, update every `https://www.waidshoes.com` in this
   project to your real domain — search for it in: `index.html`,
   `privacy.html`, `terms.html`, `robots.txt`, `sitemap.xml`, and
   `siteUrl` in `js/content.js`.
3. Create a free [Google Search Console](https://search.google.com/search-console)
   account for your domain, and submit `https://yourdomain.com/sitemap.xml`.
4. Create a free **Google Business Profile** for WAID — for a
   location-based search like "leather shoes [your city]", this
   usually matters more than the website itself.
5. Ranking for a competitive term like "leather shoes" nationally
   also takes other websites linking to yours and ongoing content
   (blog posts, social presence) — no website's code alone can
   guarantee a #1 spot, on Google or anywhere else.

## Performance

Product/hero/logo photos have been converted to compressed WebP
files (from ~5MB total down to under 500KB), and non-critical images
load lazily. If you add new photos later, keep them compressed and
under roughly 1000x1000px — see the checklist in `js/products.js`.

## Publishing the site

Any static-hosting service works since there's no server-side code —
for example Netlify, Vercel, GitHub Pages, or Cloudflare Pages all
have a free tier where you drag-and-drop this `waid_web` folder (or
connect it to a Git repo) and get a live URL in minutes.
