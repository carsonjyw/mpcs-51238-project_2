import type { ReactNode } from "react";
import Link from "next/link";
import PhotoCredits from "@/components/PhotoCredits";
import {
  SkBadge,
  SkButton,
  SkCard,
  SkCheckbox,
  SkChip,
  SkInput,
  SkLink,
  SkRadio,
  SkRow,
  SkSegment,
  SkSelect,
  SkSheet,
  SkToggle,
} from "@/components/ds/sky";
import { getAircraft } from "@/lib/aircraft";
import { contrast, grade } from "@/lib/contrast";
import { manrope } from "@/lib/fonts";
import { controlStates, type ControlState } from "@/lib/states";
import { skyPalette as P, skyTokens } from "@/lib/tokens";
import { CardsDemo, ModalDemo, TabsDemo } from "./demos";

export const metadata = { title: "Sky Minimal · Design System" };

function Section({ n, title, note, children }: { n: number; title: string; note: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`s${n}`} className="flex scroll-mt-8 flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 id={`s${n}`} className="flex items-baseline gap-4 text-4xl font-extralight tracking-tight sm:text-5xl">
          <span className="text-sm font-semibold tabular-nums text-[var(--sk-accent)]">{String(n).padStart(2, "0")}</span>
          {title}
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-[var(--sk-muted)]">{note}</p>
      </div>
      {children}
    </section>
  );
}

function Panel({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col gap-5 rounded-[22px] bg-white p-6 ring-1 ring-[var(--sk-border)] sm:p-8 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sk-muted)]">{title}</p>
      {children}
    </div>
  );
}

const types = [
  { role: "Display", spec: "Manrope ExtraLight 200 · 64/68 · −3%", note: "44/48 on mobile", sample: <span className="text-[44px] font-extralight leading-[48px] tracking-[-0.03em] sm:text-[64px] sm:leading-[68px]">Fly further, quietly.</span> },
  { role: "Heading", spec: "Manrope Light 300 · 32/40 · −2%", sample: <span className="text-[32px] font-light leading-10 tracking-[-0.02em]">Airbus A350-900</span> },
  { role: "Body", spec: "Manrope Regular 400 · 16/26", sample: <span className="block max-w-xl text-base leading-[26px]">A long-haul twin built largely from carbon composites, with a quiet, high cabin and a range of over 15,000 km.</span> },
  { role: "Label", spec: "Manrope SemiBold 600 · 12/16 · uppercase · +14%", sample: <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sk-muted)]">Range · Seats · Wingspan</span> },
];

const stateRows: { name: string; wide?: boolean; render: (s: ControlState) => ReactNode }[] = [
  { name: "Primary button", render: (s) => (s === "selected" ? null : <SkButton state={s}>View aircraft</SkButton>) },
  { name: "Secondary button", render: (s) => (s === "selected" ? null : <SkButton variant="secondary" state={s}>Compare</SkButton>) },
  { name: "Segment", render: (s) => <div className="rounded-full bg-[var(--sk-mist)] p-1"><SkSegment state={s}>Airbus</SkSegment></div> },
  { name: "Chip", render: (s) => <SkChip state={s}>Wide-body</SkChip> },
  { name: "Checkbox", render: (s) => <SkCheckbox label="Four engines" state={s} /> },
  { name: "Toggle", render: (s) => <SkToggle label="Metric" state={s} /> },
  { name: "Text input", render: (s) => (s === "selected" ? null : <SkInput label="Search" placeholder="A350" state={s} />) },
  { name: "List row", wide: true, render: (s) => <SkRow a={getAircraft("a321neo")} state={s} /> },
  { name: "Aircraft card", wide: true, render: (s) => <div className="w-full max-w-xs"><SkCard a={getAircraft("787-9")} state={s} /></div> },
];

