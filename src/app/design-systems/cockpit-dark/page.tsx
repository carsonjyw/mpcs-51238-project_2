import type { ReactNode } from "react";
import Link from "next/link";
import PhotoCredits from "@/components/PhotoCredits";
import {
  CkAircraftCard,
  CkBadge,
  CkButton,
  CkCheckbox,
  CkChip,
  CkInput,
  CkLink,
  CkListRow,
  CkRadio,
  CkSelect,
  CkTab,
  CkToggle,
} from "@/components/ds/cockpit";
import { getAircraft } from "@/lib/aircraft";
import { contrast, grade } from "@/lib/contrast";
import { plexCondensed, plexMono, plexSans } from "@/lib/fonts";
import { controlStates, type ControlState } from "@/lib/states";
import { cockpitPalette as P, cockpitTokens } from "@/lib/tokens";
import { CardsDemo, ChipsDemo, ListDemo, PanelDemo, StatesDemo, TabsDemo } from "./demos";

export const metadata = { title: "Cockpit Dark · Design System" };

const sections = ["Color roles", "Type roles", "Spacing and shape", "Components", "Control states", "UI states"];

function Section({ n, title, note, children }: { n: number; title: string; note: string; children: ReactNode }) {
  return (
    <section id={`s${n}`} aria-labelledby={`s${n}-h`} className="scroll-mt-6 border-t border-[var(--ck-border)] pt-6">
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 id={`s${n}-h`} className="flex items-baseline gap-3 font-cond text-2xl font-medium uppercase tracking-wide">
          <span className="font-cockpit text-sm text-[var(--ck-accent)]">{String(n).padStart(2, "0")}</span>
          {title}
        </h2>
        <p className="max-w-lg font-plex text-sm text-[var(--ck-muted)]">{note}</p>
      </div>
      {children}
    </section>
  );
}

