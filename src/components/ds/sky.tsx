"use client";

import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import AircraftPhoto from "@/components/AircraftPhoto";
import { fmt, type Aircraft } from "@/lib/aircraft";
import { forceState, type ControlState } from "@/lib/states";

// Sky Minimal components: pills, soft shadows, lots of air.
// Horizon blue is for actions and focus; selection uses ink so blue keeps its meaning.

const ring = "foc:outline-2 foc:outline-offset-2 foc:outline-solid foc:outline-[var(--sk-accent)]";

const forced = (state?: ControlState) => (state && state !== "selected" ? forceState(state) : {});

export function SkButton({
  variant = "primary",
  state,
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary"; state?: ControlState }) {
  const v =
    variant === "primary"
      ? "bg-[var(--sk-accent)] text-white hov:bg-[var(--sk-accent-hover)] hov:shadow-[0_6px_16px_-6px_rgba(47,111,176,0.6)] prs:bg-[var(--sk-accent-press)] dis:bg-[#e6ecf2] dis:text-[#7d8a99]"
      : "bg-white text-[var(--sk-accent)] ring-1 ring-inset ring-[var(--sk-border)] hov:bg-[var(--sk-mist)] hov:ring-[var(--sk-control)] prs:bg-[#e2eaf3] prs:text-[var(--sk-accent-press)] dis:bg-white dis:text-[#a3afbc]";
  return (
    <button
      type="button"
      {...forceState(state)}
      {...rest}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-[background-color,box-shadow,transform] duration-150 prs:scale-[0.97] dis:cursor-not-allowed ${ring} ${v} ${className}`}
    >
      {children}
    </button>
  );
}

// Outlined, secondary action that navigates: Horizon Blue border and text on white.
export function SkOutlineLink({ href, state, children }: { href: string; state?: ControlState; children: ReactNode }) {
  return (
    <Link
      href={href}
      {...(state && state !== "selected" && state !== "disabled" ? { "data-state": state } : {})}
      className={`group inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-6 text-sm font-semibold text-[var(--sk-accent)] ring-1 ring-inset ring-[var(--sk-accent)] transition-[background-color,color,transform] duration-150 hov:bg-[var(--sk-mist)] prs:scale-[0.97] prs:bg-[#e2eaf3] prs:text-[var(--sk-accent-press)] ${ring}`}
    >
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

export function SkLink({ state, children }: { state?: ControlState; children: ReactNode }) {
  return (
    <a
      href={state === "disabled" ? undefined : "#"}
      aria-disabled={state === "disabled" || undefined}
      {...(state && state !== "disabled" ? { "data-state": state } : {})}
      onClick={(e) => e.preventDefault()}
      className={`group inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-[var(--sk-accent)] transition-colors hov:text-[var(--sk-accent-hover)] hov:underline hov:underline-offset-4 prs:text-[var(--sk-accent-press)] dis:text-[#a3afbc] ${ring}`}
    >
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}

const field =
  "h-11 w-full rounded-full bg-white px-5 text-sm text-[var(--sk-text)] outline-none ring-1 ring-inset ring-[var(--sk-control)] transition-shadow placeholder:text-[#6b7785] hov:ring-[var(--sk-muted)] foc:ring-2 foc:ring-[var(--sk-accent)] aria-invalid:ring-2 aria-invalid:ring-[var(--sk-error)] dis:cursor-not-allowed dis:bg-[var(--sk-mist)] dis:text-[#8a97a6] dis:ring-[var(--sk-border)]";

export function SkInput({
  label,
  placeholder,
  hint,
  error,
  state,
  defaultValue,
  icon,
}: {
  label: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  state?: ControlState;
  defaultValue?: string;
  icon?: boolean;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-2">
      <span className="text-xs font-semibold text-[var(--sk-text)]">{label}</span>
      <span className="relative">
        {icon && (
          <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--sk-muted)]">
            <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M13.5 13.5L18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
        <input
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          {...forceState(state)}
          className={`${field} ${icon ? "pl-11" : ""}`}
        />
      </span>
      {error ? <span className="text-xs text-[var(--sk-error)]">{error}</span> : hint ? <span className="text-xs text-[var(--sk-muted)]">{hint}</span> : null}
    </label>
  );
}

export function SkSelect({
  label,
  options,
  state,
  value,
  onChange,
  inline = false,
}: {
  label: string;
  options: string[];
  state?: ControlState;
  value?: string;
  onChange?: (v: string) => void;
  inline?: boolean; // label sits beside the field instead of above it
}) {
  return (
    <label className={`flex min-w-0 gap-2 ${inline ? "items-center gap-3" : "flex-col"}`}>
      <span className={`text-xs font-semibold text-[var(--sk-text)] ${inline ? "shrink-0" : ""}`}>{label}</span>
      <span className="relative">
        <select
          {...forceState(state)}
          {...(value !== undefined ? { value, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value) } : {})}
          className={`${field} cursor-pointer appearance-none pr-10`}
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <svg aria-hidden viewBox="0 0 12 8" className="pointer-events-none absolute right-5 top-1/2 h-2 w-3 -translate-y-1/2 text-[var(--sk-muted)]">
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>
    </label>
  );
}

export function SkCheckbox({ label, state, defaultChecked }: { label: string; state?: ControlState; defaultChecked?: boolean }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 text-sm text-[var(--sk-text)] has-disabled:cursor-not-allowed has-disabled:text-[#8a97a6]">
      <span className="relative inline-flex size-5 shrink-0">
        <input
          type="checkbox"
          defaultChecked={state === "selected" || defaultChecked}
          {...forced(state)}
          className={`peer size-5 appearance-none rounded-md bg-white ring-1 ring-inset ring-[var(--sk-control)] transition hov:ring-[var(--sk-muted)] prs:scale-90 sel:bg-[var(--sk-accent)] sel:ring-[var(--sk-accent)] dis:bg-[var(--sk-mist)] dis:ring-[var(--sk-border)] ${ring}`}
        />
        <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute inset-0 hidden text-white peer-checked:block">
          <path d="M5.5 10.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {label}
    </label>
  );
}

export function SkRadio({ name, label, state, defaultChecked }: { name: string; label: string; state?: ControlState; defaultChecked?: boolean }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 text-sm text-[var(--sk-text)] has-disabled:cursor-not-allowed has-disabled:text-[#8a97a6]">
      <input
        type="radio"
        name={name}
        defaultChecked={state === "selected" || defaultChecked}
        {...forced(state)}
        className={`size-5 shrink-0 appearance-none rounded-full bg-white ring-1 ring-inset ring-[var(--sk-control)] transition hov:ring-[var(--sk-muted)] prs:scale-90 sel:ring-[6px] sel:ring-[var(--sk-accent)] dis:bg-[var(--sk-mist)] dis:ring-[var(--sk-border)] ${ring}`}
      />
      {label}
    </label>
  );
}

export function SkToggle({ label, defaultOn = false, state }: { label: string; defaultOn?: boolean; state?: ControlState }) {
  const [on, setOn] = useState(state === "selected" || defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      {...forced(state)}
      className={`group inline-flex items-center gap-3 whitespace-nowrap rounded-full text-sm text-[var(--sk-text)] dis:cursor-not-allowed dis:text-[#8a97a6] ${ring}`}
    >
      <span className="relative h-[26px] w-11 shrink-0 rounded-full bg-[var(--sk-haze)] transition-colors group-hover:bg-[#c5d5e6] group-aria-checked:bg-[var(--sk-accent)] group-data-[state=hover]:bg-[#c5d5e6] group-disabled:bg-[var(--sk-mist)]">
        <span className="absolute left-[3px] top-[3px] size-5 rounded-full bg-white shadow-[0_1px_3px_rgba(24,33,44,0.25)] transition-transform group-active:scale-90 group-aria-checked:translate-x-[18px] group-data-[state=pressed]:scale-90" />
      </span>
      {label}
    </button>
  );
}

export function SkSegment({
  selected,
  state,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean; state?: ControlState; ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={state === "selected" || !!selected}
      {...forced(state)}
      {...rest}
      className={`h-9 whitespace-nowrap rounded-full px-5 text-sm text-[var(--sk-muted)] transition-[background-color,box-shadow,color] hov:text-[var(--sk-text)] prs:bg-[#dde6f0] sel:bg-white sel:font-semibold sel:text-[var(--sk-text)] sel:shadow-[0_1px_3px_rgba(24,33,44,0.12)] dis:cursor-not-allowed dis:text-[#a3afbc] ${ring}`}
    >
      {children}
    </button>
  );
}

export function SkTabs({
  options,
  value,
  onChange,
  ariaLabel = "Manufacturer",
  controls,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  ariaLabel?: string;
  controls?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function onKey(e: React.KeyboardEvent, i: number) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + options.length) % options.length;
    onChange(options[next]);
    refs.current[next]?.focus();
  }
  return (
    <div role="tablist" aria-label={ariaLabel} className="inline-flex max-w-full self-start rounded-full bg-[var(--sk-mist)] p-1">
      {options.map((o, i) => (
        <SkSegment
          key={o}
          ref={(el) => {
            refs.current[i] = el;
          }}
          selected={o === value}
          aria-controls={controls}
          onClick={() => onChange(o)}
          onKeyDown={(e) => onKey(e, i)}
          tabIndex={o === value ? 0 : -1}
        >
          {o}
        </SkSegment>
      ))}
    </div>
  );
}

export function SkChip({ state, defaultOn, children }: { state?: ControlState; defaultOn?: boolean; children: ReactNode }) {
  const [on, setOn] = useState(state === "selected" || !!defaultOn);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setOn(!on)}
      {...forced(state)}
      className={`inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-sm text-[var(--sk-text)] ring-1 ring-inset ring-[var(--sk-border)] transition-colors hov:ring-[var(--sk-control)] prs:bg-[var(--sk-mist)] sel:bg-[var(--sk-text)] sel:text-white sel:ring-[var(--sk-text)] dis:cursor-not-allowed dis:text-[#a3afbc] ${ring}`}
    >
      {on && (
        <svg aria-hidden viewBox="0 0 12 12" className="size-3">
          <path d="M2.5 6.5l2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  );
}

const badgeTone = {
  neutral: "bg-[var(--sk-mist)] text-[var(--sk-muted)]",
  success: "bg-[#e5f3eb] text-[var(--sk-success)]",
  warning: "bg-[#fbf0d9] text-[var(--sk-warning)]",
  error: "bg-[#fdeceb] text-[var(--sk-error)]",
};

export function SkBadge({ tone = "neutral", children }: { tone?: keyof typeof badgeTone; children: ReactNode }) {
  return <span className={`inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold ${badgeTone[tone]}`}>{children}</span>;
}

// Shared inside of the aircraft card, used by the clickable design-system card and the site's profile links.
function CardBody({ a, tagline, cta }: { a: Aircraft; tagline?: string; cta: string }) {
  return (
    <>
      <span className="relative block aspect-[3/2] overflow-hidden bg-[var(--sk-mist)] text-[var(--sk-control)]">
        <AircraftPhoto a={a} sizes="(min-width: 768px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-[1.03]" />
      </span>
      <span className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <span>
          <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sk-muted)]">
            {a.manufacturer} · {a.body} · {a.engines} engines
          </span>
          <span className="mt-1.5 block text-3xl font-light tracking-tight text-[var(--sk-text)]">{a.name}</span>
          {tagline && <span className="mt-1.5 block text-sm leading-relaxed text-[var(--sk-muted)]">{tagline}</span>}
        </span>
        <span className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[var(--sk-border)] pt-4 sm:grid-cols-4">
          {[
            ["Range", `${fmt(a.rangeKm)} km`],
            ["Seats", `${a.seats}`],
            ["Length", `${a.lengthM} m`],
            ["In service", `${a.firstService}`],
          ].map(([k, v]) => (
            <span key={k}>
              <span className="block text-xs text-[var(--sk-muted)]">{k}</span>
              <span className="text-sm font-semibold tabular-nums text-[var(--sk-text)]">{v}</span>
            </span>
          ))}
        </span>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--sk-muted)] transition-colors group-hover:text-[var(--sk-accent)] group-focus-visible:text-[var(--sk-accent)] group-aria-pressed:text-[var(--sk-accent)] group-data-[state=hover]:text-[var(--sk-accent)]">
          {cta}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </span>
    </>
  );
}

