import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import PhotoCredits from "@/components/PhotoCredits";
import { plexCondensed, plexMono } from "@/lib/fonts";
import type { PhotoSlug } from "@/lib/photos";

export const metadata = { title: "Cockpit Dark · Mood Board" };

const tokens = {
  "--void": "#070b13",
  "--panel": "#0c121d",
  "--raised": "#131b29",
  "--line": "#1c2636",
  "--text": "#dfe7f1",
  "--muted": "#9aa8bb",
  "--cyan": "#5fd4e6",
  "--magenta": "#e070d8",
  "--green": "#5fe08a",
  "--amber": "#f2b84b",
} as CSSProperties;

const photos: PhotoSlug[] = [
  "b787-flight-deck",
  "a350-cockpit",
  "night-landing",
  "trent-xwb-core",
  "hamad-terminal-night",
  "a380-cockpit",
  "dusk-departure",
  "a350-simulator",
];

// A display unit: hard edges, a mono ID strip, and corner ticks like a bezel.
function Unit({
  id,
  label,
  className,
  children,
}: {
  id: string;
  label: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <figure className={`relative flex flex-col bg-[var(--panel)] ${className}`}>
      <figcaption className="flex items-center justify-between px-3 py-2 font-cockpit text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
        <span>
          <span className="text-[var(--cyan)]">DU-{id}</span> {label}
        </span>
      </figcaption>
      <div className="relative flex-1 overflow-hidden">{children}</div>
      <span aria-hidden className="pointer-events-none absolute left-1 top-1 size-2 border-l border-t border-[var(--muted)]/50" />
      <span aria-hidden className="pointer-events-none absolute right-1 top-1 size-2 border-r border-t border-[var(--muted)]/50" />
      <span aria-hidden className="pointer-events-none absolute bottom-1 left-1 size-2 border-b border-l border-[var(--muted)]/50" />
      <span aria-hidden className="pointer-events-none absolute bottom-1 right-1 size-2 border-b border-r border-[var(--muted)]/50" />
    </figure>
  );
}

function Readout({ k, v, unit }: { k: string; v: string; unit?: string }) {
  return (
    <div className="flex items-baseline gap-2 font-cockpit text-xs">
      <span className="text-[var(--muted)]">{k}</span>
      <span className="flex-1 border-b border-dotted border-[var(--line)]" />
      <span className="text-[var(--text)]">{v}</span>
      {unit && <span className="w-6 text-[var(--muted)]">{unit}</span>}
    </div>
  );
}

