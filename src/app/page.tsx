import Link from "next/link";
import { site, styles } from "@/lib/styles";

const cardClass =
  "group flex flex-col rounded-lg border p-5 transition " +
  "hover:border-foreground/40 hover:-translate-y-0.5 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground " +
  "active:translate-y-0 active:border-foreground";

function SectionHeading({ id, index, title, note }: { id: string; index: string; title: string; note: string }) {
  return (
    <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
      <h2 id={id} className="flex items-baseline gap-3 text-sm font-semibold uppercase tracking-[0.14em]">
        <span className="font-mono text-muted">{index}</span>
        {title}
      </h2>
      <p className="text-sm text-muted">{note}</p>
    </div>
  );
}

function Arrow() {
  return (
    <span aria-hidden className="transition-transform group-hover:translate-x-1">
      →
    </span>
  );
}

export default function Hub() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 sm:px-8 sm:py-20">
      <header className="mb-14 sm:mb-20">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          Design, Build, Ship · Assignment 2 · UI/UX &amp; Visual Design
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{site.name}</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Three visual directions for a site about commercial aircraft: a mood board and a
          design system for each, and the finished site in the chosen style.
        </p>
      </header>

      <div className="flex flex-col gap-14 sm:gap-16">
        <section aria-labelledby="mood-boards">
          <SectionHeading id="mood-boards" index="01" title="Mood Boards" note="Photos, type, color, texture, and interface pieces" />
          <ul className="grid gap-4 md:grid-cols-3">
            {styles.map((s) => (
              <li key={s.slug}>
                <Link href={`/mood-boards/${s.slug}`} className={`${cardClass} border-border bg-surface`}>
                  <span aria-hidden className="flex h-16 overflow-hidden rounded-md border border-border">
                    {s.swatches.map((c) => (
                      <span key={c} className="flex-1" style={{ background: c }} />
                    ))}
                  </span>
                  <span className="mt-4 flex items-center justify-between text-lg font-medium">
                    {s.name} <Arrow />
                  </span>
                  <span className="mt-1 text-sm text-muted">{s.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="design-systems">
          <SectionHeading id="design-systems" index="02" title="Design Systems" note="Each one built from its mood board" />
          <ul className="grid gap-4 md:grid-cols-3">
            {styles.map((s) => (
              <li key={s.slug}>
                <Link href={`/design-systems/${s.slug}`} className={`${cardClass} flex-row items-center gap-4 border-border bg-surface`}>
                  <span
                    aria-hidden
                    className="flex size-12 shrink-0 items-center justify-center rounded-md border border-border text-xl font-semibold"
                    style={{ background: s.swatches[0], color: s.swatches[3] }}
                  >
                    Aa
                  </span>
                  <span className="flex flex-1 items-center justify-between text-lg font-medium">
                    {s.name} <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="the-site">
          <SectionHeading id="the-site" index="03" title="The Site" note="Built in the chosen style" />
          <Link
            href={site.href}
            className={`${cardClass} gap-2 border-foreground bg-foreground text-background hover:bg-foreground/90 sm:flex-row sm:items-center sm:justify-between sm:p-8`}
          >
            <span>
              <span className="block text-2xl font-semibold">Open {site.name}</span>
              <span className="mt-1 block text-sm text-background/70">{site.summary}</span>
            </span>
            <span className="text-2xl">
              <Arrow />
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}
