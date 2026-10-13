"use client";

import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import AircraftPhoto from "@/components/AircraftPhoto";
import { fmt, type Aircraft } from "@/lib/aircraft";
import { forceState, type ControlState } from "@/lib/states";
import { edLabel } from "@/lib/tokens";

// Aviation Editorial components: square corners, printed rules, type doing the work.
// Rust is the accent for actions and selection; ink navy is for headlines.

const ring = "foc:outline-2 foc:outline-offset-[3px] foc:outline-solid foc:outline-[var(--ed-accent)]";
const forced = (state?: ControlState) => (state && state !== "selected" ? forceState(state) : {});

export function EdButton({
  variant = "primary",
  state,
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary"; state?: ControlState }) {
  const v =
    variant === "primary"
      ? "bg-[var(--ed-accent)] text-[var(--ed-surface)] hov:bg-[var(--ed-accent-hover)] prs:bg-[var(--ed-accent-press)] dis:bg-[var(--ed-deep)] dis:text-[#9a8f80]"
      : "border border-[var(--ed-ink)] text-[var(--ed-ink)] hov:bg-[var(--ed-ink)] hov:text-[var(--ed-surface)] prs:bg-[#121b30] prs:text-[var(--ed-surface)] dis:border-[var(--ed-rule)] dis:text-[#9a8f80]";
  return (
    <button
      type="button"
      {...forceState(state)}
      {...rest}
      className={`inline-flex h-11 items-center justify-center px-6 ${edLabel} transition-colors prs:translate-y-px dis:cursor-not-allowed ${ring} ${v} ${className}`}
    >
      {children}
    </button>
  );
}

export function EdLink({ state, children }: { state?: ControlState; children: ReactNode }) {
  return (
    <a
      href={state === "disabled" ? undefined : "#"}
      aria-disabled={state === "disabled" || undefined}
      {...(state && state !== "disabled" ? { "data-state": state } : {})}
      onClick={(e) => e.preventDefault()}
      className={`font-text text-lg italic text-[var(--ed-ink)] underline decoration-[var(--ed-accent)] decoration-1 underline-offset-4 transition-[text-decoration-thickness,color] hov:decoration-2 hov:text-[var(--ed-accent)] prs:text-[var(--ed-accent-press)] dis:text-[#9a8f80] dis:decoration-[var(--ed-rule)] ${ring}`}
    >
      {children}
    </a>
  );
}

const fieldLine =
  "w-full border-0 border-b border-[var(--ed-control)] bg-transparent px-0 pb-2 pt-1 font-text text-xl text-[var(--ed-text)] outline-none transition-colors placeholder:italic placeholder:text-[#7a7064] hov:border-[var(--ed-text)] foc:border-b-2 foc:border-[var(--ed-accent)] aria-invalid:border-b-2 aria-invalid:border-[var(--ed-error)] dis:cursor-not-allowed dis:border-dotted dis:text-[#9a8f80]";

export function EdInput({
  label,
  placeholder,
  hint,
  error,
  state,
  defaultValue,
}: {
  label: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  state?: ControlState;
  defaultValue?: string;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className={`${edLabel} text-[var(--ed-muted)]`}>{label}</span>
      <input placeholder={placeholder} defaultValue={defaultValue} aria-invalid={error ? true : undefined} {...forceState(state)} className={fieldLine} />
      {error ? <span className="font-text text-sm italic text-[var(--ed-error)]">{error}</span> : hint ? <span className="font-text text-sm italic text-[var(--ed-muted)]">{hint}</span> : null}
    </label>
  );
}

export function EdSelect({ label, options, state }: { label: string; options: string[]; state?: ControlState }) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className={`${edLabel} text-[var(--ed-muted)]`}>{label}</span>
      <span className="relative">
        <select {...forceState(state)} className={`${fieldLine} cursor-pointer appearance-none pr-8 [&_option]:bg-[var(--ed-surface)]`}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none absolute right-0 top-1 font-text text-xl text-[var(--ed-accent)]">
          ↓
        </span>
      </span>
    </label>
  );
}

export function EdCheckbox({ label, state, defaultChecked }: { label: string; state?: ControlState; defaultChecked?: boolean }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 font-text text-lg text-[var(--ed-text)] has-disabled:cursor-not-allowed has-disabled:text-[#9a8f80]">
      <span className="relative inline-flex size-[18px] shrink-0">
        <input
          type="checkbox"
          defaultChecked={state === "selected" || defaultChecked}
          {...forced(state)}
          className={`peer size-[18px] appearance-none border border-[var(--ed-control)] bg-[var(--ed-surface)] transition-colors hov:border-[var(--ed-text)] prs:bg-[var(--ed-deep)] sel:border-[var(--ed-accent)] sel:bg-[var(--ed-accent)] dis:border-[var(--ed-rule)] dis:bg-transparent ${ring}`}
        />
        <svg aria-hidden viewBox="0 0 18 18" className="pointer-events-none absolute inset-0 hidden text-[var(--ed-surface)] peer-checked:block">
          <path d="M4 9.5l3.2 3L14 5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </span>
      {label}
    </label>
  );
}

