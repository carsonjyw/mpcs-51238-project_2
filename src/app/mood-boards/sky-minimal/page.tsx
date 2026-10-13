import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import PhotoCredits from "@/components/PhotoCredits";
import { manrope } from "@/lib/fonts";
import type { PhotoSlug } from "@/lib/photos";

export const metadata = { title: "Sky Minimal · Mood Board" };

const tokens = {
  "--paper": "#f7f9fb",
  "--white": "#ffffff",
  "--mist": "#eef3f8",
  "--haze": "#d6e2ee",
  "--blue": "#2f6fb0",
  "--ink": "#18212c",
  "--muted": "#4a5664",
  "--line": "#e3e9ef",
} as CSSProperties;

const photos: PhotoSlug[] = [
  "a350-delta-flight",
  "wing-above-clouds",
  "b787-aircanada-approach",
  "a350-cathay-takeoff",
  "a380-lufthansa-landing",
  "b787-klm-clouds",
  "b777-cathay-runway",
  "a321neo-above-cloud",
  "b737max-contrails",
];

// One artifact on the board: content in a soft white panel, a numbered caption below.
function Tile({
  n,
  label,
  className,
  bare = false,
  children,
}: {
  n: string;
  label: string;
  className: string;
  bare?: boolean;
  children: ReactNode;
}) {
  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <div
        className={`relative flex-1 overflow-hidden rounded-[22px] ${
          bare ? "" : "bg-[var(--white)] ring-1 ring-[var(--line)]"
        }`}
      >
        {children}
      </div>
      <figcaption className="flex gap-3 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
        <span className="tabular-nums text-[var(--blue)]">{n}</span>
        {label}
      </figcaption>
    </figure>
  );
}

function PlaneIcon() {
  return (
    <path d="M21 15.5v-1.8l-7.6-4.8V3.8a1.4 1.4 0 0 0-2.8 0v5.1L3 13.7v1.8l7.6-2.3v4.9l-2 1.5v1.4l3.4-1 3.4 1v-1.4l-2-1.5v-4.9z" />
  );
}