export default function SkyMinimalSystem() {
  return (
    <div style={skyTokens} className={`${manrope.className} min-h-full flex-1 bg-[var(--sk-bg)] text-[var(--sk-text)]`}>
      <header className="mx-auto flex max-w-[1280px] items-center justify-between px-5 pt-6 text-sm sm:px-10">
        <Link href="/" className="-mx-3 rounded-full px-3 py-1.5 text-[var(--sk-muted)] transition hover:bg-[var(--sk-mist)] hover:text-[var(--sk-text)] focus-visible:outline-2 focus-visible:outline-[var(--sk-accent)] active:bg-[var(--sk-haze)]">
          ← Hub
        </Link>
        <Link href="/mood-boards/sky-minimal" className="-mx-3 rounded-full px-3 py-1.5 text-[var(--sk-muted)] transition hover:bg-[var(--sk-mist)] hover:text-[var(--sk-text)] focus-visible:outline-2 focus-visible:outline-[var(--sk-accent)] active:bg-[var(--sk-haze)]">
          Mood board →
        </Link>
      </header>

      <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
        <section className="pb-16 pt-14 sm:pb-24 sm:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--sk-accent)]">Design system 1 of 3 · Chosen for the site</p>
          <h1 className="mt-4 text-6xl font-extralight tracking-[-0.03em] sm:text-8xl">Sky Minimal</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--sk-muted)]">
            Pills, soft light, and one blue. Built from the mood board for a calm, premium aircraft
            guide. Horizon blue marks what you can do; ink marks what you have chosen.
          </p>
        </section>

        <nav aria-label="Sections" className="-mt-6 mb-16 flex flex-wrap gap-2 sm:-mt-10">
          {["Color roles", "Type roles", "Spacing and shape", "Components", "Control states", "UI states"].map((t, i) => (
            <a
              key={t}
              href={`#s${i + 1}`}
              className="rounded-full bg-white px-4 py-2 text-sm text-[var(--sk-text)] ring-1 ring-[var(--sk-border)] transition hover:ring-[var(--sk-control)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent)] active:bg-[var(--sk-mist)]"
            >
              <span className="mr-1.5 text-xs font-semibold text-[var(--sk-accent)]">{String(i + 1).padStart(2, "0")}</span>
              {t}
            </a>
          ))}
        </nav>

        <main className="flex flex-col gap-24 pb-28">
          <Section n={1} title="Color roles" note="Contrast is calculated against the page background (Paper) and the card surface (Cloud).">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {P.roles.map((r) => {
                const onBg = contrast(r.hex, P.background);
                const onSurface = contrast(r.hex, P.surface);
                return (
                  <div key={r.role} className="overflow-hidden rounded-[22px] bg-white ring-1 ring-[var(--sk-border)]">
                    <div className="h-24 ring-1 ring-inset ring-black/5" style={{ background: r.hex }} />
                    <div className="flex flex-col gap-2 p-5">
                      <p className="font-semibold">{r.role}</p>
                      <p className="text-xs text-[var(--sk-muted)]">
                        {r.name} · {r.hex.toUpperCase()} · {r.use}
                      </p>
                      <p className="flex justify-between border-t border-[var(--sk-border)] pt-2 text-xs">
                        <span className="text-[var(--sk-muted)]">Paper {onBg.toFixed(1)} · Cloud {onSurface.toFixed(1)}</span>
                        <span className="font-semibold">{grade(Math.min(onBg, onSurface))}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="flex flex-col gap-3 rounded-[22px] bg-white p-5 ring-1 ring-[var(--sk-border)]">
                <p className="font-semibold">Status colors</p>
                {P.semantic.map((r) => (
                  <p key={r.role} className="flex items-center gap-3 text-sm">
                    <span className="size-3 rounded-full" style={{ background: r.hex }} />
                    <span style={{ color: r.hex }} className="font-semibold">
                      {r.role}
                    </span>
                    <span className="ml-auto text-xs text-[var(--sk-muted)]">{contrast(r.hex, P.surface).toFixed(1)}:1</span>
                  </p>
                ))}
                <p className="mt-auto text-xs leading-relaxed text-[var(--sk-muted)]">Used only in badges and messages, always next to words.</p>
              </div>
            </div>
          </Section>

          <Section n={2} title="Type roles" note="One family, Manrope, from ExtraLight for display to SemiBold for labels.">
            <div className="divide-y divide-[var(--sk-border)] rounded-[22px] bg-white px-6 ring-1 ring-[var(--sk-border)] sm:px-8">
              {types.map((t) => (
                <div key={t.role} className="grid gap-3 py-7 lg:grid-cols-[140px_1fr_260px] lg:items-center lg:gap-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sk-accent)]">{t.role}</p>
                  <div className="min-w-0">{t.sample}</div>
                  <p className="text-xs leading-relaxed text-[var(--sk-muted)]">
                    {t.spec}
                    {t.note && <span className="block">{t.note}</span>}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section n={3} title="Spacing and shape" note="An 8-point scale, fully rounded controls, and shadows only on things that lift.">
            <div className="grid gap-5 lg:grid-cols-3">
              <Panel title="Spacing scale">
                <div className="flex items-end gap-3">
                  {[4, 8, 16, 24, 32, 48, 64, 96].map((s) => (
                    <span key={s} className="flex flex-col items-center gap-2">
                      <span className="w-4 rounded-full bg-[var(--sk-haze)]" style={{ height: s * 0.75 }} />
                      <span className="text-[10px] text-[var(--sk-muted)]">{s}</span>
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[var(--sk-muted)]">24 inside cards, 32 between groups, 96 between sections.</p>
              </Panel>
              <Panel title="Corners and borders">
                <div className="flex flex-wrap gap-4">
                  {[
                    ["999", "Controls"],
                    ["22", "Cards"],
                    ["28", "Sheets"],
                  ].map(([r, use]) => (
                    <span key={r} className="flex flex-col items-center gap-2">
                      <span className="h-14 w-20 bg-[var(--sk-mist)] ring-1 ring-[var(--sk-border)]" style={{ borderRadius: `${r === "999" ? 999 : Number(r)}px` }} />
                      <span className="text-[11px] text-[var(--sk-muted)]">
                        {r === "999" ? "Full" : `${r}px`} · {use}
                      </span>
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[var(--sk-muted)]">1px Haze hairline on cards; 1px Altitude on inputs so they read as fields.</p>
              </Panel>
              <Panel title="Shadows">
                <div className="flex gap-4">
                  {[
                    ["None", "Rest", "none"],
                    ["Lift", "Hover", "0 18px 40px -18px rgba(24,33,44,0.28)"],
                    ["Float", "Sheet", "0 32px 64px -16px rgba(24,33,44,0.35)"],
                  ].map(([n, use, sh]) => (
                    <span key={n} className="flex flex-1 flex-col items-center gap-2">
                      <span className="h-14 w-full rounded-2xl bg-white ring-1 ring-[var(--sk-border)]" style={{ boxShadow: sh }} />
                      <span className="text-[11px] text-[var(--sk-muted)]">
                        {n} · {use}
                      </span>
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[var(--sk-muted)]">Nothing casts a shadow at rest. Shadows mean “this moved toward you.”</p>
              </Panel>
            </div>
          </Section>

          <Section n={4} title="Components" note="All live. Hover, click, and tab through them.">
            <div className="grid gap-5 lg:grid-cols-2">
              <Panel title="Buttons and link">
                <div className="flex flex-wrap items-center gap-3">
                  <SkButton>View aircraft</SkButton>
                  <SkButton variant="secondary">Compare</SkButton>
                  <SkButton disabled>Book</SkButton>
                </div>
                <SkLink>Read about the A350</SkLink>
              </Panel>
              <Panel title="Input and select">
                <div className="grid gap-4 sm:grid-cols-2">
                  <SkInput label="Search" placeholder="Aircraft or airline" icon hint="Try “787”" />
                  <SkSelect label="Sort by" options={["Range", "Seats", "Name"]} />
                  <SkInput label="Minimum seats" defaultValue="9000" error="That’s more seats than any airliner" />
                  <SkInput label="Year" placeholder="2015" state="disabled" />
                </div>
              </Panel>
              <Panel title="Checkbox, radio, toggle">
                <div className="grid gap-6 sm:grid-cols-3">
                  <fieldset className="flex flex-col gap-3">
                    <legend className="mb-3 text-xs font-semibold text-[var(--sk-text)]">Body</legend>
                    <SkCheckbox label="Wide-body" defaultChecked />
                    <SkCheckbox label="Narrow-body" />
                  </fieldset>
                  <fieldset className="flex flex-col gap-3">
                    <legend className="mb-3 text-xs font-semibold text-[var(--sk-text)]">Units</legend>
                    <SkRadio name="sk-units" label="Kilometres" defaultChecked />
                    <SkRadio name="sk-units" label="Miles" />
                  </fieldset>
                  <div className="flex flex-col gap-3">
                    <p className="mb-1 text-xs font-semibold text-[var(--sk-text)]">Display</p>
                    <SkToggle label="Photos" defaultOn />
                    <SkToggle label="Compact" />
                  </div>
                </div>
              </Panel>
              <Panel title="Tabs, chips, badges">
                <TabsDemo />
                <div className="flex flex-wrap gap-2">
                  <SkChip defaultOn>Wide-body</SkChip>
                  <SkChip>Narrow-body</SkChip>
                  <SkChip>Four engines</SkChip>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SkBadge tone="success">In production</SkBadge>
                  <SkBadge tone="warning">Production ended</SkBadge>
                  <SkBadge>Wide-body</SkBadge>
                </div>
              </Panel>
              <Panel title="Aircraft cards · click to open" className="lg:col-span-2">
                <CardsDemo />
              </Panel>
              <Panel title="List rows">
                <div className="-mx-4 flex flex-col">
                  {["a320neo", "a321neo", "737-max-8"].map((id, i) => (
                    <SkRow key={id} a={getAircraft(id)} defaultSelected={i === 1} />
                  ))}
                </div>
              </Panel>
              <Panel title="Detail sheet">
                <div className="rounded-[28px] ring-1 ring-[var(--sk-border)]">
                  <SkSheet a={getAircraft("a350-900")} />
                </div>
                <ModalDemo />
              </Panel>
            </div>
          </Section>

          <Section n={5} title="Control states" note="Each state forced on. Focus is a 2px blue outline, offset from the shape so it never hides it.">
            <div className="flex flex-col gap-4">
              {stateRows.map((row) => (
                <div key={row.name} className="rounded-[22px] bg-white p-6 ring-1 ring-[var(--sk-border)]">
                  <p className="mb-4 font-semibold">{row.name}</p>
                  <div className={`grid gap-x-6 gap-y-6 ${row.wide ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"}`}>
                    {controlStates.map((s) => (
                      <div key={s} className="flex min-w-0 flex-col items-start gap-2.5">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sk-muted)]">{s}</span>
                        {row.render(s) ?? <span className="text-sm text-[var(--sk-muted)]">Not used</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section n={6} title="UI states" note="Gentle language and soft color. Nothing shouts, even an error.">
            <div className="grid gap-5 sm:grid-cols-2">
              <Panel title="Empty">
                <div className="flex flex-col items-center gap-4 py-6 text-center">
                  <svg aria-hidden viewBox="0 0 64 40" className="w-20 text-[var(--sk-haze)]">
                    <path d="M16 34a10 10 0 0 1 1-20 14 14 0 0 1 27-2 11 11 0 0 1 4 22z" fill="currentColor" />
                  </svg>
                  <div>
                    <p className="text-lg font-light">Clear skies, no aircraft</p>
                    <p className="mt-1 text-sm text-[var(--sk-muted)]">Nothing matches “Four engines” and “Narrow-body”.</p>
                  </div>
                  <SkButton variant="secondary">Clear filters</SkButton>
                </div>
              </Panel>
              <Panel title="Loading">
                <div role="status" className="flex flex-col gap-4">
                  <p className="flex items-center gap-3 text-sm text-[var(--sk-muted)]">
                    <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-[var(--sk-haze)] border-t-[var(--sk-accent)]" />
                    Loading the 747-8…
                  </p>
                  <div aria-hidden className="overflow-hidden rounded-[22px] ring-1 ring-[var(--sk-border)]">
                    <div className="relative grid aspect-[16/7] animate-pulse place-items-center bg-[var(--sk-mist)]">
                      <svg viewBox="0 0 24 24" className="size-8 rotate-90 fill-[var(--sk-haze)]">
                        <path d="M21 15.5v-1.8l-7.6-4.8V3.8a1.4 1.4 0 0 0-2.8 0v5.1L3 13.7v1.8l7.6-2.3v4.9l-2 1.5v1.4l3.4-1 3.4 1v-1.4l-2-1.5v-4.9z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-2.5 p-5">
                      <div className="h-4 w-1/2 animate-pulse rounded-full bg-[var(--sk-mist)]" />
                      <div className="h-3 w-3/4 animate-pulse rounded-full bg-[var(--sk-mist)]" />
                    </div>
                  </div>
                </div>
              </Panel>
              <Panel title="Error">
                <div role="alert" className="flex items-start gap-4 rounded-2xl bg-[#fdeceb] p-5">
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-white font-semibold text-[var(--sk-error)]">!</span>
                  <div className="flex flex-col gap-3">
                    <p className="text-sm">
                      <span className="font-semibold text-[var(--sk-error)]">We couldn’t load the 747-8.</span> Check your connection and try again.
                    </p>
                    <SkLink>Try again</SkLink>
                  </div>
                </div>
              </Panel>
              <Panel title="Success">
                <div role="status" className="flex items-center gap-3 self-start rounded-full bg-white py-2.5 pl-3 pr-5 shadow-[0_18px_40px_-18px_rgba(24,33,44,0.35)] ring-1 ring-[var(--sk-border)]">
                  <span className="grid size-7 place-items-center rounded-full bg-[#e5f3eb] text-[var(--sk-success)]">
                    <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
                      <path d="M2.5 6.5l2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="text-sm">A350-900 added to your shortlist</span>
                </div>
              </Panel>
            </div>
          </Section>
        </main>
      </div>

      <footer className="border-t border-[var(--sk-border)]">
        <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sk-muted)]">Photo credits</h2>
          <PhotoCredits
            slugs={["a380-lufthansa-landing", "b787-aircanada-approach", "a350-airbus-ila"]}
            className="mt-4 flex flex-col gap-1.5 text-xs leading-relaxed text-[var(--sk-muted)]"
            linkClassName="underline decoration-[var(--sk-haze)] underline-offset-2 hover:text-[var(--sk-text)] hover:decoration-[var(--sk-accent)] focus-visible:outline-2 focus-visible:outline-[var(--sk-accent)]"
          />
          <p className="mt-3 text-xs text-[var(--sk-muted)]">Aircraft figures are rounded from manufacturer published data.</p>
        </div>
      </footer>
    </div>
  );
}
