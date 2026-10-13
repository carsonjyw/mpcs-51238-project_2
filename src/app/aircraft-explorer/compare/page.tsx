import Link from "next/link";
import PhotoCredits from "@/components/PhotoCredits";
import { aircraft } from "@/lib/aircraft";
import type { PhotoSlug } from "@/lib/photos";
import SiteChrome, { quietLink } from "../chrome";
import Compare from "./compare";

export const metadata = {
  title: "Compare aircraft · Aircraft Explorer",
  description: "Compare up to three commercial aircraft side by side: range, size, seating, and engines.",
};

export default function ComparePage() {
  return (
    <SiteChrome>
      <main className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-10">
        <Link href="/aircraft-explorer#fleet" className={`${quietLink} -mx-3 inline-block`}>
          ← All aircraft
        </Link>
        <header className="pb-10 pt-8 sm:pt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sk-muted)]">Side by side</p>
          <h1 className="mt-3 text-5xl font-extralight tracking-[-0.03em] sm:text-7xl">Compare aircraft</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--sk-muted)]">
            Put two or three aircraft next to each other to see how their range, size, seating, and engines differ.
          </p>
        </header>

        <Compare />

        <p className="mt-12 text-sm text-[var(--sk-muted)]">
          Figures are rounded from manufacturer published data. Seats and layouts are typical and vary by airline. Bars
          share one scale per row across all eight aircraft; the darker bar marks the highest value among those compared.
        </p>

        <section aria-labelledby="credits" className="mt-12 border-t border-[var(--sk-border)] pt-8">
          <h2 id="credits" className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sk-muted)]">
            Photo credits
          </h2>
          <PhotoCredits
            slugs={aircraft.map((a) => a.photo).filter((p): p is PhotoSlug => !!p)}
            className="mt-3 grid gap-1.5 text-xs leading-relaxed text-[var(--sk-muted)] lg:grid-cols-2 lg:gap-x-10"
            linkClassName="underline decoration-[var(--sk-haze)] underline-offset-2 hover:text-[var(--sk-text)] hover:decoration-[var(--sk-accent)] focus-visible:outline-2 focus-visible:outline-[var(--sk-accent)]"
          />
        </section>
      </main>
    </SiteChrome>
  );
}
