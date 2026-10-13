# Aircraft Explorer

Assignment 2 for Design, Build, Ship (MPCS 51238): UI/UX & Visual Design.

A static Next.js and Tailwind CSS site about eight modern commercial passenger aircraft from Airbus and Boeing. It is aimed at aviation enthusiasts, students, and anyone curious about commercial aviation.

## What's in the project

The homepage (`/`) is a hub that links to everything below.

| Section | Route |
|---|---|
| Mood boards, 28 artifacts each | `/mood-boards/sky-minimal`, `/mood-boards/cockpit-dark`, `/mood-boards/aviation-editorial` |
| Design systems, one per mood board | `/design-systems/sky-minimal`, `/design-systems/cockpit-dark`, `/design-systems/aviation-editorial` |
| The site, built in the chosen style, Sky Minimal | `/aircraft-explorer` |
| Aircraft profiles | `/aircraft-explorer/a320neo`, `a321neo`, `a350-900`, `a380`, `737-max-8`, `777-300er`, `787-9`, `747-8` |
| Comparison | `/aircraft-explorer/compare` |

### Aircraft Explorer features

- Manufacturer filter (All, Airbus, Boeing) and sorting by range, seats, year, or name
- A profile for each aircraft with four tabs:
  - **Overview:** history, design, airline operations, how to recognize it, and facts
  - **Gallery:** exterior, cockpit, cabin, and engine photos, with a keyboard-accessible photo viewer
  - **Cabin:** illustrative seat diagrams for each deck
  - **Engines & specs:** engine options and specifications
- A side-by-side comparison of two or three aircraft

Everything is static: no database, backend, accounts, external APIs, or persistent storage. All aircraft data lives in `src/lib/aircraft.ts` and `src/lib/profiles.ts`. Figures are rounded from manufacturer published data, and seat diagrams are illustrative, not airline seat maps.

## Photographs

All 76 photographs are freely licensed images from Wikimedia Commons (CC BY, CC BY-SA, CC0, or public domain), resized and stored in `public/photos`. The author, license, and source for each one are in `src/lib/photo-credits.json`, and every page credits the photos it uses.

## Project structure

```
src/app/                    routes: hub, mood boards, design systems, aircraft-explorer
src/components/ds/          components for each design system (sky, cockpit, editorial)
src/components/SeatMap.tsx  illustrative SVG cabin diagrams
src/lib/                    aircraft data, profiles, color tokens, photo credits
public/photos/              local, licensed photographs
```

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Other scripts: `npm run lint` and `npm run build`.

## Process

See [PROCESS.md](PROCESS.md) for how the design evolved: the three directions, the feedback at each stage, and the decisions behind the final site.

## Agent.md

See [Agent.md](Agent.md).
