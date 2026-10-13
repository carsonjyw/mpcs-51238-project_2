import Link from "next/link";
import Photo from "@/components/Photo";
import PhotoCredits from "@/components/PhotoCredits";
import { aircraft, fmt } from "@/lib/aircraft";
import type { PhotoSlug } from "@/lib/photos";
import SiteChrome from "./chrome";
import Explorer from "./explorer";

export const metadata = {
  title: "Aircraft Explorer",
  description: "Discover the aircraft that connect our world: eight modern Airbus and Boeing airliners, with photos, cabin layouts, engines, and specifications.",
};

const ranges = aircraft.map((a) => a.rangeKm);
const seats = aircraft.map((a) => a.seats);
const byService = [...aircraft].sort((x, y) => x.firstService - y.firstService);

export default function AircraftExplorer() {
  return (
    <SiteChrome>
      <main>
        {/* Hero */}
        <section aria-labelledby="hero-title" className="mx-auto max-w-[1280px] px-5 pb-20 pt-8 sm:px-10 sm:pb-24 sm:pt-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--sk-muted)]">A guide to modern commercial aircraft</p>
              <h1 id="hero-title" className="mt-5 text-[44px] font-extralight uppercase leading-[0.95] tracking-[0.04em] sm:text-7xl lg:text-[88px]">
                Aircraft
                <br />
                Explorer
              </h1>
              <p className="mt-6 max-w-xl text-2xl font-light leading-snug tracking-tight sm:text-3xl">Discover the aircraft that connect our world.</p>
            </div>
            <div className="flex flex-col gap-8 lg:col-span-5 lg:pb-2">
              <p className="max-w-md leading-relaxed text-[var(--sk-muted)]">
                Eight Airbus and Boeing airliners, from the short-haul A320neo to the double-deck A380. Each
                profile covers its history, how to recognize it, its engines, an illustrative cabin layout,
                and a photo gallery.
              </p>
              <dl className="grid grid-cols-3 gap-4 border-t border-[var(--sk-border)] pt-5">
                {[
                  [`${aircraft.length}`, "aircraft"],
                  [`${fmt(Math.max(...ranges))} km`, "longest range"],
                  [`${Math.min(...seats)}–${Math.max(...seats)}`, "typical seats"],
                ].map(([v, k]) => (
                  <div key={k}>
                    <dt className="sr-only">{k}</dt>
                    <dd className="text-lg font-light tabular-nums tracking-tight sm:text-2xl">{v}</dd>
                    <dd className="mt-0.5 text-xs text-[var(--sk-muted)]">{k}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="#fleet"
                className="inline-flex h-12 items-center gap-2 self-start rounded-full bg-[var(--sk-accent)] px-7 text-sm font-semibold text-white transition-[background-color,box-shadow,transform] hover:bg-[var(--sk-accent-hover)] hover:shadow-[0_6px_16px_-6px_rgba(47,111,176,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent)] active:scale-[0.97] active:bg-[var(--sk-accent-press)]"
              >
                Explore the fleet
                <span aria-hidden>↓</span>
              </a>
            </div>
          </div>

          <figure className="mt-12 sm:mt-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[var(--sk-mist)] sm:aspect-[16/8] lg:aspect-[21/9]">
              <Photo slug="a380-emirates-eer" sizes="(min-width: 1280px) 1200px, 100vw" preload large position="50% 45%" />
            </div>
            <figcaption className="mt-3 text-xs text-[var(--sk-muted)]">Airbus A380, Emirates, climbing out of Munich.</figcaption>
          </figure>

          {/* Collection index */}
          <nav aria-labelledby="collection-title" className="mt-14">
            <h2 id="collection-title" className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sk-muted)]">
              The collection, by year of entry into service
            </h2>
            <ol className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] bg-[var(--sk-border)] ring-1 ring-[var(--sk-border)] sm:grid-cols-4">
              {byService.map((a) => (
                <li key={a.id} className="bg-white">
                  <Link
                    href={`/aircraft-explorer/${a.id}`}
                    className="group flex h-full flex-col gap-1 p-4 transition-colors hover:bg-[var(--sk-mist)] focus-visible:relative focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--sk-accent)] active:bg-[var(--sk-haze)] sm:p-5"
                  >
                    <span className="text-xs tabular-nums text-[var(--sk-muted)]">
                      {a.firstService} · {a.manufacturer}
                    </span>
                    <span className="text-lg font-light tracking-tight group-hover:text-[var(--sk-accent)]">{a.name}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        {/* Fleet */}
        <section id="fleet" aria-labelledby="fleet-title" className="scroll-mt-6 border-t border-[var(--sk-border)] bg-white">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-10 sm:py-24">
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="fleet-title" className="text-4xl font-extralight tracking-[-0.02em] sm:text-6xl">
                The fleet
              </h2>
              <p className="max-w-sm text-[var(--sk-muted)]">Open any aircraft for its full profile, photo gallery, cabin layout, and engines.</p>
            </div>
            <Explorer />
          </div>
        </section>

        {/* About */}
        <section id="about" aria-labelledby="about-title" className="scroll-mt-6 border-t border-[var(--sk-border)]">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-20 sm:px-10 lg:grid-cols-12">
            <h2 id="about-title" className="text-3xl font-extralight tracking-[-0.02em] lg:col-span-4">
              About the data
            </h2>
            <div className="flex flex-col gap-6 lg:col-span-8">
              <p className="max-w-2xl leading-relaxed text-[var(--sk-muted)]">
                Figures are rounded from manufacturer published specifications. Seats are typical layouts
                and range is the maximum design range, so real flights vary by airline and route. Cabin
                diagrams are illustrative, not airline seat maps. Everything is stored locally; nothing is saved.
              </p>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sk-muted)]">Photography on this page</h3>
                <PhotoCredits
                  slugs={["a380-emirates-eer", ...aircraft.map((a) => a.photo).filter((p): p is PhotoSlug => !!p)]}
                  className="mt-3 flex flex-col gap-1.5 text-xs leading-relaxed text-[var(--sk-muted)]"
                  linkClassName="underline decoration-[var(--sk-haze)] underline-offset-2 hover:text-[var(--sk-text)] hover:decoration-[var(--sk-accent)] focus-visible:outline-2 focus-visible:outline-[var(--sk-accent)]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
