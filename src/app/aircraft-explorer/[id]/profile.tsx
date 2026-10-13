"use client";

import { useState, type ReactNode } from "react";
import Photo from "@/components/Photo";
import SeatMap, { seatColors } from "@/components/SeatMap";
import { SkButton, SkDialog, SkTabs } from "@/components/ds/sky";
import { fmt, type Aircraft } from "@/lib/aircraft";
import { photo } from "@/lib/photos";
import type { CabinClass, GalleryCategory, Profile } from "@/lib/profiles";

// Tabbed profile for one aircraft: overview, photo gallery, cabin layout, engines and specs.

const TABS = ["Overview", "Gallery", "Cabin", "Engines & specs"] as const;

function Heading({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
      <h3 className="text-2xl font-light tracking-tight sm:text-3xl">{children}</h3>
      {note && <p className="text-sm text-[var(--sk-muted)]">{note}</p>}
    </div>
  );
}

function Overview({ a, p }: { a: Aircraft; p: Profile }) {
  return (
    <div className="flex flex-col gap-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-xl font-light leading-relaxed sm:text-2xl sm:leading-relaxed">{p.overview}</p>
        </div>
        <div className="lg:col-span-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sk-muted)]">History</h3>
          <ol className="mt-4 flex flex-col">
            {p.history.map((h) => (
              <li key={h.year} className="grid grid-cols-[72px_1fr] gap-4 border-t border-[var(--sk-border)] py-3.5">
                <span className="font-semibold tabular-nums">{h.year}</span>
                <span className="text-[var(--sk-muted)]">{h.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <section aria-labelledby="recognize">
        <Heading note="Visual clues for spotting it at the airport">
          <span id="recognize">How to recognize it</span>
        </Heading>
        <ol className="grid gap-5 md:grid-cols-3">
          {p.recognize.map((r, i) => (
            <li key={r.title} className="flex flex-col gap-3 rounded-[22px] bg-white p-6 ring-1 ring-[var(--sk-border)]">
              <span className="grid size-8 place-items-center rounded-full bg-[var(--sk-mist)] text-sm font-semibold text-[var(--sk-text)]">{i + 1}</span>
              <span className="text-lg font-semibold">{r.title}</span>
              <span className="leading-relaxed text-[var(--sk-muted)]">{r.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-12 lg:grid-cols-12">
        <section aria-labelledby="design" className="lg:col-span-7">
          <Heading>
            <span id="design">Design</span>
          </Heading>
          <ul className="flex flex-col">
            {p.design.map((d) => (
              <li key={d} className="flex gap-4 border-t border-[var(--sk-border)] py-4 leading-relaxed">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[var(--sk-control)]" />
                {d}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="service" className="lg:col-span-5">
          <Heading>
            <span id="service">In airline service</span>
          </Heading>
          <p className="leading-relaxed text-[var(--sk-muted)]">{p.operations}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sk-muted)]">Notable operators</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {p.operators.map((o) => (
              <li key={o} className="rounded-full bg-white px-3.5 py-1.5 text-sm ring-1 ring-[var(--sk-border)]">
                {o}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="facts" className="rounded-[28px] bg-[var(--sk-mist)] p-6 sm:p-10">
        <h3 id="facts" className="text-2xl font-light tracking-tight sm:text-3xl">
          Did you know?
        </h3>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {p.facts.map((f) => (
            <li key={f} className="leading-relaxed">
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-[var(--sk-muted)]">
          {a.manufacturer} {a.name} · figures rounded from manufacturer and public sources
        </p>
      </section>
    </div>
  );
}

function Gallery({ a, p }: { a: Aircraft; p: Profile }) {
  const cats = (["Exterior", "Cockpit", "Cabin", "Engines"] as GalleryCategory[]).filter((c) => p.gallery.some((g) => g.category === c));
  const [cat, setCat] = useState<string>("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = p.gallery.filter((g) => cat === "All" || g.category === cat).map((g) => ({ ...g, info: photo(g.slug) }));
  const current = open !== null ? items[open] : null;
  const step = (d: number) => setOpen((i) => (i === null ? null : (i + d + items.length) % items.length));
  const missing = (["Cockpit", "Cabin", "Engines"] as GalleryCategory[]).filter((c) => !cats.includes(c));

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SkTabs options={["All", ...cats]} value={cat} onChange={setCat} ariaLabel="Photo category" controls="gallery-grid" />
        <p className="text-sm text-[var(--sk-muted)]">
          {items.length} photo{items.length === 1 ? "" : "s"}
          {missing.length > 0 && ` · No reliable ${missing.join(" or ").toLowerCase()} photo of this model was available`}
        </p>
      </div>
      <ul id="gallery-grid" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {items.map((g, i) => (
          <li key={g.slug} className={i === 0 && cat === "All" ? "col-span-2 row-span-2" : ""}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-haspopup="dialog"
              aria-label={`View larger: ${g.info.caption}`}
              className="group relative block aspect-[4/3] h-full w-full overflow-hidden rounded-[18px] bg-[var(--sk-mist)] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent)] active:scale-[0.99]"
            >
              <Photo
                slug={g.slug}
                sizes={i === 0 && cat === "All" ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                large={i === 0 && cat === "All"}
                className="transition-transform duration-700 group-hover:scale-[1.04]"
                eager
              />
              <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[var(--sk-text)] backdrop-blur">
                {g.category}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <SkDialog open={!!current} onClose={() => setOpen(null)} labelledBy="lightbox-caption" className="max-w-5xl">
        {current && (
          <div
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") step(1);
              if (e.key === "ArrowLeft") step(-1);
            }}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
              <p className="text-sm text-[var(--sk-muted)]">
                <span className="font-semibold text-[var(--sk-text)]">{current.category}</span> · {open! + 1} of {items.length}
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close photo"
                className="grid size-10 place-items-center rounded-full bg-[var(--sk-mist)] transition hover:bg-[var(--sk-haze)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent)] active:scale-95"
              >
                <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="relative aspect-[3/2] bg-[#0f1520]">
              <Photo slug={current.slug} sizes="(min-width: 1024px) 1024px, 100vw" contain eager large />
            </div>
            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p id="lightbox-caption" className="font-semibold">
                  {current.info.caption}
                </p>
                <p className="mt-1 text-xs text-[var(--sk-muted)]">
                  Photo:{" "}
                  <a href={current.info.source} target="_blank" rel="noreferrer" className="underline decoration-[var(--sk-haze)] underline-offset-2 hover:text-[var(--sk-text)] focus-visible:outline-2 focus-visible:outline-[var(--sk-accent)]">
                    {current.info.author}
                  </a>
                  , {current.info.license}, via Wikimedia Commons
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <SkButton variant="secondary" onClick={() => step(-1)} aria-label="Previous photo">
                  ←
                </SkButton>
                <SkButton variant="secondary" onClick={() => step(1)} aria-label="Next photo">
                  →
                </SkButton>
              </div>
            </div>
          </div>
        )}
      </SkDialog>
      <p className="sr-only">{`${a.manufacturer} ${a.name} photo gallery`}</p>
    </div>
  );
}

function Cabin({ a, p }: { a: Aircraft; p: Profile }) {
  const classes = Array.from(new Map(p.decks.flatMap((d) => d.classes).map((c) => [`${c.name}-${c.layout}`, c])).values());
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-6 sm:grid-cols-3">
        {[
          ["Seating", p.seating],
          ["Cabin width (approx.)", p.cabinWidth],
          ["Decks", p.decks.length === 2 ? "Two full passenger decks" : "One passenger deck"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-[22px] bg-white p-5 ring-1 ring-[var(--sk-border)]">
            <p className="text-xs text-[var(--sk-muted)]">{k}</p>
            <p className="mt-1 leading-snug">{v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] bg-white p-5 ring-1 ring-[var(--sk-border)] sm:p-8">
        <div className="flex flex-col gap-10">
          {p.decks.map((d) => (
            <figure key={d.name}>
              <figcaption className="mb-3 flex items-baseline justify-between gap-4">
                <span className="font-semibold">{d.name}</span>
                <span className="text-xs text-[var(--sk-muted)]">
                  Nose at left<span className="sm:hidden"> · swipe to see the whole cabin →</span>
                </span>
              </figcaption>
              <div className="-mx-1 overflow-x-auto px-1 pb-1">
                <SeatMap
                  deck={d}
                  engines={a.engines}
                  wings={!d.name.startsWith("Upper")}
                  title={`${d.name} of the ${a.manufacturer} ${a.name}: ${d.classes.map((c) => `${c.name} ${c.layout}`).join(", ")}. Illustrative layout.`}
                />
              </div>
            </figure>
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--sk-border)] pt-6">
          {classes.map((c: CabinClass) => (
            <li key={`${c.name}-${c.layout}`} className="flex items-center gap-2.5 text-sm">
              <span aria-hidden className="size-3 rounded-[3px]" style={{ background: seatColors[c.name] }} />
              <span className="font-semibold">{c.name}</span>
              <span className="tabular-nums text-[var(--sk-muted)]">{c.layout} across</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2 text-sm text-[var(--sk-muted)]">
        <p className="font-semibold text-[var(--sk-text)]">Illustrative layout. Actual seating configurations vary by airline.</p>
        <p>Row counts are representative, not any airline’s seat map.{p.cabinNote ? ` ${p.cabinNote}` : ""}</p>
      </div>
    </div>
  );
}

function EnginesSpecs({ a, p }: { a: Aircraft; p: Profile }) {
  const enginePhotos = p.gallery.filter((g) => g.category === "Engines").slice(0, 2);
  const specs: [string, string, string?][] = [
    ["Range", `${fmt(a.rangeKm)} km`, "Maximum design range, approx."],
    ["Typical seats", `${a.seats}`, "Manufacturer figure; varies by configuration"],
    ["Length", `${a.lengthM} m`],
    ["Wingspan", `${a.spanM} m`],
    ["Height", `${p.heightM} m`, "Approx."],
    ["Max takeoff weight", `${a.mtowT} t`, "Highest certified option, approx."],
    ["Cabin width", p.cabinWidth, "Approx."],
    ["First flight", p.firstFlight],
    ["Entered service", `${a.firstService}`],
    ["Status", p.status],
  ];
  return (
    <div className="flex flex-col gap-16">
      <section aria-labelledby="engines">
        <Heading note={`${a.engines} engines per aircraft`}>
          <span id="engines">Engines</span>
        </Heading>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            {p.engines.map((e) => (
              <div key={e.model} className="rounded-[22px] bg-white p-6 ring-1 ring-[var(--sk-border)]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sk-muted)]">{e.maker}</p>
                <p className="mt-1 text-2xl font-light tracking-tight">{e.model}</p>
                <p className="mt-3 leading-relaxed text-[var(--sk-muted)]">{e.note}</p>
              </div>
            ))}
            {p.engines.length > 1 && <p className="text-sm text-[var(--sk-muted)]">Each airline chooses one engine type for its aircraft.</p>}
          </div>
          {enginePhotos.length > 0 && (
            <div className="grid gap-4">
              {enginePhotos.map((g) => (
                <figure key={g.slug}>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] bg-[var(--sk-mist)]">
                    <Photo slug={g.slug} sizes="(min-width: 1024px) 40vw, 100vw" eager />
                  </div>
                  <figcaption className="mt-2 text-xs text-[var(--sk-muted)]">{photo(g.slug).caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="specs">
        <Heading note="Rounded from manufacturer published data">
          <span id="specs">Specifications</span>
        </Heading>
        <dl className="grid overflow-hidden rounded-[22px] bg-white ring-1 ring-[var(--sk-border)] sm:grid-cols-2">
          {specs.map(([k, v, note]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 border-b border-[var(--sk-border)] px-5 py-4 sm:odd:border-r">
              <dt className="text-sm text-[var(--sk-muted)]">
                {k}
                {note && <span className="block text-xs">{note}</span>}
              </dt>
              <dd className="text-right text-lg font-light tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

export default function ProfileTabs({ a, p }: { a: Aircraft; p: Profile }) {
  const [tab, setTab] = useState<string>("Overview");
  return (
    <div>
      <div className="sticky top-0 z-10 -mx-5 mb-12 border-b border-[var(--sk-border)] bg-[var(--sk-bg)]/90 px-5 py-3 backdrop-blur sm:-mx-10 sm:px-10">
        <div className="overflow-x-auto">
          <SkTabs options={[...TABS]} value={tab} onChange={setTab} ariaLabel="Aircraft profile sections" controls="profile-panel" />
        </div>
      </div>
      <div id="profile-panel" role="tabpanel" aria-label={tab}>
        {tab === "Overview" && <Overview a={a} p={p} />}
        {tab === "Gallery" && <Gallery a={a} p={p} />}
        {tab === "Cabin" && <Cabin a={a} p={p} />}
        {tab === "Engines & specs" && <EnginesSpecs a={a} p={p} />}
      </div>
    </div>
  );
}