export default function CockpitDarkBoard() {
  return (
    <div
      style={tokens}
      className={`${plexCondensed.className} ${plexMono.variable} min-h-full flex-1 bg-[var(--void)] text-[var(--text)]`}
    >
      <header className="border-b border-[var(--line)]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 font-cockpit text-[11px] uppercase tracking-[0.14em] sm:px-8">
          <Link
            href="/"
            className="-mx-2 px-2 py-1 text-[var(--muted)] transition hover:bg-[var(--raised)] hover:text-[var(--cyan)] focus-visible:outline-1 focus-visible:outline-[var(--cyan)] active:text-[var(--text)]"
          >
            ◂ Hub
          </Link>
          <span className="hidden text-[var(--muted)] sm:inline">
            Board <span className="text-[var(--text)]">02</span> / 03
          </span>
          <span className="flex items-center gap-2 text-[var(--green)]">
            <span className="size-1.5 rounded-full bg-[var(--green)]" /> 28 units · 8 photos
          </span>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1440px] gap-6 px-4 pb-8 pt-10 sm:px-8 sm:pt-12 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-8">
          <p className="font-cockpit text-xs uppercase tracking-[0.2em] text-[var(--cyan)]">Mood · Flight deck at night</p>
          <h1 className="mt-3 text-6xl font-light uppercase leading-[0.88] tracking-[0.02em] sm:text-8xl lg:text-[116px]">
            Cockpit
            <br />
            Dark
          </h1>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-[#c2cddb] lg:col-span-4 lg:pb-2">
          Deep navy glass, instruments that glow only where they need to, and color that always means
          something: <span className="text-[var(--cyan)]">cyan</span> is selectable,{" "}
          <span className="text-[var(--magenta)]">magenta</span> is the route,{" "}
          <span className="text-[var(--amber)]">amber</span> is caution.
        </p>
      </section>

      <main className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-8">
        <div className="grid grid-cols-2 gap-px border border-[var(--line)] bg-[var(--line)] lg:auto-rows-[76px] lg:grid-cols-12">
          {/* Band 1 */}
          <Unit id="01" label="787 flight deck" className="col-span-2 h-80 sm:h-[28rem] lg:col-span-8 lg:row-span-6 lg:h-auto">
            <Photo slug="b787-flight-deck" sizes="(min-width: 1024px) 66vw, 100vw" preload position="50% 55%" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,19,0.35),transparent_30%,transparent_70%,rgba(7,11,19,0.6))]" />
            <svg aria-hidden viewBox="0 0 800 480" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
              <path d="M30 30h40M30 30v40M770 30h-40M770 30v40M30 450h40M30 450v-40M770 450h-40M770 450v-40" />
            </svg>
            <div className="absolute inset-x-0 top-4 flex justify-center font-cockpit text-xs text-[var(--cyan)]">
              <span className="border border-[var(--cyan)] px-2 py-0.5">HDG 274</span>
            </div>
            <div className="absolute bottom-5 left-6 font-cockpit text-xs leading-relaxed sm:left-10">
              <div className="text-[var(--green)]">FL350 · M.85</div>
              <div className="text-[var(--muted)]">B787-9 · CRZ</div>
            </div>
          </Unit>

          <Unit id="02" label="Attitude" className="col-span-1 h-56 lg:col-span-4 lg:row-span-3 lg:h-auto">
            <svg viewBox="0 0 200 200" className="absolute inset-0 m-auto h-full w-full p-3" aria-hidden>
              <defs>
                <clipPath id="adi">
                  <circle cx="100" cy="100" r="78" />
                </clipPath>
              </defs>
              <g clipPath="url(#adi)">
                <g transform="rotate(-12 100 100) translate(0 8)">
                  <rect x="-60" y="-60" width="320" height="160" fill="#1d5f9e" />
                  <rect x="-60" y="100" width="320" height="160" fill="#6b4626" />
                  <path d="M-60 100h320" stroke="#fff" strokeWidth="1.5" />
                  {[-20, -10, 10, 20].map((p) => (
                    <g key={p} stroke="#fff" strokeWidth="1">
                      <path d={`M${p % 20 === 0 ? 75 : 86} ${100 - p * 2}h${p % 20 === 0 ? 50 : 28}`} />
                    </g>
                  ))}
                </g>
              </g>
              <circle cx="100" cy="100" r="78" fill="none" stroke="var(--line)" strokeWidth="2" />
              <path d="M58 100h26v8M142 100h-26v8" fill="none" stroke="var(--amber)" strokeWidth="4" />
              <rect x="97" y="97" width="6" height="6" fill="var(--amber)" />
              <path d="M100 14l-5 9h10z" fill="var(--text)" />
            </svg>
          </Unit>

          <Unit id="03" label="Color means something" className="col-span-1 h-56 lg:col-span-4 lg:row-span-3 lg:h-auto">
            <ul className="flex h-full flex-col justify-center gap-2 px-4 pb-4 font-cockpit text-xs">
              {[
                ["var(--cyan)", "Cyan", "Selected, editable"],
                ["var(--magenta)", "Magenta", "Route, targets"],
                ["var(--green)", "Green", "Active, engaged"],
                ["var(--amber)", "Amber", "Caution"],
                ["var(--text)", "White", "Data, scales"],
              ].map(([c, name, use]) => (
                <li key={name} className="flex items-center gap-3">
                  <span className="h-3 w-6 shrink-0" style={{ background: c }} />
                  <span style={{ color: c }} className="w-16">
                    {name}
                  </span>
                  <span className="hidden text-[var(--muted)] sm:inline">{use}</span>
                </li>
              ))}
            </ul>
          </Unit>

          {/* Band 2 */}
          <Unit id="04" label="Navigation display" className="col-span-2 h-72 lg:col-span-5 lg:row-span-4 lg:h-auto">
            <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full" aria-hidden>
              <g fill="none" stroke="var(--text)" strokeWidth="1">
                <path d="M60 240 A140 140 0 0 1 340 240" />
                {Array.from({ length: 13 }).map((_, i) => {
                  const a = (-150 + i * 10) * (Math.PI / 180);
                  const r1 = 140;
                  const r2 = i % 3 === 0 ? 128 : 134;
                  return <path key={i} d={`M${200 + r1 * Math.cos(a)} ${240 + r1 * Math.sin(a)}L${200 + r2 * Math.cos(a)} ${240 + r2 * Math.sin(a)}`} />;
                })}
              </g>
              <path d="M110 240 A90 90 0 0 1 290 240" fill="none" stroke="var(--cyan)" strokeDasharray="3 5" />
              {[
                ["27", -90],
                ["30", -60],
                ["24", -120],
              ].map(([t, deg]) => {
                const a = (Number(deg) * Math.PI) / 180;
                return (
                  <text key={t} x={200 + 116 * Math.cos(a)} y={244 + 116 * Math.sin(a)} textAnchor="middle" fontSize="12" fill="var(--text)" fontFamily="var(--font-plex-mono)">
                    {t}
                  </text>
                );
              })}
              <path d="M200 228 L232 160 L290 92" fill="none" stroke="var(--magenta)" strokeWidth="2" />
              {[
                [232, 160, "LOGAN"],
                [290, 92, "BOSOX"],
              ].map(([x, y, n]) => (
                <g key={String(n)}>
                  <path d={`M${x} ${Number(y) - 6}l6 6-6 6-6-6z`} fill="none" stroke="var(--magenta)" strokeWidth="1.5" />
                  <text x={Number(x) + 10} y={Number(y) + 4} fontSize="10" fill="var(--magenta)" fontFamily="var(--font-plex-mono)">
                    {n}
                  </text>
                </g>
              ))}
              <path d="M200 222l-9 18h18z" fill="none" stroke="var(--amber)" strokeWidth="2" />
              <text x="16" y="24" fontSize="11" fill="var(--text)" fontFamily="var(--font-plex-mono)">GS 488</text>
              <text x="16" y="40" fontSize="11" fill="var(--muted)" fontFamily="var(--font-plex-mono)">TAS 502</text>
              <text x="384" y="24" fontSize="11" fill="var(--magenta)" textAnchor="end" fontFamily="var(--font-plex-mono)">BOSOX</text>
              <text x="384" y="40" fontSize="11" fill="var(--text)" textAnchor="end" fontFamily="var(--font-plex-mono)">42 NM</text>
            </svg>
          </Unit>

          <Unit id="05" label="A350 glass" className="col-span-2 h-56 lg:col-span-4 lg:row-span-4 lg:h-auto">
            <Photo slug="a350-cockpit" sizes="(min-width: 1024px) 33vw, 100vw" />
          </Unit>

          <Unit id="06" label="Plex Sans Condensed" className="col-span-1 h-36 lg:col-span-3 lg:row-span-2 lg:h-auto">
            <div className="flex h-full flex-col justify-end px-4 pb-3">
              <span className="text-4xl font-light uppercase leading-none tracking-wide">B787-9</span>
              <span className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-[var(--muted)]">Light / Medium</span>
            </div>
          </Unit>

          <Unit id="07" label="Plex Mono, numbers" className="col-span-1 h-36 lg:col-span-3 lg:row-span-2 lg:h-auto">
            <div className="flex h-full flex-col justify-end px-4 pb-3 font-cockpit">
              <span className="text-2xl tabular-nums text-[var(--cyan)] sm:text-3xl">0123456789</span>
              <span className="mt-1 text-xs text-[var(--muted)]">FL350 · 14,010 KM · M.85</span>
            </div>
          </Unit>

          {/* Band 3 */}
          <Unit id="08" label="Night approach" className="col-span-2 h-56 lg:col-span-6 lg:row-span-4 lg:h-auto">
            <Photo slug="night-landing" sizes="(min-width: 1024px) 50vw, 100vw" position="50% 60%" />
          </Unit>

          <Unit id="09" label="Engine N1" className="col-span-1 h-36 lg:col-span-3 lg:row-span-2 lg:h-auto">
            <svg viewBox="0 0 200 90" className="absolute inset-0 h-full w-full px-2 pb-2" aria-hidden>
              {[50, 150].map((cx, i) => (
                <g key={cx}>
                  <path d={`M${cx - 34} 66 A34 34 0 1 1 ${cx + 30} 50`} fill="none" stroke="var(--text)" strokeWidth="1.5" />
                  <path d={`M${cx + 30} 50 A34 34 0 0 1 ${cx + 34} 62`} fill="none" stroke="var(--amber)" strokeWidth="2" />
                  <path d={`M${cx} 56 L${cx + 26} ${36 - i * 2}`} stroke="var(--green)" strokeWidth="2" />
                  <rect x={cx - 22} y="64" width="44" height="18" fill="none" stroke="var(--line)" />
                  <text x={cx} y="78" textAnchor="middle" fontSize="12" fill="var(--green)" fontFamily="var(--font-plex-mono)">
                    {i ? "92.6" : "92.4"}
                  </text>
                </g>
              ))}
            </svg>
          </Unit>

          <Unit id="10" label="Annunciators" className="col-span-1 h-36 lg:col-span-3 lg:row-span-2 lg:h-auto">
            <div className="grid h-full grid-cols-2 content-center gap-1.5 px-3 pb-3 font-cockpit text-[11px]">
              {["AP1", "A/THR", "LOC", "G/S"].map((a) => (
                <span key={a} className="border border-[var(--line)] py-1 text-center text-[var(--green)]">
                  {a}
                </span>
              ))}
              <span className="col-span-2 border border-[var(--amber)] py-1 text-center text-[var(--amber)]">MASTER CAUT</span>
            </div>
          </Unit>

          <Unit id="11" label="Phosphor scanlines" className="col-span-1 h-36 lg:col-span-3 lg:row-span-2 lg:h-auto">
            <div className="h-full bg-[repeating-linear-gradient(0deg,rgba(95,212,230,0.10)_0px,rgba(95,212,230,0.10)_1px,transparent_1px,transparent_4px),radial-gradient(circle_at_50%_60%,rgba(95,212,230,0.25),transparent_70%)]" />
          </Unit>

          <Unit id="12" label="Panel finish" className="col-span-1 h-36 lg:col-span-3 lg:row-span-2 lg:h-auto">
            <div className="h-full bg-[repeating-linear-gradient(90deg,#1a2230_0px,#141b27_2px,#1d2533_3px,#141b27_5px)]" />
          </Unit>

          {/* Band 4 */}
          <Unit id="13" label="Trent XWB core" className="col-span-1 h-64 lg:col-span-4 lg:row-span-5 lg:h-auto">
            <Photo slug="trent-xwb-core" sizes="(min-width: 1024px) 33vw, 50vw" />
          </Unit>

          <Unit id="14" label="Spec readout" className="col-span-1 h-64 lg:col-span-4 lg:row-span-5 lg:h-auto">
            <div className="flex h-full flex-col justify-between px-4 pb-4">
              <div>
                <div className="whitespace-nowrap text-xl font-light uppercase tracking-wide sm:text-2xl">Boeing 787-9</div>
                <div className="font-cockpit text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">Wide-body · Twin</div>
              </div>
              <div className="flex flex-col gap-2">
                <Readout k="RANGE" v="14,010" unit="KM" />
                <Readout k="SEATS" v="290" unit="TYP" />
                <Readout k="LENGTH" v="62.8" unit="M" />
                <Readout k="SPAN" v="60.1" unit="M" />
                <Readout k="MMO" v="0.90" unit="M" />
                <Readout k="CEILING" v="43,000" unit="FT" />
              </div>
            </div>
          </Unit>

          <Unit id="15" label="Terminal, after dark" className="col-span-2 h-52 lg:col-span-4 lg:row-span-3 lg:h-auto">
            <Photo slug="hamad-terminal-night" sizes="(min-width: 1024px) 33vw, 100vw" />
          </Unit>

          <Unit id="16" label="Hardware filter" className="col-span-2 h-28 lg:col-span-4 lg:row-span-2 lg:h-auto">
            <div className="flex h-full items-center justify-center px-4 pb-3">
              <div className="flex border border-[var(--line)] bg-[var(--void)] font-cockpit text-xs">
                {["ALL", "AIRBUS", "BOEING"].map((o, i) => (
                  <span
                    key={o}
                    className={`flex items-center gap-2 px-4 py-2.5 ${i === 1 ? "bg-[var(--raised)] text-[var(--cyan)]" : "text-[var(--muted)]"} ${i ? "border-l border-[var(--line)]" : ""}`}
                  >
                    <span className={`size-1.5 rounded-full ${i === 1 ? "bg-[var(--green)] shadow-[0_0_6px_var(--green)]" : "bg-[var(--line)]"}`} />
                    {o}
                  </span>
                ))}
              </div>
            </div>
          </Unit>

          {/* Band 5 */}
          <Unit id="17" label="Overhead buttons" className="col-span-2 h-40 lg:col-span-3 lg:row-span-3 lg:h-auto">
            <div className="flex h-full items-center justify-center gap-3 px-3 pb-3 font-cockpit text-[10px]">
              {[
                ["", "ON"],
                ["FAULT", ""],
                ["", "OFF"],
              ].map(([top, bottom], i) => (
                <span key={i} className="flex size-16 flex-col items-center justify-between border border-[#2a3446] bg-[#10161f] py-2 shadow-[inset_0_-2px_0_#05080d]">
                  <span className="text-[var(--amber)]">{top}</span>
                  <span className={bottom === "ON" ? "text-[var(--cyan)]" : "text-[var(--text)]"}>{bottom}</span>
                </span>
              ))}
            </div>
          </Unit>

          <Unit id="18" label="A380 cockpit" className="col-span-2 h-56 lg:col-span-5 lg:row-span-3 lg:h-auto">
            <Photo slug="a380-cockpit" sizes="(min-width: 1024px) 42vw, 100vw" />
          </Unit>

          <Unit id="19" label="Altitude tape" className="col-span-1 h-56 lg:col-span-2 lg:row-span-3 lg:h-auto">
            <div className="flex h-full justify-center px-3 pb-3 font-cockpit text-xs">
              <div className="relative flex w-20 flex-col justify-between border-x border-[var(--line)] bg-[#0f1828] py-2 pl-3 text-[var(--text)]">
                {["35400", "35200", "35000", "34800", "34600"].map((a) => (
                  <span key={a} className="flex items-center gap-1">
                    <span className="h-px w-2 bg-[var(--text)]" />
                    {a === "35000" ? "" : a}
                  </span>
                ))}
                <span className="absolute left-1 top-1/2 -translate-y-1/2 border border-[var(--text)] bg-[var(--void)] px-1.5 py-0.5 text-sm text-[var(--green)]">35000</span>
                <span className="absolute -right-2 top-[18%] h-[28%] w-1 bg-[var(--magenta)]" />
              </div>
            </div>
          </Unit>

          <Unit id="20" label="8 px grid" className="col-span-1 h-56 lg:col-span-2 lg:row-span-3 lg:h-auto">
            <div className="relative h-full bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:8px_8px]">
              <div className="absolute inset-0 bg-[linear-gradient(#2a3446_1px,transparent_1px),linear-gradient(90deg,#2a3446_1px,transparent_1px)] [background-size:40px_40px]" />
              <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-[var(--cyan)]" />
              <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-[var(--cyan)]" />
            </div>
          </Unit>

          {/* Band 6 */}
          <Unit id="21" label="Departure, last light" className="col-span-2 h-52 lg:col-span-7 lg:row-span-4 lg:h-auto">
            <Photo slug="dusk-departure" sizes="(min-width: 1024px) 58vw, 100vw" />
          </Unit>

          <Unit id="22" label="Flight profile" className="col-span-2 h-36 lg:col-span-5 lg:row-span-2 lg:h-auto">
            <svg viewBox="0 0 400 90" preserveAspectRatio="none" className="absolute inset-0 h-full w-full px-3 pb-3" aria-hidden>
              <defs>
                <linearGradient id="prof" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#5fd4e6" stopOpacity="0.25" />
                  <stop offset="1" stopColor="#5fd4e6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 80 L70 22 L320 22 L400 80 Z" fill="url(#prof)" />
              <path d="M0 80 L70 22 L320 22 L400 80" fill="none" stroke="var(--cyan)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path d="M70 22v58M320 22v58" stroke="var(--line)" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="absolute inset-x-0 bottom-3 flex justify-between px-4 font-cockpit text-[10px] text-[var(--muted)]">
              <span>KBOS</span>
              <span className="text-[var(--magenta)]">T/C · FL350 · T/D</span>
              <span>EGLL</span>
            </div>
          </Unit>

          <Unit id="23" label="Symbols" className="col-span-2 h-28 lg:col-span-5 lg:row-span-2 lg:h-auto">
            <svg viewBox="0 0 300 50" className="absolute inset-0 h-full w-full px-4 pb-3" fill="none" strokeWidth="1.5" aria-hidden>
              <path d="M30 14l-8 22h16z" stroke="var(--amber)" />
              <path d="M90 13l12 12-12 12-12-12z" stroke="var(--magenta)" />
              <path d="M150 15l10 6v10l-10 6-10-6V21z" stroke="var(--cyan)" />
              <circle cx="150" cy="26" r="2" fill="var(--cyan)" />
              <circle cx="210" cy="25" r="11" stroke="var(--text)" />
              <path d="M199 25h22" stroke="var(--text)" />
              <path d="M262 25h20M272 15v20" stroke="var(--green)" />
            </svg>
          </Unit>

          {/* Band 7 */}
          <Unit id="24" label="A350 simulator" className="col-span-2 h-52 lg:col-span-4 lg:row-span-3 lg:h-auto">
            <Photo slug="a350-simulator" sizes="(min-width: 1024px) 33vw, 100vw" />
          </Unit>

          <Unit id="25" label="Display layout" className="col-span-1 h-44 lg:col-span-4 lg:row-span-3 lg:h-auto">
            <div className="grid h-full grid-cols-[1fr_1fr_0.8fr] gap-2 px-4 pb-4 font-cockpit text-[10px] text-[var(--muted)]">
              {["PFD", "ND", "EICAS"].map((d, i) => (
                <div key={d} className={`flex items-end border p-1.5 ${i === 0 ? "border-[var(--cyan)] text-[var(--cyan)]" : "border-[var(--line)]"}`}>
                  {d}
                </div>
              ))}
            </div>
          </Unit>

          <Unit id="26" label="Aircraft card" className="col-span-1 h-44 lg:col-span-4 lg:row-span-3 lg:h-auto">
            <div className="flex h-full flex-col justify-between px-4 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xl font-medium uppercase tracking-wide">A350-900</div>
                  <div className="font-cockpit text-[10px] uppercase text-[var(--muted)]">Airbus · Twin-aisle</div>
                </div>
                <span className="border border-[var(--line)] px-1.5 py-0.5 font-cockpit text-[10px] text-[var(--green)]">IN SERVICE</span>
              </div>
              <div className="grid grid-cols-3 gap-2 font-cockpit text-[11px]">
                <span>
                  <span className="block text-[var(--muted)]">RNG</span>15,372
                </span>
                <span>
                  <span className="block text-[var(--muted)]">SEATS</span>325
                </span>
                <span>
                  <span className="block text-[var(--muted)]">SPAN</span>64.8
                </span>
              </div>
              <span className="font-cockpit text-[11px] text-[var(--cyan)]">DETAILS ▸</span>
            </div>
          </Unit>

          {/* Band 8 */}
          <Unit id="27" label="Palette · contrast on panel" className="col-span-2 h-40 lg:col-span-8 lg:row-span-2 lg:h-auto">
            <div className="grid h-full grid-cols-4 sm:grid-cols-8">
              {[
                ["#070B13", "Void", ""],
                ["#0C121D", "Panel", ""],
                ["#1C2636", "Line", "1.2"],
                ["#9AA8BB", "Muted", "7.5"],
                ["#DFE7F1", "Text", "15.0"],
                ["#5FD4E6", "Cyan", "10.8"],
                ["#E070D8", "Magenta", "6.7"],
                ["#F2B84B", "Amber", "10.5"],
              ].map(([c, n, r], i) => (
                <div key={c} className="flex flex-col justify-end p-2 font-cockpit text-[10px]" style={{ background: c, color: i < 3 ? "#dfe7f1" : "#070b13" }}>
                  <span>{n}</span>
                  <span className="opacity-70">{c}</span>
                  {r && <span>{r}:1</span>}
                </div>
              ))}
            </div>
          </Unit>

          <Unit id="28" label="Weather radar" className="col-span-2 h-40 lg:col-span-4 lg:row-span-2 lg:h-auto">
            <svg viewBox="0 0 300 110" className="absolute inset-0 h-full w-full px-3 pb-2" aria-hidden>
              <defs>
                <clipPath id="wx">
                  <path d="M150 104 L40 10 A150 150 0 0 1 260 10 Z" />
                </clipPath>
              </defs>
              <g clipPath="url(#wx)">
                <ellipse cx="96" cy="44" rx="34" ry="18" fill="#2f9e5b" opacity="0.75" />
                <ellipse cx="102" cy="46" rx="18" ry="9" fill="var(--amber)" opacity="0.85" />
                <ellipse cx="105" cy="46" rx="7" ry="4" fill="#e0524f" />
                <ellipse cx="214" cy="30" rx="26" ry="12" fill="#2f9e5b" opacity="0.6" />
                <ellipse cx="220" cy="31" rx="10" ry="5" fill="var(--amber)" opacity="0.7" />
              </g>
              <path d="M150 104 L40 10 M150 104 L260 10" stroke="var(--line)" />
              {[40, 75, 110].map((r) => (
                <path key={r} d={`M${150 - r * 0.76} ${104 - r * 0.65} A${r} ${r} 0 0 1 ${150 + r * 0.76} ${104 - r * 0.65}`} fill="none" stroke="var(--muted)" strokeDasharray="2 4" />
              ))}
              <path d="M150 104 L150 8" stroke="var(--magenta)" strokeWidth="1.5" />
              <path d="M150 98l-6 10h12z" fill="none" stroke="var(--amber)" strokeWidth="1.5" />
              <text x="8" y="100" fontSize="10" fill="var(--green)" fontFamily="var(--font-plex-mono)">WX+T</text>
              <text x="292" y="100" fontSize="10" fill="var(--muted)" textAnchor="end" fontFamily="var(--font-plex-mono)">80 NM</text>
            </svg>
          </Unit>
        </div>
      </main>

      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-8">
          <h2 className="font-cockpit text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">Photo credits</h2>
          <PhotoCredits
            slugs={photos}
            className="mt-4 grid gap-1.5 font-cockpit text-[11px] leading-relaxed text-[var(--muted)] lg:grid-cols-2 lg:gap-x-10"
            linkClassName="text-[var(--text)] underline decoration-[var(--line)] underline-offset-2 hover:text-[var(--cyan)] hover:decoration-[var(--cyan)] focus-visible:outline-1 focus-visible:outline-[var(--cyan)]"
          />
        </div>
      </footer>
    </div>
  );
}
