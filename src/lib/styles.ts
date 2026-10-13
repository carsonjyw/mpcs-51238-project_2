// The three visual directions explored in this project.
// Swatches mirror each mood board's palette for the hub preview.

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
    swatches: ["#ffffff", "#eef3f8", "#a9c4de", "#2f6fb0", "#18212c"],
  },
  {
    slug: "cockpit-dark",
    name: "Cockpit Dark",
    summary: "Flight deck displays. Deep navy, charcoal, precise cyan.",
    swatches: ["#070b13", "#0c121d", "#1c2636", "#5fd4e6", "#dfe7f1"],
  },
  {
    slug: "aviation-editorial",
    name: "Aviation Editorial",
    summary: "Aviation magazines. Warm cream, navy type, large headlines.",
    swatches: ["#f3ede2", "#e7dccb", "#a4532f", "#1b2742", "#2a2723"],
  },
];

export const site = {
  name: "Aircraft Explorer",
  href: "/aircraft-explorer",
  summary:
    "Modern commercial passenger aircraft, with photos, specifications, and Airbus/Boeing filters.",
};
