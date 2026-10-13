// The three visual directions explored in this project.
// Swatches are early guesses for the hub preview; the mood boards define the real palettes.

export type StyleDirection = {
  slug: string;
  name: string;
  summary: string;
  swatches: string[];
};

export const styles: StyleDirection[] = [
  {
    slug: "sky-minimal",
    name: "Sky Minimal",
    summary: "Premium airline sites. White, soft blue, generous whitespace.",
    swatches: ["#ffffff", "#eef3f8", "#a9c4de", "#2f6fb0", "#1b2430"],
  },
  {
    slug: "cockpit-dark",
    name: "Cockpit Dark",
    summary: "Flight deck displays. Deep navy, charcoal, precise cyan.",
    swatches: ["#0a1220", "#141c2b", "#2a3446", "#5fd4e6", "#e4ebf3"],
  },
  {
    slug: "aviation-editorial",
    name: "Aviation Editorial",
    summary: "Aviation magazines. Warm cream, navy type, large headlines.",
    swatches: ["#f4eee3", "#e6dccb", "#b08a5a", "#1d2a44", "#2b2a27"],
  },
];

export const site = {
  name: "Aircraft Explorer",
  href: "/aircraft-explorer",
  summary:
    "Modern commercial passenger aircraft, with photos, specifications, and Airbus/Boeing filters.",
};
