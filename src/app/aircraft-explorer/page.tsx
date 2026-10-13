import Link from "next/link";
import Photo from "@/components/Photo";
import PhotoCredits from "@/components/PhotoCredits";
import { aircraft, fmt } from "@/lib/aircraft";
import { manrope } from "@/lib/fonts";
import type { PhotoSlug } from "@/lib/photos";
import { skyTokens } from "@/lib/tokens";
import Explorer from "./explorer";

export const metadata = {
  title: "Aircraft Explorer",
  description: "Discover eight modern commercial passenger aircraft from Airbus and Boeing, with photos and key specifications.",
};

const quietLink =
  "rounded-full px-3 py-1.5 text-sm text-[var(--sk-muted)] transition hover:bg-[var(--sk-mist)] hover:text-[var(--sk-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent)] active:bg-[var(--sk-haze)]";

const longest = Math.max(...aircraft.map((a) => a.rangeKm));

export default function AircraftExplorer() {
  return (
    <div style={skyTokens} className={`${manrope.className} min-h-full flex-1 bg-[var(--sk-bg)] text-[var(--sk-text)]`}>
      <header className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-5 sm:px-10">
        <Link href="/aircraft-explorer" className="-mx-2 flex items-center gap-2.5 rounded-full px-2 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent)]">
          <svg viewBox="0 0 24 24" className="size-5 rotate-45 fill-[var(--sk-text)]" aria-hidden>
            <path d="M21 15.5v-1.8l-7.6-4.8V3.8a1.4 1.4 0 0 0-2.8 0v5.1L3 13.7v1.8l7.6-2.3v4.9l-2 1.5v1.4l3.4-1 3.4 1v-1.4l-2-1.5v-4.9z" />
          </svg>
          <span className="font-semibold tracking-tight">Aircraft Explorer</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1">
          <a href="#fleet" className={`${quietLink} hidden sm:inline-block`}>
            Fleet
          </a>
          <a href="#about" className={`${quietLink} hidden sm:inline-block`}>
            About
          </a>
          <Link href="/" className={quietLink}>
            ← Hub
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section aria-labelledby="hero-title" className="mx-auto max-w-[1280px] px-5 pb-20 pt-10 sm:px-10 sm:pb-28 sm:pt-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h1 id="hero-title" className="text-5xl font-extralight leading-[1.02] tracking-[-0.035em] sm:text-7xl lg:col-span-7 lg:text-[88px]">
              Eight aircraft that carry the world.
            </h1>
            <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:pb-3">
              <p className="max-w-md text-lg leading-relaxed text-[var(--sk-muted)]">
                Explore today’s commercial passenger jets from Airbus and Boeing: how far they fly,
                how many they carry, and what makes each one different.
              </p>
              <a
                href="#fleet"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--sk-accent)] px-7 text-sm font-semibold text-white transition-[background-color,box-shadow,transform] hover:bg-[var(--sk-accent-hover)] hover:shadow-[0_6px_16px_-6px_rgba(47,111,176,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent)] active:scale-[0.97] active:bg-[var(--sk-accent-press)]"
              >
                Explore the fleet
                <span aria-hidden>↓</span>
              </a>
            </div>
          </div>

          <figure className="mt-12 sm:mt-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[var(--sk-mist)] sm:aspect-[16/9] lg:aspect-[21/9]">
              <Photo slug="b787-klm-clouds" sizes="(min-width: 1280px) 1200px, 100vw" preload position="50% 50%" />
            </div>
            <figcaption className="mt-3 text-xs text-[var(--sk-muted)]">Boeing 787-9, KLM, between cloud layers.</figcaption>
          </figure>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--sk-border)] pt-8 sm:gap-8">
            {[
              [`${aircraft.length}`, "aircraft"],
              ["2", "manufacturers"],
              [`${fmt(longest)} km`, "longest range"],
            ].map(([v, k]) => (
              <div key={k}>
                <dt className="sr-only">{k}</dt>
                <dd className="text-2xl font-extralight tracking-tight sm:text-4xl">{v}</dd>
                <dd className="mt-1 text-xs text-[var(--sk-muted)] sm:text-sm">{k}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Fleet */}
        <section id="fleet" aria-labelledby="fleet-title" className="scroll-mt-6 border-t border-[var(--sk-border)] bg-white">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-10 sm:py-28">
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="fleet-title" className="text-4xl font-extralight tracking-[-0.02em] sm:text-6xl">
                The fleet
              </h2>
              <p className="max-w-sm text-[var(--sk-muted)]">Choose an aircraft to see its full profile and specifications.</p>
            </div>
            <Explorer />
          </div>
        </section>

        {/* About */}
        <section id="about" aria-labelledby="about-title" className="scroll-mt-6 border-t border-[var(--sk-border)]">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-20 sm:px-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="about-title" className="text-3xl font-extralight tracking-[-0.02em]">
                About the data
              </h2>
            </div>
            <div className="flex flex-col gap-6 lg:col-span-8">
              <p className="max-w-2xl leading-relaxed text-[var(--sk-muted)]">
                Figures are rounded from manufacturer published specifications. Seats are typical
                layouts and range is the maximum design range, so real flights vary by airline and
                route. Everything here is stored locally; nothing is saved.
              </p>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sk-muted)]">Photography</h3>
                <PhotoCredits
                  slugs={["b787-klm-clouds", ...aircraft.map((a) => a.photo).filter((p): p is PhotoSlug => !!p)]}
                  className="mt-3 flex flex-col gap-1.5 text-xs leading-relaxed text-[var(--sk-muted)]"
                  linkClassName="underline decoration-[var(--sk-haze)] underline-offset-2 hover:text-[var(--sk-text)] hover:decoration-[var(--sk-accent)] focus-visible:outline-2 focus-visible:outline-[var(--sk-accent)]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--sk-border)]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-8 text-sm text-[var(--sk-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span>Aircraft Explorer · Design, Build, Ship, Assignment 2</span>
          <Link href="/" className={`${quietLink} -mx-3 self-start`}>
            ← Back to hub
          </Link>
        </div>
      </footer>
    </div>
  );
}