export default function SkyMinimalBoard() {
  return (
    <div style={tokens} className={`${manrope.className} min-h-full flex-1 bg-[var(--paper)] text-[var(--ink)]`}>
      <header className="mx-auto flex max-w-[1360px] items-center justify-between px-5 pt-6 text-sm sm:px-10">
        <Link
          href="/"
          className="-mx-3 rounded-full px-3 py-1.5 text-[var(--muted)] transition hover:bg-[var(--mist)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--blue)] active:bg-[var(--haze)]"
        >
          ← Hub
        </Link>
        <span className="text-[var(--muted)]">Mood board 1 of 3</span>
      </header>

      <section className="mx-auto max-w-[1360px] px-5 pb-12 pt-16 sm:px-10 sm:pb-20 sm:pt-28">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--blue)]">Bright · Airy · Precise</p>
        <h1 className="mt-5 text-6xl font-extralight tracking-[-0.03em] sm:text-8xl lg:text-[132px] lg:leading-[0.95]">
          Sky Minimal
        </h1>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-lg leading-relaxed text-[var(--muted)]">
            The calm of a premium cabin at cruise. White space as the main material, one clear
            blue, and type that never raises its voice.
          </p>
          <p className="text-sm text-[var(--muted)]">28 artifacts · 9 photographs</p>
        </div>
      </section>

      <main className="mx-auto grid max-w-[1360px] grid-cols-2 gap-x-4 gap-y-8 px-5 pb-24 sm:px-10 lg:auto-rows-[68px] lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
        <Tile n="01" label="A350-900 in clear air" bare className="col-span-2 h-72 sm:h-96 lg:col-span-8 lg:row-span-6 lg:h-auto">
          <Photo slug="a350-delta-flight" sizes="(min-width: 1024px) 66vw, 100vw" preload position="50% 45%" />
        </Tile>
        <Tile n="02" label="Palette" className="col-span-2 h-40 lg:col-span-4 lg:row-span-3 lg:h-auto">
          <div className="grid h-full grid-cols-6">
            {[
              ["#ffffff", "Cloud"],
              ["#eef3f8", "Mist"],
              ["#d6e2ee", "Haze"],
              ["#a9c4de", "Altitude"],
              ["#2f6fb0", "Horizon"],
              ["#18212c", "Ink"],
            ].map(([c, name], i) => (
              <div key={c} className="flex flex-col justify-end p-2.5" style={{ background: c, color: i > 3 ? "#fff" : "#18212c" }}>
                <span className="text-[11px] font-semibold">{name}</span>
                <span className="text-[10px]">{c.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </Tile>
        <Tile n="03" label="Manrope, 200 to 600" className="col-span-1 h-56 lg:col-span-4 lg:row-span-3 lg:h-auto">
          <div className="flex h-full flex-col justify-between p-5 sm:flex-row sm:items-end lg:p-6">
            <span className="text-7xl font-extralight leading-none tracking-tight lg:text-8xl">Aa</span>
            <span className="flex flex-col gap-1 text-sm sm:items-end">
              <span className="font-extralight">ExtraLight</span>
              <span className="font-normal">Regular</span>
              <span className="font-semibold text-[var(--blue)]">SemiBold</span>
            </span>
          </div>
        </Tile>
        <Tile n="04" label="Headline voice" className="col-span-1 h-56 lg:col-span-5 lg:row-span-3 lg:h-auto">
          <div className="flex h-full flex-col justify-between p-5 lg:p-8">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">Display · Light</span>
            <p className="text-2xl font-light leading-tight tracking-tight lg:text-[44px]">
              Fly further, <span className="text-[var(--blue)]">quietly.</span>
            </p>
          </div>
        </Tile>
        <Tile n="05" label="Above the cloud deck" bare className="col-span-1 h-80 lg:col-span-3 lg:row-span-6 lg:h-auto">
          <Photo slug="wing-above-clouds" sizes="(min-width: 1024px) 25vw, 50vw" />
        </Tile>
        <Tile n="06" label="Dawn gradient" bare className="col-span-1 h-80 lg:col-span-4 lg:row-span-3 lg:h-auto">
          <div className="h-full bg-[linear-gradient(180deg,#cfe0f1_0%,#eaf1f8_55%,#fbefe6_100%)]" />
        </Tile>
        <Tile n="07" label="Search, one line" className="col-span-2 h-36 lg:col-span-5 lg:row-span-3 lg:h-auto">
          <div className="flex h-full items-center p-4 lg:p-8">
            <div className="flex w-full items-center gap-4 rounded-full bg-[var(--mist)] p-2 pl-6 text-sm">
              <span className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">From</span>
                <span className="font-semibold">JFK</span>
              </span>
              <svg width="28" height="10" viewBox="0 0 28 10" className="shrink-0 text-[var(--muted)]" aria-hidden>
                <path d="M0 5h26m-4-4 4 4-4 4" fill="none" stroke="currentColor" />
              </svg>
              <span className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">To</span>
                <span className="font-semibold">HND</span>
              </span>
              <span className="ml-auto hidden flex-col sm:flex">
                <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">Aircraft</span>
                <span className="font-semibold">787-9</span>
              </span>
              <span className="ml-auto rounded-full bg-[var(--blue)] px-5 py-3 font-semibold text-white sm:ml-0">Explore</span>
            </div>
          </div>
        </Tile>
        <Tile n="08" label="787-9 on approach" bare className="col-span-2 h-56 lg:col-span-4 lg:row-span-3 lg:h-auto">
          <Photo slug="b787-aircanada-approach" sizes="(min-width: 1024px) 33vw, 100vw" />
        </Tile>
        <Tile n="09" label="Segmented filter" className="col-span-2 h-24 lg:col-span-4 lg:row-span-2 lg:h-auto">
          <div className="flex h-full items-center justify-center p-4">
            <div className="flex rounded-full bg-[var(--mist)] p-1 text-sm">
              <span className="rounded-full px-5 py-2 text-[var(--muted)]">All</span>
              <span className="rounded-full bg-white px-5 py-2 font-semibold shadow-[0_1px_2px_rgba(24,33,44,0.08)]">Airbus</span>
              <span className="rounded-full px-5 py-2 text-[var(--muted)]">Boeing</span>
            </div>
          </div>
        </Tile>
        <Tile n="10" label="Dot grid" className="col-span-1 h-44 lg:col-span-3 lg:row-span-3 lg:h-auto">
          <div className="h-full bg-[radial-gradient(#b4c8de_1.2px,transparent_1.2px)] [background-size:16px_16px]" />
        </Tile>
        <Tile n="11" label="A350-900 lining up" bare className="col-span-1 h-44 lg:col-span-5 lg:row-span-6 lg:h-auto">
          <Photo slug="a350-cathay-takeoff" sizes="(min-width: 1024px) 42vw, 50vw" position="40% 50%" />
        </Tile>
        <Tile n="12" label="Boarding pass" className="col-span-2 h-64 lg:col-span-4 lg:row-span-4 lg:h-auto">
          <div className="flex h-full flex-col justify-between p-6">
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span className="uppercase tracking-[0.16em]">Boarding pass</span>
              <span>Seat 2A</span>
            </div>
            <div className="flex items-end justify-between">
              <span>
                <span className="block text-4xl font-extralight">LHR</span>
                <span className="text-xs text-[var(--muted)]">London</span>
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" className="mb-4 rotate-90 fill-[var(--blue)]" aria-hidden>
                <PlaneIcon />
              </svg>
              <span className="text-right">
                <span className="block text-4xl font-extralight">SIN</span>
                <span className="text-xs text-[var(--muted)]">Singapore</span>
              </span>
            </div>
            <div className="grid grid-cols-3 border-t border-dashed border-[var(--haze)] pt-4 text-xs">
              {[
                ["Gate", "B14"],
                ["Boards", "21:05"],
                ["Aircraft", "A350-900"],
              ].map(([k, v]) => (
                <span key={k}>
                  <span className="block text-[var(--muted)]">{k}</span>
                  <span className="font-semibold">{v}</span>
                </span>
              ))}
            </div>
          </div>
        </Tile>
        <Tile n="13" label="Line icons, 1.5 stroke" className="col-span-2 h-24 lg:col-span-3 lg:row-span-3 lg:h-auto">
          <svg viewBox="0 0 200 48" className="h-full w-full p-5 text-[var(--ink)]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <g transform="translate(10 12)">
              <PlaneIcon />
            </g>
            <g transform="translate(62 12)">
              <path d="M6 3v10a3 3 0 0 0 3 3h9M6 13h8l3 8M9 21h10" />
            </g>
            <g transform="translate(114 12)">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2c3 3.3 3 16.7 0 20M12 2c-3 3.3-3 16.7 0 20" />
            </g>
            <g transform="translate(166 12)">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </g>
          </svg>
        </Tile>
        <Tile n="14" label="A380 on final" bare className="col-span-2 h-60 lg:col-span-6 lg:row-span-4 lg:h-auto">
          <Photo slug="a380-lufthansa-landing" sizes="(min-width: 1024px) 50vw, 100vw" />
        </Tile>
        <Tile n="15" label="One number, large" className="col-span-1 h-44 lg:col-span-3 lg:row-span-4 lg:h-auto">
          <div className="flex h-full flex-col justify-end p-5 lg:p-6">
            <span className="text-4xl font-extralight tracking-tight lg:text-6xl">15,000</span>
            <span className="mt-1 text-sm text-[var(--muted)]">km range · A350-900</span>
          </div>
        </Tile>
        <Tile n="16" label="Window, shade half up" className="col-span-1 h-44 lg:col-span-3 lg:row-span-4 lg:h-auto">
          <div className="flex h-full items-center justify-center bg-[var(--mist)] p-6">
            <div className="relative aspect-[3/4] h-full max-h-56 overflow-hidden rounded-[999px] border-[10px] border-white shadow-[inset_0_0_0_1px_var(--haze)]">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,#9fc0e2_0%,#dbe8f4_60%,#ffffff_100%)]" />
              <div className="absolute inset-x-0 top-0 h-[38%] border-b border-[var(--haze)] bg-[#f4f6f8]" />
            </div>
          </div>
        </Tile>
        <Tile n="17" label="Hero, mostly air" className="col-span-1 h-44 lg:col-span-4 lg:row-span-4 lg:h-auto">
          <svg viewBox="0 0 240 180" className="h-full w-full p-4 lg:p-6" aria-hidden>
            <rect x="0.5" y="0.5" width="239" height="179" rx="10" fill="none" stroke="var(--haze)" />
            <rect x="20" y="22" width="40" height="5" rx="2.5" fill="var(--haze)" />
            <rect x="150" y="22" width="70" height="5" rx="2.5" fill="var(--haze)" />
            <rect x="20" y="70" width="110" height="12" rx="3" fill="var(--ink)" />
            <rect x="20" y="90" width="80" height="5" rx="2.5" fill="var(--haze)" />
            <rect x="20" y="118" width="44" height="14" rx="7" fill="var(--blue)" />
            <path d="M150 70v70M145 70h10M145 140h10" stroke="var(--blue)" strokeWidth="0.75" />
            <text x="160" y="108" fontSize="9" fill="var(--muted)">64</text>
          </svg>
        </Tile>
        <Tile n="18" label="787-9 between layers" bare className="col-span-1 h-44 lg:col-span-4 lg:row-span-4 lg:h-auto">
          <Photo slug="b787-klm-clouds" sizes="(min-width: 1024px) 33vw, 100vw" />
        </Tile>
        <Tile n="19" label="Aircraft card, drawn profile" className="col-span-2 h-72 lg:col-span-4 lg:row-span-4 lg:h-auto">
          <div className="flex h-full flex-col">
            <div className="relative h-1/2 bg-[linear-gradient(180deg,#e3edf7,#f4f8fb)]">
              <svg viewBox="0 0 240 90" className="absolute inset-0 h-full w-full p-4" aria-hidden>
                <path d="M0 70h240" stroke="var(--haze)" strokeDasharray="2 5" />
                <path
                  d="M28 46c0-6 6-10 16-10h132l22-18h12l-8 20 18 2c6 1 8 4 8 6s-2 5-8 6l-30 2H70c-26 0-42-2-42-8z"
                  fill="#ffffff"
                  stroke="var(--ink)"
                  strokeWidth="1.2"
                />
                <path d="M96 48l34 20h14l-18-20z" fill="#ffffff" stroke="var(--ink)" strokeWidth="1.2" />
                <rect x="104" y="52" width="22" height="8" rx="4" fill="var(--blue)" />
                <path d="M54 40h104" stroke="var(--haze)" strokeWidth="2" strokeDasharray="3 4" />
              </svg>
            </div>
            <div className="flex flex-1 flex-col justify-between p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-semibold">Boeing 787-9</span>
                <span className="text-xs text-[var(--muted)]">Boeing</span>
              </div>
              <dl className="grid grid-cols-3 text-xs">
                {[
                  ["Range", "14,010 km"],
                  ["Seats", "290"],
                  ["Span", "60.1 m"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[var(--muted)]">{k}</dt>
                    <dd className="font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Tile>
        <Tile n="20" label="777-300ER departing" bare className="col-span-2 h-52 lg:col-span-5 lg:row-span-3 lg:h-auto">
          <Photo slug="b777-cathay-runway" sizes="(min-width: 1024px) 42vw, 100vw" position="50% 60%" />
        </Tile>
        <Tile n="21" label="Great-circle route" className="col-span-2 h-40 lg:col-span-7 lg:row-span-3 lg:h-auto">
          <svg viewBox="0 0 600 180" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
            <path d="M70 140 Q300 -10 530 140" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" />
            <circle cx="70" cy="140" r="5" fill="var(--blue)" />
            <circle cx="530" cy="140" r="5" fill="none" stroke="var(--blue)" strokeWidth="1.5" />
            <g transform="translate(312 53) rotate(90)" fill="var(--ink)">
              <PlaneIcon />
            </g>
            <text x="70" y="166" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--ink)">SFO</text>
            <text x="530" y="166" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--ink)">SYD</text>
            <text x="300" y="104" textAnchor="middle" fontSize="11" fill="var(--muted)">11,947 km · 787-9</text>
          </svg>
        </Tile>
        <Tile n="22" label="A321neo, a speck above cloud" bare className="col-span-2 h-44 lg:col-span-4 lg:row-span-3 lg:h-auto">
          <Photo slug="a321neo-above-cloud" sizes="(min-width: 1024px) 33vw, 100vw" position="50% 45%" />
        </Tile>
        <Tile n="23" label="Contrails" className="col-span-1 h-36 lg:col-span-4 lg:row-span-3 lg:h-auto">
          <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="h-full w-full bg-[linear-gradient(90deg,#d9e7f4,#eef4fa)]" aria-hidden>
            <path d="M-10 90 L310 30" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
            <path d="M-10 96 L310 36" stroke="#fff" strokeWidth="1.5" opacity="0.7" />
            <path d="M40 110 L260 -10" stroke="#fff" strokeWidth="1" opacity="0.5" />
          </svg>
        </Tile>
        <Tile n="24" label="Cabin seat map" className="col-span-1 h-36 lg:col-span-4 lg:row-span-3 lg:h-auto">
          <div className="flex h-full items-center justify-center p-4">
            <div className="grid grid-cols-[repeat(3,auto)_10px_repeat(3,auto)_10px_repeat(3,auto)] gap-1 lg:gap-1.5">
              {Array.from({ length: 6 }).flatMap((_, row) =>
                Array.from({ length: 11 }).map((_, col) => {
                  if (col === 3 || col === 7) return <span key={`${row}-${col}`} />;
                  const taken = (row * 7 + col * 3) % 5 === 0;
                  const picked = row === 2 && col === 5;
                  return (
                    <span
                      key={`${row}-${col}`}
                      className={`size-2 rounded-[2px] lg:size-3.5 lg:rounded-[3px] ${
                        picked ? "bg-[var(--blue)]" : taken ? "bg-[var(--haze)]" : "ring-1 ring-inset ring-[var(--haze)]"
                      }`}
                    />
                  );
                }),
              )}
            </div>
          </div>
        </Tile>
        <Tile n="25" label="Primary and quiet buttons" className="col-span-2 h-24 lg:col-span-3 lg:row-span-2 lg:h-auto">
          <div className="flex h-full items-center justify-center gap-3 p-4">
            <span className="rounded-full bg-[var(--blue)] px-6 py-3 text-sm font-semibold text-white">View aircraft</span>
            <span className="rounded-full px-6 py-3 text-sm font-semibold text-[var(--blue)] ring-1 ring-[var(--haze)]">Compare</span>
          </div>
        </Tile>
        <Tile n="26" label="737 MAX 8, double contrail" bare className="col-span-1 h-44 lg:col-span-3 lg:row-span-2 lg:h-auto">
          <Photo slug="b737max-contrails" sizes="(min-width: 1024px) 25vw, 50vw" position="50% 35%" />
        </Tile>
        <Tile n="27" label="Toggle and chips" className="col-span-1 h-44 lg:col-span-3 lg:row-span-2 lg:h-auto">
          <div className="flex h-full flex-wrap items-center justify-center gap-3 p-4 text-sm">
            <span className="flex h-6 w-11 items-center rounded-full bg-[var(--blue)] p-0.5">
              <span className="ml-auto size-5 rounded-full bg-white" />
            </span>
            <span className="rounded-full bg-[var(--ink)] px-4 py-1.5 text-white">Wide-body</span>
            <span className="rounded-full px-4 py-1.5 ring-1 ring-[var(--haze)]">Narrow-body</span>
          </div>
        </Tile>
        <Tile n="28" label="Wayfinding sign" className="col-span-2 h-28 lg:col-span-3 lg:row-span-2 lg:h-auto">
          <div className="flex h-full flex-col justify-center gap-2 p-5">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-[var(--blue)]" aria-hidden>
                <PlaneIcon />
              </svg>
              <span className="text-lg font-semibold leading-tight">Gates 20–38</span>
              <svg viewBox="0 0 20 12" className="ml-auto h-3 w-5 shrink-0 text-[var(--blue)]" aria-hidden>
                <path d="M0 6h18m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </div>
            <div className="h-px bg-[var(--line)]" />
            <span className="text-sm text-[var(--muted)]">Departures · 6 min walk</span>
          </div>
        </Tile>
      </main>

      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1360px] px-5 py-10 sm:px-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Photo credits</h2>
          <PhotoCredits
            slugs={photos}
            className="mt-4 grid gap-1.5 text-xs leading-relaxed text-[var(--muted)] lg:grid-cols-2 lg:gap-x-10"
            linkClassName="underline decoration-[var(--haze)] underline-offset-2 hover:text-[var(--ink)] hover:decoration-[var(--blue)] focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
          />
        </div>
      </footer>
    </div>
  );
}
