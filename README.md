# Aircraft Explorer

Assignment 2 for Design, Build, Ship (MPCS 51238): UI/UX & Visual Design.

A static Next.js + Tailwind CSS site about modern commercial passenger aircraft.
The homepage is a hub that links to:

- three mood boards: `/mood-boards/sky-minimal`, `/mood-boards/cockpit-dark`, `/mood-boards/aviation-editorial`
- three design systems built from them: `/design-systems/...`
- the site itself, built in the chosen style, Sky Minimal: `/aircraft-explorer`
  - a profile for each of eight aircraft: `/aircraft-explorer/a350-900`, `/aircraft-explorer/a380`, and so on
    (overview, photo gallery, illustrative cabin layout, engines and specifications)
  - a side-by-side comparison of two or three aircraft: `/aircraft-explorer/compare`

No database, backend, accounts, external APIs, or persistent storage. All aircraft data is local and static.

## Photographs

All photographs are freely licensed images from Wikimedia Commons (CC BY, CC BY-SA, CC0, or public domain),
resized and stored in `public/photos`. Author, license, and source for each are in `src/lib/photo-credits.json`
and are credited at the bottom of every page that uses them.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.
