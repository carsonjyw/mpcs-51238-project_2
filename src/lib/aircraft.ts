import type { PhotoSlug } from "./photos";

// Static, local aircraft data. Figures are rounded from manufacturer published
// specifications (typical seating, maximum range) and are for reference only.

export type Manufacturer = "Airbus" | "Boeing";
export type BodyType = "Narrow-body" | "Wide-body";

export type Aircraft = {
  id: string;
  name: string;
  manufacturer: Manufacturer;
  body: BodyType;
  engines: 2 | 4;
  engineTypes: string;
  firstService: number;
  inProduction: boolean;
  seats: number; // typical
  rangeKm: number;
  lengthM: number;
  spanM: number;
  mtowT: number; // maximum takeoff weight, tonnes
  summary: string;
  photo?: PhotoSlug;
};

export const aircraft: Aircraft[] = [
  {
    id: "a320neo",
    name: "A320neo",
    manufacturer: "Airbus",
    body: "Narrow-body",
    engines: 2,
    engineTypes: "CFM LEAP-1A or PW1100G",
    firstService: 2016,
    inProduction: true,
    seats: 165,
    rangeKm: 6300,
    lengthM: 37.6,
    spanM: 35.8,
    mtowT: 79,
    summary: "The best-selling single-aisle family, re-engined for lower fuel burn and noise.",
    photo: "a320neo-haze",
  },
  {
    id: "a321neo",
    name: "A321neo",
    manufacturer: "Airbus",
    body: "Narrow-body",
    engines: 2,
    engineTypes: "CFM LEAP-1A or PW1100G",
    firstService: 2017,
    inProduction: true,
    seats: 206,
    rangeKm: 7400,
    lengthM: 44.5,
    spanM: 35.8,
    mtowT: 97,
    summary: "A stretched A320neo that flies some transatlantic routes with a single aisle.",
    photo: "a321neo-above-cloud",
  },
  {
    id: "a350-900",
    name: "A350-900",
    manufacturer: "Airbus",
    body: "Wide-body",
    engines: 2,
    engineTypes: "Rolls-Royce Trent XWB-84",
    firstService: 2015,
    inProduction: true,
    seats: 325,
    rangeKm: 15372,
    lengthM: 66.8,
    spanM: 64.8,
    mtowT: 283,
    summary: "A long-haul twin built largely from carbon composites, with a quiet, high cabin.",
    photo: "a350-delta-flight",
  },
  {
    id: "a380",
    name: "A380",
    manufacturer: "Airbus",
    body: "Wide-body",
    engines: 4,
    engineTypes: "Rolls-Royce Trent 900 or Engine Alliance GP7200",
    firstService: 2007,
    inProduction: false,
    seats: 545,
    rangeKm: 14800,
    lengthM: 72.7,
    spanM: 79.8,
    mtowT: 575,
    summary: "The largest passenger airliner ever built, with two full-length decks.",
    photo: "a380-lufthansa-landing",
  },
  {
    id: "737-max-8",
    name: "737 MAX 8",
    manufacturer: "Boeing",
    body: "Narrow-body",
    engines: 2,
    engineTypes: "CFM LEAP-1B",
    firstService: 2017,
    inProduction: true,
    seats: 162,
    rangeKm: 6570,
    lengthM: 39.5,
    spanM: 35.9,
    mtowT: 82.2,
    summary: "The fourth generation of the 737, with new engines and split-tip winglets.",
    photo: "b737max-contrails",
  },
  {
    id: "777-300er",
    name: "777-300ER",
    manufacturer: "Boeing",
    body: "Wide-body",
    engines: 2,
    engineTypes: "GE90-115B",
    firstService: 2004,
    inProduction: false,
    seats: 396,
    rangeKm: 13650,
    lengthM: 73.9,
    spanM: 64.8,
    mtowT: 351.5,
    summary: "The long-range twin that replaced many four-engine jets on intercontinental routes.",
    photo: "b777-cathay-runway",
  },
  {
    id: "787-9",
    name: "787-9",
    manufacturer: "Boeing",
    body: "Wide-body",
    engines: 2,
    engineTypes: "GEnx-1B or Rolls-Royce Trent 1000",
    firstService: 2014,
    inProduction: true,
    seats: 290,
    rangeKm: 14010,
    lengthM: 62.8,
    spanM: 60.1,
    mtowT: 254,
    summary: "A mid-size long-haul Dreamliner that opened many new nonstop city pairs.",
    photo: "b787-aircanada-approach",
  },
  {
    id: "747-8",
    name: "747-8",
    manufacturer: "Boeing",
    body: "Wide-body",
    engines: 4,
    engineTypes: "GEnx-2B",
    firstService: 2012,
    inProduction: false,
    seats: 467,
    rangeKm: 14320,
    lengthM: 76.3,
    spanM: 68.4,
    mtowT: 447.7,
    summary: "The final, longest version of the original jumbo jet, with 787-era engines.",
    photo: "b747-8-retro",
  },
];

export function getAircraft(id: string) {
  const a = aircraft.find((x) => x.id === id);
  if (!a) throw new Error(`Unknown aircraft: ${id}`);
  return a;
}

export const fmt = (n: number) => n.toLocaleString("en-US");