const cardShell = `group flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-white text-left ring-1 ring-[var(--sk-border)] transition-[box-shadow,transform] duration-200 hov:-translate-y-1 hov:shadow-[0_18px_40px_-18px_rgba(24,33,44,0.28)] prs:translate-y-0 prs:shadow-none sel:ring-2 sel:ring-[var(--sk-accent)] dis:cursor-not-allowed dis:opacity-50 ${ring}`;

export function SkCard({
  a,
  state,
  selected,
  onOpen,
}: {
  a: Aircraft;
  state?: ControlState;
  selected?: boolean;
  onOpen?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      {...(state === "selected" || selected ? { "aria-pressed": true } : {})}
      {...forced(state)}
      className={cardShell}
    >
      <CardBody a={a} cta="Details" />
    </button>
  );
}

// The site's version: a link to the aircraft's profile page.
export function SkProfileCard({ a, tagline, href }: { a: Aircraft; tagline: string; href: string }) {
  return (
    <Link href={href} className={cardShell}>
      <CardBody a={a} tagline={tagline} cta="View profile" />
    </Link>
  );
}

export function SkRow({ a, state, defaultSelected }: { a: Aircraft; state?: ControlState; defaultSelected?: boolean }) {
  return (
    <button
      type="button"
      {...(state === "selected" || defaultSelected ? { "aria-pressed": true } : {})}
      {...forced(state)}
      className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors hov:bg-[var(--sk-mist)] prs:bg-[#e2eaf3] sel:bg-[var(--sk-mist)] dis:cursor-not-allowed dis:opacity-50 ${ring}`}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--sk-mist)] text-xs font-semibold text-[var(--sk-muted)] group-aria-pressed:bg-white group-aria-pressed:text-[var(--sk-accent)]">
        {a.manufacturer[0]}
      </span>
      <span className="flex-1">
        <span className="block font-semibold text-[var(--sk-text)]">{a.name}</span>
        <span className="text-xs text-[var(--sk-muted)]">
          {a.manufacturer} · {a.body}
        </span>
      </span>
      <span className="text-sm tabular-nums text-[var(--sk-text)]">{fmt(a.rangeKm)} km</span>
      <svg aria-hidden viewBox="0 0 8 12" className="h-3 w-2 text-[var(--sk-control)] group-aria-pressed:text-[var(--sk-accent)]">
        <path d="M1.5 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  );
}

export function SkSheet({ a, onClose, headingId }: { a: Aircraft; onClose?: () => void; headingId?: string }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[28px] bg-white">
      <div className="relative aspect-[16/9] bg-[var(--sk-mist)]">
        <AircraftPhoto a={a} sizes="560px" />
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/90 text-[var(--sk-text)] shadow-[0_2px_8px_rgba(24,33,44,0.15)] transition hov:bg-white prs:scale-95 ${ring}`}
          >
            <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sk-accent)]">{a.manufacturer}</p>
          <h3 id={headingId} className="mt-1 text-3xl font-light tracking-tight text-[var(--sk-text)]">
            {a.name}
          </h3>
        </div>
        <p className="leading-relaxed text-[var(--sk-muted)]">{a.summary}</p>
        <dl className="grid grid-cols-3 gap-4 rounded-2xl bg-[var(--sk-mist)] p-4">
          {[
            ["Range", `${fmt(a.rangeKm)} km`],
            ["Seats", `${a.seats}`],
            ["Wingspan", `${a.spanM} m`],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs text-[var(--sk-muted)]">{k}</dt>
              <dd className="text-lg font-light text-[var(--sk-text)]">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-3">
          <SkButton>Add to shortlist</SkButton>
          {onClose && (
            <SkButton variant="secondary" onClick={onClose}>
              Close
            </SkButton>
          )}
        </div>
      </div>
    </div>
  );
}

// Native modal dialog: focus moves inside, Escape closes, focus returns to the trigger.
export function SkDialog({
  open,
  onClose,
  labelledBy,
  className = "max-w-lg",
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby={labelledBy}
      className={`m-auto max-h-[92dvh] w-[calc(100%-24px)] overflow-y-auto rounded-[28px] bg-white p-0 text-[var(--sk-text)] shadow-[0_32px_64px_-16px_rgba(24,33,44,0.35)] backdrop:bg-[rgba(238,243,248,0.75)] backdrop:backdrop-blur-sm ${className}`}
    >
      {children}
    </dialog>
  );
}

export function SkModal({ a, open, onClose }: { a: Aircraft; open: boolean; onClose: () => void }) {
  return (
    <SkDialog open={open} onClose={onClose} labelledBy="sk-modal-title" className="max-w-lg">
      <SkSheet a={a} onClose={onClose} headingId="sk-modal-title" />
    </SkDialog>
  );
}
