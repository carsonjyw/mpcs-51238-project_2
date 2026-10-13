import type { ReactNode } from "react";
import Link from "next/link";
import PhotoCredits from "@/components/PhotoCredits";
import {
  EdArticle,
  EdBadge,
  EdButton,
  EdCard,
  EdCheckbox,
  EdChip,
  EdInput,
  EdLink,
  EdRadio,
  EdRow,
  EdSelect,
  EdTab,
  EdToggle,
} from "@/components/ds/editorial";
import { getAircraft } from "@/lib/aircraft";
import { contrast, grade } from "@/lib/contrast";
import { archivo, instrumentSerif, newsreader } from "@/lib/fonts";
import { controlStates, type ControlState } from "@/lib/states";
import { editorialPalette as P, editorialTokens, edLabel } from "@/lib/tokens";
import { CardsDemo, ModalDemo, TabsDemo } from "./demos";

export const metadata = { title: "Aviation Editorial · Design System" };

const numerals = ["I", "II", "III", "IV", "V", "VI"];

function Section({ n, title, note, children }: { n: number; title: string; note: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`s${n}`} className="scroll-mt-8 border-t-2 border-[var(--ed-ink)] pt-6">
      <div className="mb-10 grid gap-4 lg:grid-cols-12">
        <p className="font-display text-6xl leading-none text-[var(--ed-accent)] lg:col-span-2">{numerals[n - 1]}</p>
        <div className="lg:col-span-6">
          <h2 id={`s${n}`} className="font-display text-5xl leading-none text-[var(--ed-ink)] sm:text-6xl">
            {title}
          </h2>
        </div>
        <p className="font-text text-lg italic leading-snug text-[var(--ed-muted)] lg:col-span-4">{note}</p>
      </div>
      {children}
    </section>
  );
}