// A display unit, as on the mood board: hard edges, a mono label strip.
function Unit({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col border border-[var(--ck-border)] bg-[var(--ck-surface)] ${className}`}>
      <p className="border-b border-[var(--ck-border)] px-4 py-2 font-cockpit text-[11px] uppercase tracking-[0.14em] text-[var(--ck-muted)]">{title}</p>
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">{children}</div>
    </div>
  );
}

const types = [
  {
    role: "Display",
    spec: "Plex Sans Condensed · Light 300 · 56/56 · uppercase · +2%",
    mobile: "40/40 on mobile",
    sample: <span className="font-cond text-[40px] font-light uppercase leading-none tracking-[0.02em] sm:text-[56px]">Airbus A350-900</span>,
  },
  {
    role: "Heading",
    spec: "Plex Sans Condensed · Medium 500 · 24/28 · uppercase · +2%",
    sample: <span className="font-cond text-2xl font-medium uppercase leading-7 tracking-[0.02em]">Long-haul twins</span>,
  },
  {
    role: "Body",
    spec: "IBM Plex Sans · Regular 400 · 16/26",
    sample: (
      <span className="max-w-xl font-plex text-base leading-[26px]">
        The A350-900 is a long-haul twin built largely from carbon composites. It flies up to
        15,372 km with around 325 passengers.
      </span>
    ),
  },
  {
    role: "Label",
    spec: "IBM Plex Mono · Medium 500 · 11/16 · uppercase · +14%",
    sample: <span className="font-cockpit text-[11px] font-medium uppercase leading-4 tracking-[0.14em] text-[var(--ck-muted)]">Range · Seats · Wingspan</span>,
  },
  {
    role: "Data",
    spec: "IBM Plex Mono · Regular 400 · 14/20 · tabular figures",
    sample: <span className="font-cockpit text-sm tabular-nums">15,372 KM · 325 TYP · 64.8 M</span>,
  },
];

const stateRows: { name: string; wide?: boolean; render: (s: ControlState) => ReactNode }[] = [
  { name: "Primary button", render: (s) => <CkButton state={s}>Add to shortlist</CkButton> },
  { name: "Secondary button", render: (s) => <CkButton variant="secondary" state={s}>Compare</CkButton> },
  { name: "Filter chip", render: (s) => <CkChip state={s}>Wide-body</CkChip> },
  {
    name: "Tab",
    render: (s) => (
      <div className="inline-flex border border-[var(--ck-control)] bg-[var(--ck-void)]">
        <CkTab state={s}>Airbus</CkTab>
      </div>
    ),
  },
  { name: "Checkbox", render: (s) => <CkCheckbox label="Four engines" state={s} /> },
  { name: "Toggle", render: (s) => <CkToggle label="Metric" state={s} /> },
  { name: "List row", wide: true, render: (s) => <div className="w-full border-t border-[var(--ck-border)]"><CkListRow a={getAircraft("787-9")} state={s} /></div> },
  { name: "Aircraft card", wide: true, render: (s) => <div className="w-full max-w-xs"><CkAircraftCard a={getAircraft("747-8")} state={s} /></div> },
];

export default function CockpitDarkSystem() {
  const ratioCell = (hex: string, bg: string) => {
    const r = contrast(hex, bg);
    return (
      <span className="flex items-baseline justify-between gap-2">
        <span className="tabular-nums text-[var(--ck-text)]">{r.toFixed(1)}:1</span>
        <span className="text-[10px] text-[var(--ck-muted)]">{grade(r)}</span>
      </span>
    );
  };

  return (
    <div
      style={cockpitTokens}
      className={`${plexSans.variable} ${plexCondensed.variable} ${plexMono.variable} min-h-full flex-1 bg-[var(--ck-void)] font-plex text-[var(--ck-text)]`}
    >
      <header className="border-b border-[var(--ck-border)]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 font-cockpit text-[11px] uppercase tracking-[0.14em] sm:px-8">
          <Link href="/" className="-mx-2 rounded-[2px] px-2 py-1 text-[var(--ck-muted)] transition-colors hover:bg-[var(--ck-raised)] hover:text-[var(--ck-text)] focus-visible:outline-2 focus-visible:outline-[var(--ck-accent)] active:text-[var(--ck-accent)]">
            ◂ Hub
          </Link>
          <span className="text-[var(--ck-muted)]">
            Design system <span className="text-[var(--ck-text)]">02</span> / 03
          </span>
          <Link href="/mood-boards/cockpit-dark" className="-mx-2 hidden rounded-[2px] px-2 py-1 text-[var(--ck-muted)] transition-colors hover:bg-[var(--ck-raised)] hover:text-[var(--ck-text)] focus-visible:outline-2 focus-visible:outline-[var(--ck-accent)] sm:inline">
            Mood board ▸
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <section className="grid gap-6 py-10 sm:py-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-cockpit text-xs uppercase tracking-[0.2em] text-[var(--ck-accent)]">Design system · 2 of 3</p>
            <h1 className="mt-3 font-cond text-5xl font-light uppercase leading-[0.9] tracking-[0.02em] sm:text-7xl">Cockpit Dark</h1>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#c2cddb] lg:col-span-5">
            The mood board’s flight-deck look, tuned for reading. Body text moves to full-width IBM
            Plex Sans, every text color passes AA on the panels, and cyan is kept for the things you can
            act on.
          </p>
        </section>

        <nav aria-label="Sections" className="mb-10 flex flex-wrap gap-x-5 gap-y-2 font-cockpit text-[11px] uppercase tracking-[0.14em]">
          {sections.map((s, i) => (
            <a key={s} href={`#s${i + 1}`} className="rounded-[1px] text-[var(--ck-muted)] transition-colors hover:text-[var(--ck-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ck-accent)]">
              <span className="text-[var(--ck-accent)]">{String(i + 1).padStart(2, "0")}</span> {s}
            </a>
          ))}
        </nav>

        <main className="flex flex-col gap-16 pb-20">
          {/* 01 Color roles */}
          <Section n={1} title="Color roles" note="Ratios are calculated from the hex values against the page background and the panel surface.">
            <div className="grid gap-px border border-[var(--ck-border)] bg-[var(--ck-border)] sm:grid-cols-2 lg:grid-cols-4">
              {P.roles.map((r) => (
                <div key={r.role} className="flex flex-col bg-[var(--ck-surface)]">
                  <div className="h-20 border-b border-[var(--ck-border)]" style={{ background: r.hex }} />
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div>
                      <p className="font-cond text-lg font-medium uppercase tracking-wide">{r.role}</p>
                      <p className="font-cockpit text-xs text-[var(--ck-muted)]">
                        {r.name} · {r.hex.toUpperCase()}
                      </p>
                    </div>
                    <p className="text-sm text-[var(--ck-muted)]">{r.use}</p>
                    <div className="mt-auto flex flex-col gap-1 border-t border-[var(--ck-border)] pt-2 font-cockpit text-xs">
                      <span className="flex justify-between text-[var(--ck-muted)]">
                        <span>on Void</span>
                        {ratioCell(r.hex, P.background)}
                      </span>
                      <span className="flex justify-between text-[var(--ck-muted)]">
                        <span>on Panel</span>
                        {ratioCell(r.hex, P.surface)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col justify-between gap-4 bg-[var(--ck-surface)] p-4">
                <p className="font-cond text-lg font-medium uppercase tracking-wide">Status only</p>
                <ul className="flex flex-col gap-2.5">
                  {P.semantic.map((r) => (
                    <li key={r.role} className="flex items-center gap-3 font-cockpit text-xs">
                      <span className="size-3 shrink-0" style={{ background: r.hex }} />
                      <span className="w-16" style={{ color: r.hex }}>
                        {r.role}
                      </span>
                      <span className="ml-auto tabular-nums text-[var(--ck-text)]">{contrast(r.hex, P.surface).toFixed(1)}:1</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[var(--ck-muted)]">Green, amber, and red mark status. They never decorate, and never mark an action.</p>
              </div>
            </div>
          </Section>

          {/* 02 Type roles */}
          <Section n={2} title="Type roles" note="Three Plex families: condensed for names, sans for reading, mono for anything you might compare.">
            <div className="divide-y divide-[var(--ck-border)] border-y border-[var(--ck-border)]">
              {types.map((t) => (
                <div key={t.role} className="grid gap-3 py-5 lg:grid-cols-[180px_1fr_300px] lg:items-center lg:gap-8">
                  <p className="font-cockpit text-[11px] uppercase tracking-[0.14em] text-[var(--ck-accent)]">{t.role}</p>
                  <div className="min-w-0">{t.sample}</div>
                  <p className="font-cockpit text-xs leading-relaxed text-[var(--ck-muted)]">
                    {t.spec}
                    {t.mobile && <span className="block">{t.mobile}</span>}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* 03 Spacing and shape */}
          <Section n={3} title="Spacing and shape" note="A 4-point scale, near-square corners, and lines instead of shadows.">
            <div className="grid gap-px border border-[var(--ck-border)] bg-[var(--ck-border)] lg:grid-cols-3">
              <Unit title="Spacing scale · px">
                <div className="flex items-end gap-3">
                  {[4, 8, 12, 16, 24, 32, 48, 64].map((s) => (
                    <span key={s} className="flex flex-col items-center gap-2">
                      <span className="w-3 bg-[var(--ck-control)] sm:w-4" style={{ height: s }} />
                      <span className="font-cockpit text-[10px] text-[var(--ck-muted)]">{s}</span>
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[var(--ck-muted)]">16 inside panels, 24 between groups, 64 between sections.</p>
              </Unit>
              <Unit title="Corners and borders">
                <div className="flex flex-wrap gap-4">
                  {[
                    ["0", "Panels"],
                    ["2", "Controls"],
                    ["3", "Cards"],
                  ].map(([r, use]) => (
                    <span key={r} className="flex flex-col items-center gap-2">
                      <span className="size-14 border border-[var(--ck-control)] bg-[var(--ck-raised)]" style={{ borderRadius: `${r}px` }} />
                      <span className="font-cockpit text-[10px] text-[var(--ck-muted)]">
                        {r}px · {use}
                      </span>
                    </span>
                  ))}
                </div>
                <ul className="flex flex-col gap-2 font-cockpit text-xs text-[var(--ck-muted)]">
                  <li className="flex items-center gap-3"><span className="h-px w-10 bg-[var(--ck-border)]" /> 1px Bezel · panel lines</li>
                  <li className="flex items-center gap-3"><span className="h-px w-10 bg-[var(--ck-control)]" /> 1px Frame · controls</li>
                  <li className="flex items-center gap-3"><span className="h-px w-10 border-t border-dashed border-[var(--ck-control)]" /> Dashed · empty areas</li>
                </ul>
              </Unit>
              <Unit title="Elevation and glow">
                <div className="flex gap-3">
                  <span className="grid h-14 flex-1 place-items-center bg-[var(--ck-void)] font-cockpit text-[10px] text-[var(--ck-muted)]">0 Void</span>
                  <span className="grid h-14 flex-1 place-items-center bg-[var(--ck-surface)] font-cockpit text-[10px] text-[var(--ck-muted)] ring-1 ring-[var(--ck-border)]">1 Panel</span>
                  <span className="grid h-14 flex-1 place-items-center bg-[var(--ck-raised)] font-cockpit text-[10px] text-[var(--ck-muted)]">2 Raised</span>
                </div>
                <div className="flex gap-3">
                  <span className="grid h-12 flex-1 place-items-center border border-[var(--ck-accent)] font-cockpit text-[10px] text-[var(--ck-accent)] shadow-[0_0_14px_rgba(95,212,230,0.35)]">Focus glow</span>
                  <span className="grid h-12 flex-1 place-items-center bg-[var(--ck-surface)] font-cockpit text-[10px] text-[var(--ck-muted)] shadow-[-24px_0_64px_rgba(0,0,0,0.55)]">Modal shadow</span>
                </div>
                <p className="text-sm text-[var(--ck-muted)]">Height is shown by lighter surfaces. Only focus and lit lamps glow. The modal is the one shadow.</p>
              </Unit>
            </div>
          </Section>

          {/* 04 Components */}
          <Section n={4} title="Components" note="Every control here is live: hover it, tab to it, click it.">
            <div className="grid gap-px border border-[var(--ck-border)] bg-[var(--ck-border)] lg:grid-cols-2">
              <Unit title="Buttons and link">
                <div className="flex flex-wrap items-center gap-3">
                  <CkButton>Add to shortlist</CkButton>
                  <CkButton variant="secondary">Compare</CkButton>
                  <CkButton variant="secondary" disabled>
                    Export
                  </CkButton>
                </div>
                <p className="text-sm text-[var(--ck-muted)]">
                  One primary per view. <CkLink href="#s5">See every state ▸</CkLink>
                </p>
              </Unit>
              <Unit title="Text input and select">
                <div className="grid gap-4 sm:grid-cols-2">
                  <CkInput label="Search aircraft" placeholder="e.g. A350" hint="Model or manufacturer" />
                  <CkSelect
                    label="Sort by"
                    options={[
                      { value: "range", label: "Range, longest" },
                      { value: "seats", label: "Seats, most" },
                      { value: "name", label: "Name, A–Z" },
                    ]}
                  />
                  <CkInput label="Minimum range" defaultValue="99,000" error="Enter a range under 20,000 km" />
                  <CkInput label="Year" placeholder="2015" state="disabled" />
                </div>
              </Unit>
              <Unit title="Checkboxes, radios, toggle">
                <div className="grid gap-5 sm:grid-cols-3">
                  <fieldset className="flex flex-col gap-2.5">
                    <legend className="mb-2 font-cockpit text-[11px] uppercase tracking-[0.14em] text-[var(--ck-muted)]">Show</legend>
                    <CkCheckbox label="Wide-body" defaultChecked />
                    <CkCheckbox label="Narrow-body" />
                    <CkCheckbox label="Retired" state="disabled" />
                  </fieldset>
                  <fieldset className="flex flex-col gap-2.5">
                    <legend className="mb-2 font-cockpit text-[11px] uppercase tracking-[0.14em] text-[var(--ck-muted)]">Units</legend>
                    <CkRadio name="units" label="Metric" defaultChecked />
                    <CkRadio name="units" label="Imperial" />
                  </fieldset>
                  <div className="flex flex-col gap-2">
                    <p className="mb-1 font-cockpit text-[11px] uppercase tracking-[0.14em] text-[var(--ck-muted)]">Display</p>
                    <CkToggle label="Show photos" defaultOn />
                    <CkToggle label="Compact" />
                  </div>
                </div>
              </Unit>
              <Unit title="Tabs, chips, badges">
                <TabsDemo />
                <ChipsDemo />
                <div className="flex flex-wrap gap-2">
                  <CkBadge tone="success">In production</CkBadge>
                  <CkBadge tone="caution">Production ended</CkBadge>
                  <CkBadge tone="warning">Data missing</CkBadge>
                  <CkBadge>Wide-body</CkBadge>
                </div>
              </Unit>
              <Unit title="Aircraft cards · click one to open its panel" className="lg:col-span-2">
                <CardsDemo />
              </Unit>
              <Unit title="List rows · the same data, denser" className="lg:col-span-2">
                <ListDemo />
              </Unit>
              <Unit title="Detail panel" className="lg:col-span-2">
                <PanelDemo />
              </Unit>
            </div>
          </Section>

          {/* 05 Control states */}
          <Section n={5} title="Control states" note="Each state forced on for comparison. Focus is a cyan outline with a soft glow; pressed shifts 1px down.">
            <div className="flex flex-col gap-px border border-[var(--ck-border)] bg-[var(--ck-border)]">
              {stateRows.map((row) => (
                <div key={row.name} className="bg-[var(--ck-surface)] p-4">
                  <p className="mb-3 font-cockpit text-[11px] uppercase tracking-[0.14em] text-[var(--ck-text)]">{row.name}</p>
                  <div className={`grid gap-x-4 gap-y-5 ${row.wide ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"}`}>
                    {controlStates.map((s) => (
                      <div key={s} className="flex min-w-0 flex-col items-start gap-2">
                        <span className="font-cockpit text-[10px] uppercase tracking-[0.14em] text-[var(--ck-muted)]">{s}</span>
                        {row.name.includes("button") && s === "selected" ? (
                          <span className="font-cockpit text-xs text-[var(--ck-muted)]">Not used</span>
                        ) : (
                          row.render(s)
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 06 UI states */}
          <Section n={6} title="UI states" note="What the fleet view says when there is nothing, not yet, a problem, or good news.">
            <StatesDemo />
          </Section>
        </main>
      </div>

      <footer className="border-t border-[var(--ck-border)]">
        <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8">
          <h2 className="font-cockpit text-[11px] uppercase tracking-[0.16em] text-[var(--ck-muted)]">Photo credits</h2>
          <PhotoCredits
            slugs={["a350-airbus-ila", "b787-aircanada-approach", "b747-8-lufthansa"]}
            className="mt-3 flex flex-col gap-1 font-cockpit text-[11px] leading-relaxed text-[var(--ck-muted)]"
            linkClassName="text-[var(--ck-text)] underline decoration-[var(--ck-border)] underline-offset-2 hover:text-[var(--ck-accent)] focus-visible:outline-1 focus-visible:outline-[var(--ck-accent)]"
          />
          <p className="mt-3 font-plex text-xs text-[var(--ck-muted)]">Aircraft figures are rounded from manufacturer published data.</p>
        </div>
      </footer>
    </div>
  );
}
