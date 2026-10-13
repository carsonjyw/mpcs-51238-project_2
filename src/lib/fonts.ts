import {
  Archivo,
  IBM_Plex_Mono,
  IBM_Plex_Sans_Condensed,
  Instrument_Serif,
  Manrope,
  Newsreader,
} from "next/font/google";

// Sky Minimal: one light, open geometric sans.
export const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

// Cockpit Dark: condensed sans for labels, mono for every number.
export const plexCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-plex-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
export const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Aviation Editorial: display serif, text serif, and a sans for small labels.
export const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
export const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});
export const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"] });