function Block({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col gap-5 border-t border-[var(--ed-rule)] pt-4 ${className}`}>
      <p className={`${edLabel} text-[var(--ed-muted)]`}>{title}</p>
      {children}
    </div>
  );
}

const types = [
  { role: "Display", spec: "Instrument Serif 400 · 72/72 · italic for emphasis", note: "48/48 on mobile", sample: <span className="font-display text-5xl leading-none text-[var(--ed-ink)] sm:text-7xl">The last <em className="text-[var(--ed-accent)]">jumbo</em></span> },
  { role: "Heading", spec: "Instrument Serif 400 · 36/40", sample: <span className="font-display text-4xl leading-10 text-[var(--ed-ink)]">Boeing 747-8 Intercontinental</span> },
  { role: "Body", spec: "Newsreader 400 · 18/29 · italic for captions", sample: <span className="block max-w-xl font-text text-lg leading-[29px]">The 747-8 stretched the original jumbo by nearly six metres and gave it the engines of the 787. It was the last of the line.</span> },
  { role: "Label", spec: "Archivo SemiBold 600 · 11/16 · uppercase · +16%", sample: <span className={`${edLabel} text-[var(--ed-muted)]`}>Profile · Boeing · Since 2012</span> },
];

const stateRows: { name: string; wide?: boolean; render: (s: ControlState) => ReactNode }[] = [
  { name: "Primary button", render: (s) => (s === "selected" ? null : <EdButton state={s}>Read profile</EdButton>) },
  { name: "Secondary button", render: (s) => (s === "selected" ? null : <EdButton variant="secondary" state={s}>Save</EdButton>) },
  { name: "Tab", render: (s) => <EdTab state={s}>Airbus</EdTab> },
  { name: "Chip", render: (s) => <EdChip state={s}>Wide-body</EdChip> },
  { name: "Checkbox", render: (s) => <EdCheckbox label="Retired" state={s} /> },
  { name: "Link", render: (s) => (s === "selected" ? null : <EdLink state={s}>Continue reading</EdLink>) },
  { name: "Text field", wide: true, render: (s) => (s === "selected" ? null : <EdInput label="Search the archive" placeholder="747" state={s} />) },
  { name: "List row", wide: true, render: (s) => <EdRow a={getAircraft("747-8")} state={s} /> },
  { name: "Story card", wide: true, render: (s) => <div className="w-full max-w-xs"><EdCard a={getAircraft("a350-900")} state={s} /></div> },
];

export default function AviationEditorialSystem() {
  return (
    <div
      style={editorialTokens}
      className={`${instrumentSerif.variable} ${newsreader.variable} ${archivo.variable} min-h-full flex-1 bg-[var(--ed-bg)] font-text text-[var(--ed-text)]`}
    >
      <header className="mx-auto max-w-[1280px] px-5 pt-6 sm:px-10">
        <div className={`flex items-center justify-between border-b border-[var(--ed-text)] pb-3 ${edLabel}`}>
          <Link href="/" className="-mx-1 px-1 underline-offset-4 transition hover:text-[var(--ed-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--ed-accent)] active:text-[var(--ed-ink)]">
            ← Hub
          </Link>
          <span className="hidden sm:inline">Design system · No. 3 of 3</span>
          <Link href="/mood-boards/aviation-editorial" className="-mx-1 px-1 underline-offset-4 transition hover:text-[var(--ed-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--ed-accent)] active:text-[var(--ed-ink)]">
            Mood board →
          </Link>
        </div>
        <div className="grid gap-6 py-12 sm:py-16 lg:grid-cols-12 lg:items-end">
          <h1 className="font-display text-6xl leading-[0.9] text-[var(--ed-ink)] sm:text-8xl lg:col-span-8">
            Aviation <em className="text-[var(--ed-accent)]">Editorial</em>
            <span className="block text-3xl sm:text-4xl">a design system in six parts</span>
          </h1>
          <p className="text-lg leading-relaxed lg:col-span-4">
            Built from the mood board. Square corners, printed rules, and type that carries the
            interface. Rust is reserved for the action on the page.
          </p>
        </div>
      </header>

      <nav aria-label="Sections" className="mx-auto mb-14 max-w-[1280px] px-5 sm:px-10">
        <ol className="grid gap-x-8 border-y border-[var(--ed-rule)] py-3 sm:grid-cols-2 lg:grid-cols-3">
          {["Color roles", "Type roles", "Spacing and shape", "Components", "Control states", "UI states"].map((t, i) => (
            <li key={t}>
              <a
                href={`#s${i + 1}`}
                className="flex items-baseline gap-3 py-1.5 text-lg decoration-[var(--ed-accent)] underline-offset-4 transition hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ed-accent)] active:text-[var(--ed-accent)]"
              >
                <span className="w-8 font-display text-[var(--ed-accent)]">{numerals[i]}</span>
                {t}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <main className="mx-auto flex max-w-[1280px] flex-col gap-24 px-5 pb-28 sm:px-10">
        <Section n={1} title="Color roles" note="Ratios calculated against the paper background and the fine-paper surface used for cards and fields.">
          <div className="border-b border-[var(--ed-rule)]">
            {P.roles.map((r) => {
              const a = contrast(r.hex, P.background);
              const b = contrast(r.hex, P.surface);
              return (
                <div key={r.role} className="grid grid-cols-[56px_1fr] items-center gap-4 border-t border-[var(--ed-rule)] py-3 sm:grid-cols-[80px_200px_1fr_220px]">
                  <span className="h-12 border border-[var(--ed-rule)] sm:h-14" style={{ background: r.hex }} />
                  <span>
                    <span className="block font-display text-2xl leading-tight text-[var(--ed-ink)]">{r.role}</span>
                    <span className="font-label text-xs text-[var(--ed-muted)]">
                      {r.name} · {r.hex.toUpperCase()}
                    </span>
                  </span>
                  <span className="col-span-2 text-[17px] italic text-[var(--ed-muted)] sm:col-span-1">{r.use}</span>
                  <span className="col-span-2 flex justify-between gap-4 font-label text-xs tabular-nums sm:col-span-1">
                    <span>
                      Paper {a.toFixed(1)} · Surface {b.toFixed(1)}
                    </span>
                    <span className="font-semibold">{grade(Math.min(a, b))}</span>
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <span className={`${edLabel} text-[var(--ed-muted)]`}>Status, used sparingly</span>
            {P.semantic.map((r) => (
              <span key={r.role} className="flex items-baseline gap-2">
                <span className="font-display text-2xl" style={{ color: r.hex }}>
                  {r.role}
                </span>
                <span className="font-label text-xs tabular-nums text-[var(--ed-muted)]">{contrast(r.hex, P.background).toFixed(1)}:1</span>
              </span>
            ))}
          </div>
        </Section>

        <Section n={2} title="Type roles" note="A display serif with italics, a text serif for reading, and a grotesque for small labels.">
          <div className="border-b border-[var(--ed-rule)]">
            {types.map((t) => (
              <div key={t.role} className="grid gap-3 border-t border-[var(--ed-rule)] py-6 lg:grid-cols-[140px_1fr_260px] lg:items-baseline lg:gap-8">
                <p className={`${edLabel} text-[var(--ed-accent)]`}>{t.role}</p>
                <div className="min-w-0">{t.sample}</div>
                <p className="font-label text-xs leading-relaxed text-[var(--ed-muted)]">
                  {t.spec}
                  {t.note && <span className="block">{t.note}</span>}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section n={3} title="Spacing and shape" note="A print-style scale, no rounded corners, rules in place of boxes.">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            <Block title="Spacing scale">
              <div className="flex items-end gap-3">
                {[4, 8, 12, 16, 24, 40, 64, 96].map((s) => (
                  <span key={s} className="flex flex-col items-center gap-2">
                    <span className="w-3 bg-[var(--ed-ink)]" style={{ height: s * 0.7 }} />
                    <span className="font-label text-[10px] text-[var(--ed-muted)]">{s}</span>
                  </span>
                ))}
              </div>
              <p className="italic text-[var(--ed-muted)]">Generous gaps between stories, tight leading inside them.</p>
            </Block>
            <Block title="Corners and rules">
              <div className="flex flex-col gap-3">
                <span className="flex items-center gap-4 font-label text-xs"><span className="h-px w-16 bg-[var(--ed-rule)]" /> 1px Rule · between items</span>
                <span className="flex items-center gap-4 font-label text-xs"><span className="h-[2px] w-16 bg-[var(--ed-ink)]" /> 2px Ink · section and card tops</span>
                <span className="flex items-center gap-4 font-label text-xs"><span className="h-1 w-16 bg-[var(--ed-ink)]" /> 4px Ink · page top</span>
                <span className="flex items-center gap-4 font-label text-xs"><span className="size-8 border border-[var(--ed-ink)]" /> 0px corners, everywhere</span>
              </div>
            </Block>
            <Block title="Shadow">
              <div className="flex gap-6">
                <span className="grid h-20 flex-1 place-items-center border border-[var(--ed-rule)] font-label text-[10px] uppercase tracking-[0.14em] text-[var(--ed-muted)]">Flat · default</span>
                <span className="grid h-20 flex-1 place-items-center bg-[var(--ed-surface)] font-label text-[10px] uppercase tracking-[0.14em] text-[var(--ed-muted)] shadow-[0_1px_0_#cfc3b0,0_30px_60px_-24px_rgba(42,39,35,0.5)]">Lifted page</span>
              </div>
              <p className="italic text-[var(--ed-muted)]">Only an opened article lifts off the paper.</p>
            </Block>
          </div>
        </Section>

        <Section n={4} title="Components" note="Each one works. Click the stories, tab through the fields.">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-14">
            <Block title="Buttons and link">
              <div className="flex flex-wrap items-center gap-4">
                <EdButton>Read profile</EdButton>
                <EdButton variant="secondary">Save</EdButton>
                <EdButton disabled>Print</EdButton>
              </div>
              <p className="text-lg">
                The 777 changed long-haul. <EdLink>Continue reading</EdLink>
              </p>
            </Block>
            <Block title="Fields">
              <div className="grid gap-6 sm:grid-cols-2">
                <EdInput label="Search the archive" placeholder="e.g. Dreamliner" hint="Model, maker, or year" />
                <EdSelect label="Order by" options={["Year of service", "Range", "Name"]} />
                <EdInput label="First flown after" defaultValue="1890" error="The first jet airliner flew in 1949." />
                <EdInput label="Issue" placeholder="Autumn" state="disabled" />
              </div>
            </Block>
            <Block title="Checkbox, radio, toggle">
              <div className="grid gap-6 sm:grid-cols-3">
                <fieldset className="flex flex-col gap-2">
                  <legend className={`mb-2 ${edLabel} text-[var(--ed-muted)]`}>Include</legend>
                  <EdCheckbox label="In service" defaultChecked />
                  <EdCheckbox label="Retired" />
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                  <legend className={`mb-2 ${edLabel} text-[var(--ed-muted)]`}>Units</legend>
                  <EdRadio name="ed-units" label="Metric" defaultChecked />
                  <EdRadio name="ed-units" label="Imperial" />
                </fieldset>
                <div className="flex flex-col gap-2">
                  <p className={`mb-2 ${edLabel} text-[var(--ed-muted)]`}>Display</p>
                  <EdToggle label="Photographs" defaultOn />
                  <EdToggle label="Captions" />
                </div>
              </div>
            </Block>
            <Block title="Tabs, chips, badges">
              <TabsDemo />
              <div className="flex flex-wrap gap-2">
                <EdChip defaultOn>Wide-body</EdChip>
                <EdChip>Narrow-body</EdChip>
                <EdChip>Four engines</EdChip>
              </div>
              <div className="flex flex-wrap gap-4">
                <EdBadge tone="success">In production</EdBadge>
                <EdBadge tone="warning">Production ended</EdBadge>
                <EdBadge>Since 2004</EdBadge>
              </div>
            </Block>
            <Block title="Aircraft cards, as stories · click to open" className="lg:col-span-2">
              <CardsDemo />
            </Block>
            <Block title="List rows, as a contents page">
              <div className="border-t border-[var(--ed-rule)]">
                {["a320neo", "737-max-8", "787-9", "747-8"].map((id, i) => (
                  <EdRow key={id} a={getAircraft(id)} defaultSelected={i === 2} />
                ))}
              </div>
            </Block>
            <Block title="Detail panel, as a magazine page">
              <ModalDemo />
              <p className="italic text-[var(--ed-muted)]">The full page is shown below, as it appears when opened.</p>
            </Block>
            <div className="lg:col-span-2">
              <EdArticle a={getAircraft("787-9")} />
            </div>
          </div>
        </Section>

        <Section n={5} title="Control states" note="Each state forced on. Focus is a 2px rust outline set three points off the type.">
          <div className="border-b border-[var(--ed-rule)]">
            {stateRows.map((row) => (
              <div key={row.name} className="border-t border-[var(--ed-rule)] py-6">
                <p className="mb-4 font-display text-2xl text-[var(--ed-ink)]">{row.name}</p>
                <div className={`grid gap-x-6 gap-y-6 ${row.wide ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"}`}>
                  {controlStates.map((s) => (
                    <div key={s} className="flex min-w-0 flex-col items-start gap-2.5">
                      <span className={`${edLabel} text-[var(--ed-muted)]`}>{s}</span>
                      {row.render(s) ?? <span className="italic text-[var(--ed-muted)]">Not used</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section n={6} title="UI states" note="Written like a magazine would: in sentences, with a little personality.">
          <div className="grid gap-12 sm:grid-cols-2 lg:gap-8">
            <Block title="Empty">
              <p className="font-display text-4xl leading-tight text-[var(--ed-ink)]">
                Nothing in the archive <em>matches.</em>
              </p>
              <p className="text-lg italic text-[var(--ed-muted)]">No four-engine narrow-bodies were ever built. Try removing a filter.</p>
              <div>
                <EdButton variant="secondary">Clear filters</EdButton>
              </div>
            </Block>
            <Block title="Loading">
              <div role="status" aria-label="Loading the story" className="flex flex-col gap-3">
                <p className="text-lg italic text-[var(--ed-muted)]">Setting the type…</p>
                <span className="h-9 w-3/4 animate-pulse bg-[var(--ed-deep)]" />
                {[100, 100, 92, 60].map((w, i) => (
                  <span key={i} className="h-3 animate-pulse bg-[var(--ed-deep)]" style={{ width: `${w}%` }} />
                ))}
              </div>
            </Block>
            <Block title="Error">
              <div role="alert" className="border-l-4 border-[var(--ed-error)] pl-5">
                <p className="font-display text-3xl text-[var(--ed-error)]">This page went missing.</p>
                <p className="mt-2 text-lg">We couldn’t fetch the 747-8 profile. Nothing you saved was lost.</p>
                <p className="mt-3">
                  <EdLink>Try again</EdLink>
                </p>
              </div>
            </Block>
            <Block title="Success">
              <div role="status" className="flex items-baseline gap-4 border-y-2 border-[var(--ed-success)] py-4">
                <span className={`${edLabel} text-[var(--ed-success)]`}>Saved</span>
                <p className="text-lg">
                  <em>Carbon and quiet</em> is on your reading list.
                </p>
              </div>
            </Block>
          </div>
        </Section>
      </main>

      <footer className="border-t border-[var(--ed-text)]">
        <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-10">
          <h2 className={`${edLabel}`}>Photo credits</h2>
          <PhotoCredits
            slugs={["b777-alitalia", "a380-lufthansa-landing", "a350-delta-flight", "b787-aircanada-approach"]}
            className="mt-4 flex flex-col gap-1.5 text-[13px] leading-relaxed text-[var(--ed-muted)]"
            linkClassName="text-[var(--ed-text)] underline decoration-[var(--ed-rule)] underline-offset-2 hover:decoration-[var(--ed-accent)] focus-visible:outline-2 focus-visible:outline-[var(--ed-accent)]"
          />
          <p className="mt-3 text-[13px] italic text-[var(--ed-muted)]">Aircraft figures are rounded from manufacturer published data.</p>
        </div>
      </footer>
    </div>
  );
}
