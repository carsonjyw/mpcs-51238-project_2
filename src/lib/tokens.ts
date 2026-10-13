import type { CSSProperties } from "react";

// Color roles for the three design systems. Each page renders these with
// contrast ratios calculated in src/lib/contrast.ts.

export type ColorRole = { role: string; name: string; hex: string; use: string };

export type Palette = {
  background: string;
  surface: string;
  roles: ColorRole[];
  semantic: ColorRole[];
};

export const skyPalette: Palette = {
  background: "#f7f9fb",
  surface: "#ffffff",
  roles: [
    { role: "Background", name: "Paper", hex: "#f7f9fb", use: "Page background" },
    { role: "Surface", name: "Cloud", hex: "#ffffff", use: "Cards, panels, inputs" },
    { role: "Text", name: "Ink", hex: "#18212c", use: "Headings and body" },
    { role: "Muted text", name: "Slate", hex: "#4a5664", use: "Captions, labels, help text" },
    { role: "Border", name: "Haze", hex: "#dfe6ee", use: "Card edges and dividers" },
    { role: "Control border", name: "Altitude", hex: "#7b8da2", use: "Input and checkbox outlines" },
    { role: "Accent", name: "Horizon", hex: "#2f6fb0", use: "Primary actions, links, selection" },
  ],
  semantic: [
    { role: "Success", name: "Runway green", hex: "#1d7348", use: "Saved, in service" },
    { role: "Warning", name: "Amber", hex: "#8a5a00", use: "Out of production" },
    { role: "Error", name: "Signal red", hex: "#b42318", use: "Failed loads, invalid input" },
  ],
};

export const skyTokens = {
  "--sk-bg": "#f7f9fb",
  "--sk-surface": "#ffffff",
  "--sk-mist": "#eef3f8",
  "--sk-haze": "#d6e2ee",
  "--sk-text": "#18212c",
  "--sk-muted": "#4a5664",
  "--sk-border": "#dfe6ee",
  "--sk-control": "#7b8da2",
  "--sk-accent": "#2f6fb0",
  "--sk-accent-hover": "#285f98",
  "--sk-accent-press": "#1f4f80",
  "--sk-success": "#1d7348",
  "--sk-warning": "#8a5a00",
  "--sk-error": "#b42318",
} as CSSProperties;

export const cockpitPalette: Palette = {
  background: "#070b13",
  surface: "#0f1623",
  roles: [
    { role: "Background", name: "Void", hex: "#070b13", use: "Page background" },
    { role: "Surface", name: "Panel", hex: "#0f1623", use: "Display units, cards, panels" },
    { role: "Text", name: "Display white", hex: "#e6edf5", use: "Headings, body, data" },
    { role: "Muted text", name: "Scale grey", hex: "#9aa8bb", use: "Labels, units, help text" },
    { role: "Border", name: "Bezel", hex: "#24324a", use: "Panel lines and dividers" },
    { role: "Control border", name: "Frame", hex: "#5d6e89", use: "Input, checkbox, chip outlines" },
    { role: "Accent", name: "Selected cyan", hex: "#5fd4e6", use: "Primary actions, selection, focus" },
  ],
  semantic: [
    { role: "Success", name: "Engaged green", hex: "#5fe08a", use: "In production, saved" },
    { role: "Caution", name: "Caution amber", hex: "#f2b84b", use: "Out of production, check input" },
    { role: "Warning", name: "Warning red", hex: "#ff7a7a", use: "Errors, failed loads" },
  ],
};

export const cockpitTokens = {
  "--ck-void": "#070b13",
  "--ck-surface": "#0f1623",
  "--ck-raised": "#162032",
  "--ck-text": "#e6edf5",
  "--ck-muted": "#9aa8bb",
  "--ck-border": "#24324a",
  "--ck-control": "#5d6e89",
  "--ck-accent": "#5fd4e6",
  "--ck-accent-hover": "#8ae3f0",
  "--ck-accent-press": "#3fb8cb",
  "--ck-success": "#5fe08a",
  "--ck-caution": "#f2b84b",
  "--ck-warning": "#ff7a7a",
} as CSSProperties;

export const editorialPalette: Palette = {
  background: "#f3ede2",
  surface: "#faf6ee",
  roles: [
    { role: "Background", name: "Paper", hex: "#f3ede2", use: "Page background" },
    { role: "Surface", name: "Fine paper", hex: "#faf6ee", use: "Cards, panels, fields" },
    { role: "Text", name: "Press black", hex: "#2a2723", use: "Body text" },
    { role: "Heading", name: "Ink navy", hex: "#1b2742", use: "Display and headings" },
    { role: "Muted text", name: "Graphite", hex: "#675f55", use: "Captions, bylines, help text" },
    { role: "Border", name: "Rule", hex: "#cfc3b0", use: "Hairline rules between items" },
    { role: "Control border", name: "Pencil", hex: "#8a7f70", use: "Field underlines, checkbox outlines" },
    { role: "Accent", name: "Rust", hex: "#a4532f", use: "Primary actions, links, selection" },
  ],
  semantic: [
    { role: "Success", name: "Olive", hex: "#3d6b3a", use: "Saved to reading list" },
    { role: "Warning", name: "Brass", hex: "#7a5a1c", use: "Out of production" },
    { role: "Error", name: "Oxblood", hex: "#9b2c1f", use: "Failed loads, invalid input" },
  ],
};

export const editorialTokens = {
  "--ed-bg": "#f3ede2",
  "--ed-surface": "#faf6ee",
  "--ed-deep": "#e7dccb",
  "--ed-text": "#2a2723",
  "--ed-ink": "#1b2742",
  "--ed-muted": "#675f55",
  "--ed-rule": "#cfc3b0",
  "--ed-control": "#8a7f70",
  "--ed-accent": "#a4532f",
  "--ed-accent-hover": "#8c4526",
  "--ed-accent-press": "#733820",
  "--ed-success": "#3d6b3a",
  "--ed-warning": "#7a5a1c",
  "--ed-error": "#9b2c1f",
} as CSSProperties;

// Shared label style for Aviation Editorial (kept here so server pages can use it too).
export const edLabel = "font-label text-[11px] font-semibold uppercase tracking-[0.16em]";
