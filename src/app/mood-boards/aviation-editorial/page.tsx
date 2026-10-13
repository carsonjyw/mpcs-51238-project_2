import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import PhotoCredits from "@/components/PhotoCredits";
import { archivo, instrumentSerif, newsreader } from "@/lib/fonts";
import type { PhotoSlug } from "@/lib/photos";

export const metadata = { title: "Aviation Editorial · Mood Board" };

const tokens = {
  "--paper": "#f3ede2",
  "--paper-deep": "#e7dccb",
  "--ink": "#1b2742",
  "--text": "#2a2723",
  "--muted": "#675f55",
  "--rust": "#a4532f",
  "--brass": "#b08a5a",
  "--rule": "#cfc3b0",
} as CSSProperties;

const photos: PhotoSlug[] = [
  "b777-greenland-sunrise",
  "dulles-terminal-1963",
  "b777-aeroflot-sunset",
  "trent-xwb-intake",
  "ge90-intake",
  "barajas-ceiling",
  "b787-qantas-livery",
  "sunset-silhouette",
  "landing-sunset",
  "contrails-sunset",
  "terminal-suvarnabhumi-dusk",
  "a320neo-haze",
  "b747-8-retro",
];

// Print-style figure caption: a rust figure number, then a short line.
function Fig({ n, children, className = "" }: { n: string; children: ReactNode; className?: string }) {
  return (
    <figcaption className={`mt-2.5 flex gap-2 font-label text-[11px] uppercase tracking-[0.12em] text-[var(--muted)] ${className}`}>
      <span className="shrink-0 text-[var(--rust)]">Fig. {n}</span>
      <span>{children}</span>
    </figcaption>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return <p className="font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--rust)]">{children}</p>;
}

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.16 0 0 0 0 0.14 0 0 0 0 0.12 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function AviationEditorialBoard() {
  return (
    <div
      style={tokens}
      className={`${instrumentSerif.variable} ${newsreader.variable} ${archivo.variable} min-h-full flex-1 bg-[var(--paper)] font-text text-[var(--text)]`}
    >
      {/* Masthead */}
      <header className="mx-auto max-w-[1320px] px-5 pt-6 sm:px-10">
        <div className="flex items-center justify-between border-b border-[var(--text)] pb-3 font-label text-[11px] uppercase tracking-[0.16em]">
          <Link
            href="/"
            className="-mx-1 px-1 underline-offset-4 transition hover:text-[var(--rust)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--rust)] active:text-[var(--ink)]"
          >
            ← Hub
          </Link>
          <span className="hidden sm:inline">Mood board · No. 3 of 3</span>
          <span>28 artifacts</span>
        </div>
        <h1 className="py-8 text-center font-display text-[17vw] leading-[0.85] tracking-[-0.02em] text-[var(--ink)] sm:py-10 lg:text-[188px]">
          Aviation <em className="text-[var(--rust)]">Editorial</em>
        </h1>
        <div className="flex flex-col gap-1 border-y border-[var(--text)] py-2 text-center font-label text-[11px] uppercase tracking-[0.16em] sm:flex-row sm:justify-between sm:text-left">
          <span>Strong photography · Expressive type · Warm paper</span>
          <span className="text-[var(--muted)]">Autumn 2026</span>
        </div>
      </header>

      <main className="mx-auto max-w-[1320px] px-5 pb-24 sm:px-10">
        {/* Cover */}
        <figure className="mt-10">
          <div className="relative h-[70vh] min-h-[420px] overflow-hidden bg-[var(--ink)] lg:h-[760px]">
            <Photo slug="b777-greenland-sunrise" sizes="100vw" preload position="50% 40%" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(14,20,36,0.75))]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-[#f6efe3] sm:p-12">
              <p className="font-label text-[11px] font-semibold uppercase tracking-[0.2em]">Cover story</p>
              <p className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
                Above Greenland, <em>at first light</em>
              </p>
              <p className="mt-4 max-w-xl text-lg italic leading-snug opacity-90">
                What the 777-300ER changed about crossing oceans on two engines.
              </p>
            </div>
          </div>
          <Fig n="01">The cover: one photograph, one headline, nothing else</Fig>
        </figure>

        {/* Spread: contents, archive photo, opening text */}
        <section className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-0">
          <figure className="lg:col-span-3 lg:pr-8">
            <p className="font-display text-4xl text-[var(--ink)]">Contents</p>
            <ol className="mt-5 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
              {[
                ["04", "The twin-engine century"],
                ["18", "Carbon and quiet: the A350"],
                ["32", "Inside the Saarinen terminal"],
                ["46", "The last of the 747s"],
                ["58", "By the numbers"],
              ].map(([pg, t]) => (
                <li key={pg} className="flex items-baseline gap-4 py-2.5">
                  <span className="w-6 font-label text-xs text-[var(--rust)]">{pg}</span>
                  <span className="text-[17px] leading-snug">{t}</span>
                </li>
              ))}
            </ol>
            <Fig n="02">Contents page</Fig>
          </figure>

          <figure className="lg:col-span-5 lg:border-x lg:border-[var(--rule)] lg:px-8">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Photo slug="dulles-terminal-1963" sizes="(min-width: 1024px) 40vw, 100vw" className="grayscale" />
            </div>
            <p className="mt-3 text-[15px] italic leading-snug text-[var(--muted)]">
              Dulles, about 1963. A terminal drawn as one continuous gesture, the roof hung like a
              wing between its columns.
            </p>
            <Fig n="03">Archive photograph, caption in italic</Fig>
          </figure>

          <figure className="lg:col-span-4 lg:pl-8">
            <Kicker>Essay</Kicker>
            <p className="mt-3 font-display text-4xl leading-[1.02] text-[var(--ink)]">The twin-engine century</p>
            <p className="mt-2 font-label text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">Words by the editors · 8 min read</p>
            <p className="mt-5 text-[17px] leading-[1.6] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-display first-letter:text-[74px] first-letter:leading-[0.8] first-letter:text-[var(--rust)]">
              When the 777 entered service in 1995, few expected a twin to take over the long routes
              flown by four-engine jets. Thirty years later, the long-haul fleet is built around two
              large engines and a wing tuned for efficiency rather than spectacle.
            </p>
            <Fig n="04">Opening paragraph, drop cap</Fig>
          </figure>
        </section>

        {/* Pull quote */}
        <figure className="mt-16 border-y-2 border-[var(--ink)] py-10 text-center sm:py-14">
          <blockquote className="mx-auto max-w-4xl font-display text-4xl leading-[1.05] text-[var(--ink)] sm:text-6xl">
            “The best airliners are the ones <em className="text-[var(--rust)]">nobody on board</em> thinks about.”
          </blockquote>
          <Fig n="05" className="justify-center">Pull quote, set across the full measure</Fig>
        </figure>

        {/* Type and color */}
        <section className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <figure className="lg:col-span-7">
            <div className="flex flex-col gap-6 border-t border-[var(--text)] pt-5 sm:flex-row sm:items-end sm:justify-between">
              <span className="pb-6 font-display text-[150px] leading-[0.8] text-[var(--ink)] sm:pb-8 sm:text-[200px]">
                A<em>g</em>
              </span>
              <dl className="grid gap-3 text-sm sm:text-right">
                <div>
                  <dt className="font-label text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">Display</dt>
                  <dd className="font-display text-2xl">Instrument Serif</dd>
                </div>
                <div>
                  <dt className="font-label text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">Text</dt>
                  <dd className="text-xl">Newsreader, <em>with italics</em></dd>
                </div>
                <div>
                  <dt className="font-label text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">Labels</dt>
                  <dd className="font-label text-base font-semibold uppercase tracking-[0.14em]">Archivo</dd>
                </div>
              </dl>
            </div>
            <Fig n="06">Three faces: display, text, label</Fig>
          </figure>

          <figure className="lg:col-span-5">
            <div className="grid grid-cols-3 border-t border-[var(--text)] pt-5 sm:grid-cols-6 lg:grid-cols-3">
              {[
                ["#f3ede2", "Paper"],
                ["#e7dccb", "Newsprint"],
                ["#b08a5a", "Brass"],
                ["#a4532f", "Rust"],
                ["#1b2742", "Ink navy"],
                ["#2a2723", "Press black"],
              ].map(([c, n], i) => (
                <div key={c} className="flex h-24 flex-col justify-end p-2.5 font-label text-[10px] uppercase tracking-[0.1em]" style={{ background: c, color: i < 3 ? "#2a2723" : "#f3ede2" }}>
                  <span className="font-semibold">{n}</span>
                  <span className="opacity-75">{c}</span>
                </div>
              ))}
            </div>
            <Fig n="07">Palette, printed on paper</Fig>
          </figure>
        </section>

        {/* Feature spread */}
        <section className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <figure className="lg:col-span-8">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Photo slug="b777-aeroflot-sunset" sizes="(min-width: 1024px) 66vw, 100vw" />
            </div>
            <Fig n="08">Feature photograph, full column width</Fig>
          </figure>
          <figure className="flex flex-col lg:col-span-4">
            <div className="flex-1 bg-[var(--ink)] p-6 text-[#f3ede2] sm:p-8">
              <p className="font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--brass)]">By the numbers · 777-300ER</p>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
                {[
                  ["13,650", "km range"],
                  ["396", "seats, typical"],
                  ["73.9", "metres long"],
                  ["115,300", "lbf per engine"],
                ].map(([v, k]) => (
                  <div key={k} className="border-t border-[#f3ede2]/25 pt-2">
                    <dd className="font-display text-4xl leading-none sm:text-5xl">{v}</dd>
                    <dt className="mt-1 text-sm italic opacity-80">{k}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <Fig n="09">Sidebar, figures set in display serif</Fig>
          </figure>
        </section>

        {/* Engines and architecture */}
        <section className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-12 lg:gap-8">
          <figure className="col-span-1 lg:col-span-4">
            <div className="relative aspect-square overflow-hidden">
              <Photo slug="trent-xwb-intake" sizes="(min-width: 1024px) 33vw, 50vw" />
            </div>
            <Fig n="10">Trent XWB, A350</Fig>
          </figure>
          <figure className="col-span-1 lg:col-span-4">
            <div className="relative aspect-square overflow-hidden">
              <Photo slug="ge90-intake" sizes="(min-width: 1024px) 33vw, 50vw" />
            </div>
            <Fig n="11">GE90, 777-300ER</Fig>
          </figure>
          <figure className="col-span-2 lg:col-span-4 lg:row-span-2">
            <div className="relative aspect-[3/4] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[640px]">
              <Photo slug="barajas-ceiling" sizes="(min-width: 1024px) 33vw, 100vw" />
            </div>
            <Fig n="12">Barajas T4, looking up</Fig>
          </figure>
          <figure className="col-span-2 lg:col-span-8">
            <div className="grid gap-6 border-t border-[var(--text)] pt-5 sm:grid-cols-[auto_1fr] sm:items-end">
              <span className="font-display text-[120px] leading-[0.8] text-[var(--rust)] sm:text-[160px]">II</span>
              <div>
                <Kicker>Part two</Kicker>
                <p className="mt-2 font-display text-5xl leading-none text-[var(--ink)] sm:text-6xl">
                  The engines <em>that made it possible</em>
                </p>
              </div>
            </div>
            <Fig n="13">Section opener, roman numeral</Fig>
          </figure>
        </section>

        {/* Panorama with headline */}
        <figure className="mt-16">
          <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[21/9]">
            <Photo slug="sunset-silhouette" sizes="100vw" />
            <p className="absolute left-6 top-6 max-w-md font-display text-3xl leading-none text-[#f6efe3] sm:left-12 sm:top-12 sm:text-6xl">
              Last light, <em>westbound</em>
            </p>
          </div>
          <Fig n="14">Headline set into the sky of a photograph</Fig>
        </figure>

        {/* Photo essay strip */}
        <section className="mt-16 grid gap-5 sm:grid-cols-3">
          {(
            [
              ["15", "landing-sunset", "Arrival, Malé"],
              ["16", "b787-qantas-livery", "787-9 in a heritage livery"],
              ["17", "terminal-suvarnabhumi-dusk", "Bangkok, blue hour"],
            ] as const
          ).map(([n, slug, cap]) => (
            <figure key={n}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Photo slug={slug} sizes="(min-width: 640px) 33vw, 100vw" />
              </div>
              <Fig n={n}>{cap}</Fig>
            </figure>
          ))}
        </section>

        {/* Texture, ornament, ephemera */}
        <section className="mt-16 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-8">
          <figure>
            <div className="aspect-square bg-[var(--paper-deep)]" style={{ backgroundImage: grain }} />
            <Fig n="18">Paper grain</Fig>
          </figure>
          <figure>
            <div className="aspect-square bg-[var(--paper)] bg-[radial-gradient(var(--ink)_32%,transparent_34%)] [background-size:7px_7px] [mask-image:linear-gradient(135deg,black,transparent_85%)]" />
            <Fig n="19">Halftone</Fig>
          </figure>
          <figure>
            <div className="flex aspect-square flex-col justify-center gap-4 border border-[var(--rule)] px-6">
              <span className="h-[2px] bg-[var(--ink)]" />
              <span className="h-px bg-[var(--ink)]" />
              <span className="flex items-center gap-3 text-[var(--rust)]">
                <span className="h-px flex-1 bg-[var(--rule)]" />✈<span className="h-px flex-1 bg-[var(--rule)]" />
              </span>
              <span className="h-px border-t border-dashed border-[var(--muted)]" />
              <span className="text-center font-display text-2xl text-[var(--rust)]">❧</span>
            </div>
            <Fig n="20">Rules and ornaments</Fig>
          </figure>
          <figure>
            <div className="flex aspect-square items-center justify-center bg-[var(--paper-deep)] p-5">
              <div className="relative w-full max-w-[200px] rotate-[-4deg] rounded-sm bg-[#efe3cc] p-4 shadow-[0_1px_0_#cfc3b0,0_8px_20px_-12px_rgba(42,39,35,0.5)]">
                <span className="absolute right-3 top-3 size-3 rounded-full border border-[var(--rule)] bg-[var(--paper-deep)]" />
                <p className="font-label text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">Baggage · Priority</p>
                <p className="font-display text-6xl leading-none text-[var(--ink)]">SIN</p>
                <p className="text-xs italic">Singapore Changi</p>
                <div className="mt-3 h-8 bg-[repeating-linear-gradient(90deg,var(--text)_0_2px,transparent_2px_4px,var(--text)_4px_5px,transparent_5px_8px)]" />
              </div>
            </div>
            <Fig n="21">Ephemera: baggage tag</Fig>
          </figure>
        </section>

        {/* Contrails, grid, UI ideas */}
        <section className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <figure className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Photo slug="contrails-sunset" sizes="(min-width: 1024px) 42vw, 100vw" />
            </div>
            <Fig n="22">Contrails, used as a quiet opener</Fig>
          </figure>
          <figure className="lg:col-span-7">
            <div className="grid aspect-[16/10] grid-cols-12 gap-1.5 border border-[var(--rule)] p-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="row-start-1 h-full bg-[var(--rust)]/[0.07]" style={{ gridColumnStart: i + 1 }} />
              ))}
              <span className="col-span-7 col-start-1 row-start-1 m-0 bg-[var(--ink)]/80" />
              <span className="col-span-4 col-start-9 row-start-1 flex flex-col gap-1.5 py-1">
                <span className="h-5 w-4/5 bg-[var(--ink)]" />
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="h-1 bg-[var(--muted)]/40" style={{ width: i % 4 === 3 ? "60%" : "100%" }} />
                ))}
              </span>
            </div>
            <Fig n="23">Spread grid: 12 columns, image on seven, text on four</Fig>
          </figure>
        </section>

        <section className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <figure className="lg:col-span-4">
            <article className="border-t-2 border-[var(--ink)] pt-4">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Photo slug="a320neo-haze" sizes="(min-width: 1024px) 33vw, 50vw" position="45% 55%" />
              </div>
              <p className="mt-4 font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--rust)]">Airbus · A320neo</p>
              <p className="mt-1 font-display text-3xl leading-tight text-[var(--ink)]">The quiet best-seller</p>
              <p className="mt-2 text-[15px] leading-snug text-[var(--muted)]">The single-aisle that flies most short hops, re-engined to burn less and sound softer.</p>
              <p className="mt-3 font-label text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink)] underline decoration-[var(--rust)] decoration-2 underline-offset-4">
                Read the profile
              </p>
            </article>
            <Fig n="24">Story card for one aircraft</Fig>
          </figure>

          <figure className="lg:col-span-4">
            <div className="border-t-2 border-[var(--ink)] pt-4">
              <p className="font-label text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">Filter the archive</p>
              <p className="mt-3 font-display text-4xl leading-tight text-[var(--muted)]">
                <span className="text-[var(--ink)] underline decoration-[var(--rust)] decoration-2 underline-offset-[6px]">All</span> / Airbus / Boeing
              </p>
              <p className="mt-6 font-label text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">Sort</p>
              <p className="mt-2 text-lg italic">by range, by year, by name</p>
            </div>
            <Fig n="25">Filters set as type, not buttons</Fig>
          </figure>

          <figure className="sm:col-span-2 lg:col-span-4">
            <div className="relative aspect-[3/2] overflow-hidden border-t-2 border-[var(--ink)] lg:aspect-auto lg:h-[calc(100%-2rem)]">
              <Photo slug="b747-8-retro" sizes="(min-width: 1024px) 33vw, 100vw" position="40% 60%" />
            </div>
            <Fig n="26">The last jumbo, in 1970s colours</Fig>
          </figure>
        </section>

        <section className="mt-16 grid gap-10 sm:grid-cols-2 lg:gap-8">
          <figure>
            <div className="flex flex-col gap-4 border-t-2 border-[var(--ink)] pt-5 sm:flex-row sm:items-center">
              <span className="bg-[var(--ink)] px-6 py-3.5 text-center font-label text-xs font-semibold uppercase tracking-[0.16em] text-[#f3ede2]">Explore the fleet</span>
              <span className="px-2 py-3.5 text-center font-label text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink)] underline decoration-[var(--rust)] decoration-2 underline-offset-4">Subscribe to the issue</span>
            </div>
            <Fig n="27">One solid action, one underlined</Fig>
          </figure>
          <figure>
            <div className="relative flex aspect-[16/9] flex-col justify-between bg-[#f7f0e3] p-5 shadow-[0_1px_0_var(--rule),0_14px_30px_-20px_rgba(42,39,35,0.5)] sm:p-6">
              <div aria-hidden className="absolute inset-0 border-[7px] border-transparent [border-image:repeating-linear-gradient(135deg,var(--rust)_0_12px,transparent_12px_20px,var(--ink)_20px_32px,transparent_32px_40px)_7]" />
              <div className="flex items-start justify-between">
                <p className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)]">Par avion · By air mail</p>
                <div className="flex items-start gap-2">
                  <svg viewBox="0 0 60 60" className="size-12 -rotate-12 text-[var(--muted)] sm:size-14" aria-hidden>
                    <circle cx="30" cy="30" r="26" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="30" cy="30" r="19" fill="none" stroke="currentColor" strokeWidth="0.8" />
                    <text x="30" y="27" textAnchor="middle" fontSize="7" fill="currentColor" fontFamily="var(--font-archivo)">JFK</text>
                    <text x="30" y="37" textAnchor="middle" fontSize="6" fill="currentColor" fontFamily="var(--font-archivo)">13 OCT</text>
                  </svg>
                  <div className="grid size-14 place-items-center border-2 border-dotted border-[var(--rust)] bg-[var(--ink)] sm:size-16">
                    <svg viewBox="0 0 24 24" className="size-8 fill-[#f3ede2]" aria-hidden>
                      <path d="M21 15.5v-1.8l-7.6-4.8V3.8a1.4 1.4 0 0 0-2.8 0v5.1L3 13.7v1.8l7.6-2.3v4.9l-2 1.5v1.4l3.4-1 3.4 1v-1.4l-2-1.5v-4.9z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="ml-auto w-3/5 font-display text-lg leading-snug text-[var(--ink)] sm:text-xl">
                <p>The Editors</p>
                <p className="italic">Aviation Editorial</p>
                <p>Hangar 7, Long Haul Way</p>
              </div>
            </div>
            <Fig n="28">Ephemera: airmail envelope</Fig>
          </figure>
        </section>
      </main>

      <footer className="border-t border-[var(--text)]">
        <div className="mx-auto max-w-[1320px] px-5 py-10 sm:px-10">
          <h2 className="font-label text-[11px] font-semibold uppercase tracking-[0.16em]">Photo credits</h2>
          <PhotoCredits
            slugs={photos}
            className="mt-4 grid gap-1.5 text-[13px] leading-relaxed text-[var(--muted)] lg:grid-cols-2 lg:gap-x-10"
            linkClassName="text-[var(--text)] underline decoration-[var(--rule)] underline-offset-2 hover:decoration-[var(--rust)] focus-visible:outline-2 focus-visible:outline-[var(--rust)]"
          />
        </div>
      </footer>
    </div>
  );
}