export function EdRadio({ name, label, state, defaultChecked }: { name: string; label: string; state?: ControlState; defaultChecked?: boolean }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 font-text text-lg text-[var(--ed-text)] has-disabled:cursor-not-allowed has-disabled:text-[#9a8f80]">
      <span className="relative inline-flex size-[18px] shrink-0">
        <input
          type="radio"
          name={name}
          defaultChecked={state === "selected" || defaultChecked}
          {...forced(state)}
          className={`peer size-[18px] appearance-none rounded-full border border-[var(--ed-control)] bg-[var(--ed-surface)] transition-colors hov:border-[var(--ed-text)] prs:bg-[var(--ed-deep)] sel:border-[var(--ed-accent)] dis:border-[var(--ed-rule)] ${ring}`}
        />
        <span aria-hidden className="pointer-events-none absolute inset-1 hidden rounded-full bg-[var(--ed-accent)] peer-checked:block" />
      </span>
      {label}
    </label>
  );
}

// Toggle set as type: "Photographs  On / Off", the live word underlined in rust.
export function EdToggle({ label, defaultOn = false, state }: { label: string; defaultOn?: boolean; state?: ControlState }) {
  const [on, setOn] = useState(state === "selected" || defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      {...forced(state)}
      className={`group inline-flex items-baseline gap-3 whitespace-nowrap px-0.5 font-text text-lg text-[var(--ed-text)] hov:text-[var(--ed-ink)] prs:translate-y-px dis:cursor-not-allowed dis:text-[#9a8f80] ${ring}`}
    >
      {label}
      <span className={`${edLabel} text-[var(--ed-muted)]`}>
        <span className="group-aria-checked:text-[var(--ed-accent)] group-aria-checked:underline group-aria-checked:decoration-2 group-aria-checked:underline-offset-4">On</span>
        <span className="px-1.5">/</span>
        <span className="underline decoration-2 underline-offset-4 group-aria-checked:no-underline group-disabled:no-underline">Off</span>
      </span>
    </button>
  );
}

export function EdTab({ selected, state, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean; state?: ControlState }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={state === "selected" || !!selected}
      {...forced(state)}
      {...rest}
      className={`font-display text-3xl text-[var(--ed-muted)] decoration-2 underline-offset-[6px] transition-colors hov:text-[var(--ed-ink)] prs:text-[var(--ed-accent-press)] sel:text-[var(--ed-ink)] sel:underline sel:decoration-[var(--ed-accent)] dis:cursor-not-allowed dis:text-[#a89d8e] ${ring}`}
    >
      {children}
    </button>
  );
}

export function EdTabs({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="tablist" aria-label="Manufacturer" className="flex flex-wrap items-baseline gap-x-3">
      {options.map((o, i) => (
        <span key={o} className="flex items-baseline gap-3">
          {i > 0 && (
            <span aria-hidden className="font-display text-3xl text-[var(--ed-rule)]">
              /
            </span>
          )}
          <EdTab selected={o === value} tabIndex={o === value ? 0 : -1} onClick={() => onChange(o)}>
            {o}
          </EdTab>
        </span>
      ))}
    </div>
  );
}

export function EdChip({ state, defaultOn, children }: { state?: ControlState; defaultOn?: boolean; children: ReactNode }) {
  const [on, setOn] = useState(state === "selected" || !!defaultOn);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setOn(!on)}
      {...forced(state)}
      className={`inline-flex h-8 items-center border border-[var(--ed-rule)] px-3 ${edLabel} text-[var(--ed-muted)] transition-colors hov:border-[var(--ed-text)] hov:text-[var(--ed-text)] prs:bg-[var(--ed-deep)] sel:border-[var(--ed-ink)] sel:bg-[var(--ed-ink)] sel:text-[var(--ed-surface)] dis:cursor-not-allowed dis:text-[#a89d8e] ${ring}`}
    >
      {children}
    </button>
  );
}

const badgeTone = {
  neutral: "border-[var(--ed-rule)] text-[var(--ed-muted)]",
  success: "border-[var(--ed-success)] text-[var(--ed-success)]",
  warning: "border-[var(--ed-warning)] text-[var(--ed-warning)]",
  error: "border-[var(--ed-error)] text-[var(--ed-error)]",
};

export function EdBadge({ tone = "neutral", children }: { tone?: keyof typeof badgeTone; children: ReactNode }) {
  return <span className={`inline-flex items-center border-y px-0.5 py-0.5 font-label text-[10px] font-semibold uppercase tracking-[0.18em] ${badgeTone[tone]}`}>{children}</span>;
}

