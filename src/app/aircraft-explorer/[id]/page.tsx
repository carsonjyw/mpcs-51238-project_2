import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import PhotoCredits from "@/components/PhotoCredits";
import { SkBadge } from "@/components/ds/sky";
import { aircraft, fmt } from "@/lib/aircraft";
import { profiles } from "@/lib/profiles";
import SiteChrome, { quietLink } from "../chrome";
import ProfileTabs from "./profile";

// All eight profiles are prerendered; nothing here depends on the request.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return aircraft.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: PageProps<"/aircraft-explorer/[id]">) {
  const { id } = await params;
  const a = aircraft.find((x) => x.id === id);
  if (!a) return {};
  return { title: `${a.manufacturer} ${a.name} · Aircraft Explorer`, description: profiles[id].tagline };
}

export default function AircraftPage({ params }: PageProps<"/aircraft-explorer/[id]">) {
  return (
    <SiteChrome>
      <Suspense fallback={<ProfileSkeleton />}>
        <AircraftProfile params={params} />
      </Suspense>
    </SiteChrome>
  );
}

// Shown only for the instant of a client-side navigation before the prerendered profile arrives.
function ProfileSkeleton() {
  return (
    <main aria-busy="true" className="mx-auto max-w-[1280px] px-5 pb-24 pt-12 sm:px-10">
      <div className="h-4 w-40 animate-pulse rounded-full bg-[var(--sk-mist)]" />
      <div className="mt-6 h-16 w-3/4 animate-pulse rounded-2xl bg-[var(--sk-mist)]" />
      <div className="mt-10 aspect-[21/9] animate-pulse rounded-[28px] bg-[var(--sk-mist)]" />
    </main>
  );
}

async function AircraftProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = aircraft.findIndex((x) => x.id === id);
  if (index < 0) notFound();
  const a = aircraft[index];
  const p = profiles[id];
  const prev = aircraft[(index - 1 + aircraft.length) % aircraft.length];
  const next = aircraft[(index + 1) % aircraft.length];
  const hero = p.gallery.find((g) => g.category === "Exterior")!;

  return (
    <main className="mx-auto max-w-[1280px] px-5 sm:px-10">
      <Link href="/aircraft-explorer#fleet" className={`${quietLink} -mx-3 inline-block`}>
        ← All aircraft
      </Link>

      <header className="grid gap-8 pb-10 pt-8 lg:grid-cols-12 lg:items-end lg:pt-12">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sk-muted)]">
            {a.manufacturer} · {a.body} · {a.engines} engines
          </p>
          <h1 className="mt-3 text-5xl font-extralight leading-[1.02] tracking-[-0.03em] sm:text-7xl">
            {a.manufacturer} {a.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--sk-muted)] sm:text-xl">{p.tagline}</p>
          <div className="mt-5">
            <SkBadge tone={p.status.startsWith("Production ended") ? "warning" : "success"}>{p.status}</SkBadge>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 lg:col-span-5 lg:pb-2">
          {[
            [`${fmt(a.rangeKm)} km`, "Range, approx."],
            [`${a.seats}`, "Typical seats, varies"],
            [`${a.lengthM} m`, "Length"],
            [`${a.spanM} m`, "Wingspan"],
          ].map(([v, k]) => (
            <div key={k} className="border-t border-[var(--sk-border)] pt-3">
              <dd className="text-3xl font-extralight tracking-tight tabular-nums">{v}</dd>
              <dt className="mt-1 text-sm text-[var(--sk-muted)]">{k}</dt>
            </div>
          ))}
        </dl>
      </header>

      <figure>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[var(--sk-mist)] sm:aspect-[21/9]">
          <Photo slug={hero.slug} sizes="(min-width: 1280px) 1200px, 100vw" preload />
        </div>
      </figure>

      <div className="pb-24 pt-12">
        <ProfileTabs a={a} p={p} />
      </div>

      <nav aria-label="More aircraft" className="grid gap-4 border-t border-[var(--sk-border)] py-10 sm:grid-cols-2">
        {[
          ["Previous", prev],
          ["Next", next],
        ].map(([label, x]) => {
          const ac = x as typeof a;
          return (
            <Link
              key={label as string}
              href={`/aircraft-explorer/${ac.id}`}
              className={`group flex flex-col rounded-[22px] bg-white p-6 ring-1 ring-[var(--sk-border)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(24,33,44,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent)] active:translate-y-0 ${label === "Next" ? "sm:items-end sm:text-right" : ""}`}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sk-muted)]">
                {label === "Next" ? "Next aircraft →" : "← Previous aircraft"}
              </span>
              <span className="mt-1 text-2xl font-light tracking-tight group-hover:text-[var(--sk-accent)]">
                {ac.manufacturer} {ac.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <section aria-labelledby="credits" className="border-t border-[var(--sk-border)] py-10">
        <h2 id="credits" className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sk-muted)]">
          Photo credits
        </h2>
        <PhotoCredits
          slugs={p.gallery.map((g) => g.slug)}
          className="mt-3 grid gap-1.5 text-xs leading-relaxed text-[var(--sk-muted)] lg:grid-cols-2 lg:gap-x-10"
          linkClassName="underline decoration-[var(--sk-haze)] underline-offset-2 hover:text-[var(--sk-text)] hover:decoration-[var(--sk-accent)] focus-visible:outline-2 focus-visible:outline-[var(--sk-accent)]"
        />
      </section>
    </main>
  );
}