// Story card: an aircraft presented like a magazine teaser.
export function EdCard({ a, state, onOpen, kicker }: { a: Aircraft; state?: ControlState; onOpen?: () => void; kicker?: string }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      {...(state === "selected" ? { "aria-pressed": true } : {})}
      {...forced(state)}
      className={`group flex w-full flex-col border-t-2 border-[var(--ed-ink)] pt-4 text-left transition-colors prs:translate-y-px sel:border-[var(--ed-accent)] dis:cursor-not-allowed dis:opacity-50 ${ring}`}
    >
      <span className="relative block aspect-[3/2] overflow-hidden bg-[var(--ed-deep)]">
        <AircraftPhoto a={a} sizes="(min-width: 1024px) 33vw, 100vw" className="transition-transform duration-500 group-hover:scale-[1.03] group-data-[state=hover]:scale-[1.03]" />
      </span>
      <span className={`mt-4 ${edLabel} text-[var(--ed-accent)]`}>{kicker ?? `${a.manufacturer} · ${a.body}`}</span>
      <span className="mt-1 font-display text-3xl leading-tight text-[var(--ed-ink)] decoration-[var(--ed-accent)] decoration-2 underline-offset-4 group-hover:underline group-data-[state=hover]:underline group-aria-pressed:underline">
        {a.manufacturer} {a.name}
      </span>
      <span className="mt-2 font-text text-[17px] leading-snug text-[var(--ed-muted)]">{a.summary}</span>
      <span className="mt-3 font-label text-xs tabular-nums text-[var(--ed-text)]">
        {fmt(a.rangeKm)} km · {a.seats} seats · {a.firstService}
      </span>
    </button>
  );
}

// List row: a contents-page line with a dotted leader.
export function EdRow({ a, state, defaultSelected }: { a: Aircraft; state?: ControlState; defaultSelected?: boolean }) {
  return (
    <button
      type="button"
      {...(state === "selected" || defaultSelected ? { "aria-pressed": true } : {})}
      {...forced(state)}
      className={`group flex w-full items-baseline gap-3 border-b border-[var(--ed-rule)] py-3 text-left transition-colors hov:bg-[var(--ed-deep)]/50 prs:bg-[var(--ed-deep)] dis:cursor-not-allowed dis:opacity-50 ${ring}`}
    >
      <span className={`w-14 shrink-0 ${edLabel} text-[var(--ed-muted)] group-aria-pressed:text-[var(--ed-accent)]`}>{a.manufacturer === "Airbus" ? "AIR" : "BOE"}</span>
      <span className="font-text text-xl text-[var(--ed-text)] group-aria-pressed:italic group-aria-pressed:text-[var(--ed-accent)]">{a.name}</span>
      <span aria-hidden className="min-w-6 flex-1 border-b border-dotted border-[var(--ed-control)]" />
      <span className="font-label text-sm tabular-nums text-[var(--ed-text)]">{fmt(a.rangeKm)} km</span>
    </button>
  );
}

// Detail sheet: a single magazine page.
export function EdArticle({ a, onClose, headingId }: { a: Aircraft; onClose?: () => void; headingId?: string }) {
  return (
    <article className="border-t-4 border-[var(--ed-ink)] bg-[var(--ed-surface)]">
      <div className="flex items-center justify-between border-b border-[var(--ed-rule)] px-6 py-3">
        <span className={`${edLabel} text-[var(--ed-muted)]`}>Profile · {a.manufacturer}</span>
        {onClose && (
          <button type="button" onClick={onClose} className={`${edLabel} text-[var(--ed-ink)] underline decoration-[var(--ed-accent)] underline-offset-4 hov:text-[var(--ed-accent)] ${ring}`}>
            Close ×
          </button>
        )}
      </div>
      <div className="grid gap-6 p-6 sm:grid-cols-[1fr_1.1fr] sm:p-8">
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ed-deep)] sm:aspect-auto"><AircraftPhoto a={a} sizes="400px" /></div>
        <div className="flex flex-col gap-4">
          <h3 id={headingId} className="font-display text-5xl leading-none text-[var(--ed-ink)]">
            {a.name}
          </h3>
          <div className="flex flex-wrap gap-3">
            <EdBadge tone={a.inProduction ? "success" : "warning"}>{a.inProduction ? "In production" : "Production ended"}</EdBadge>
            <EdBadge>Since {a.firstService}</EdBadge>
          </div>
          <p className="font-text text-[17px] leading-relaxed first-letter:float-left first-letter:mr-1.5 first-letter:font-display first-letter:text-5xl first-letter:leading-[0.85] first-letter:text-[var(--ed-accent)]">
            {a.summary}
          </p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[var(--ed-rule)] pt-4">
            {[
              ["Range", `${fmt(a.rangeKm)} km`],
              ["Seats", `${a.seats}`],
              ["Length", `${a.lengthM} m`],
              ["Wingspan", `${a.spanM} m`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className={`${edLabel} text-[var(--ed-muted)]`}>{k}</dt>
                <dd className="font-display text-3xl text-[var(--ed-ink)]">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-2">
            <EdButton>Save to reading list</EdButton>
          </div>
        </div>
      </div>
    </article>
  );
}

export function EdModal({ a, onClose }: { a: Aircraft; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="ed-modal-title"
      className="m-auto max-h-[90dvh] w-[calc(100%-32px)] max-w-3xl overflow-y-auto bg-transparent p-0 shadow-[0_1px_0_#cfc3b0,0_30px_60px_-24px_rgba(42,39,35,0.5)] backdrop:bg-[rgba(42,39,35,0.45)]"
    >
      <EdArticle a={a} onClose={onClose} headingId="ed-modal-title" />
    </dialog>
  );
}
