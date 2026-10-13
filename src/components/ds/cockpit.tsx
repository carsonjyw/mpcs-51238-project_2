"use client";

import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import AircraftPhoto from "@/components/AircraftPhoto";
import { fmt, type Aircraft } from "@/lib/aircraft";
import { forceState, type ControlState } from "@/lib/states";

// Cockpit Dark components. Colors come from cockpitTokens (src/lib/tokens.ts),
// set as CSS variables on the page wrapper.
// Cyan is reserved for actions, selection, and focus. Green, amber, and red
// only appear as status.

const ring =
  "foc:outline-2 foc:outline-offset-2 foc:outline-solid foc:outline-[var(--ck-accent)] foc:shadow-[0_0_14px_rgba(95,212,230,0.35)]";

const label = "font-cockpit text-[11px] font-medium uppercase tracking-[0.14em]";

/* Buttons */

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  state?: ControlState;
};

const buttonVariants = {
  primary:
    "bg-[var(--ck-accent)] text-[var(--ck-void)] hov:bg-[var(--ck-accent-hover)] prs:bg-[var(--ck-accent-press)] dis:bg-[#1c2636] dis:text-[#64738a]",
  secondary:
    "border border-[var(--ck-control)] text-[var(--ck-text)] hov:border-[var(--ck-muted)] hov:bg-[var(--ck-raised)] prs:bg-[#1d2a3f] sel:border-[var(--ck-accent)] sel:text-[var(--ck-accent)] dis:border-[var(--ck-border)] dis:text-[#64738a]",
};

export function CkButton({ variant = "primary", state, className = "", children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      {...forceState(state)}
      {...rest}
      className={`inline-flex h-10 select-none items-center justify-center gap-2 rounded-[2px] px-4 ${label} transition-[background-color,border-color,color,transform] duration-100 prs:translate-y-px dis:cursor-not-allowed ${ring} ${buttonVariants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

/* Link */

export function CkLink({ href = "#", state, children }: { href?: string; state?: ControlState; children: ReactNode }) {
  const disabled = state === "disabled";
  return (
    <a
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      {...(state && state !== "disabled" ? { "data-state": state } : {})}
      onClick={(e) => href === "#" && e.preventDefault()}
      className={`inline-flex items-center gap-1 rounded-[1px] font-plex text-sm text-[var(--ck-accent)] underline decoration-[var(--ck-accent)]/40 underline-offset-4 transition-colors hov:decoration-[var(--ck-accent)] prs:text-[var(--ck-accent-press)] dis:text-[#64738a] dis:no-underline ${ring}`}
    >
      {children}
    </a>
  );
}

/* Text input */

export function CkInput({
  label: text,
  placeholder,
  hint,
  error,
  state,
  defaultValue,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  state?: ControlState;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className={`${label} text-[var(--ck-muted)]`}>{text}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        {...forceState(state)}
        className="h-10 w-full rounded-[2px] border border-[var(--ck-control)] bg-[var(--ck-void)] px-3 font-plex text-sm text-[var(--ck-text)] outline-none transition-colors placeholder:text-[#7f8da3] hov:border-[var(--ck-muted)] foc:border-[var(--ck-accent)] foc:shadow-[0_0_0_1px_var(--ck-accent),0_0_14px_rgba(95,212,230,0.25)] aria-invalid:border-[var(--ck-warning)] dis:cursor-not-allowed dis:border-[var(--ck-border)] dis:text-[#64738a]"
      />
      {error ? (
        <span className="font-plex text-xs text-[var(--ck-warning)]">{error}</span>
      ) : hint ? (
        <span className="font-plex text-xs text-[var(--ck-muted)]">{hint}</span>
      ) : null}
    </label>
  );
}

/* Select */

export function CkSelect({
  label: text,
  options,
  state,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  state?: ControlState;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className={`${label} text-[var(--ck-muted)]`}>{text}</span>
      <span className="relative">
        <select
          {...forceState(state)}
          {...(value !== undefined ? { value, onChange: (e) => onChange?.(e.target.value) } : {})}
          className="h-10 w-full cursor-pointer appearance-none rounded-[2px] border border-[var(--ck-control)] bg-[var(--ck-void)] pl-3 pr-9 font-cockpit text-xs uppercase tracking-[0.08em] text-[var(--ck-text)] outline-none transition-colors hov:border-[var(--ck-muted)] foc:border-[var(--ck-accent)] foc:shadow-[0_0_0_1px_var(--ck-accent),0_0_14px_rgba(95,212,230,0.25)] dis:cursor-not-allowed dis:border-[var(--ck-border)] dis:text-[#64738a] [&_option]:bg-[var(--ck-surface)]"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg aria-hidden viewBox="0 0 10 6" className="pointer-events-none absolute right-3 top-1/2 h-1.5 w-2.5 -translate-y-1/2 text-[var(--ck-muted)]">
          <path d="M0 0h10L5 6z" fill="currentColor" />
        </svg>
      </span>
    </label>
  );
}

/* Checkbox and radio: native inputs, drawn as instrument switches */

export function CkCheckbox({ label: text, state, defaultChecked }: { label: string; state?: ControlState; defaultChecked?: boolean }) {
  const checked = state === "selected" || defaultChecked;
  const forced = state && state !== "selected" ? forceState(state) : {};
  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5 font-plex text-sm text-[var(--ck-text)] has-disabled:cursor-not-allowed has-disabled:text-[#64738a]">
      <span className="relative inline-flex size-[18px] shrink-0">
        <input
          type="checkbox"
          defaultChecked={checked}
          {...forced}
          className={`peer size-[18px] appearance-none rounded-[1px] border border-[var(--ck-control)] bg-[var(--ck-void)] transition-colors hov:border-[var(--ck-muted)] prs:bg-[var(--ck-raised)] sel:border-[var(--ck-accent)] sel:bg-[var(--ck-accent)] dis:border-[var(--ck-border)] dis:bg-transparent ${ring}`}
        />
        <svg aria-hidden viewBox="0 0 18 18" className="pointer-events-none absolute inset-0 hidden text-[var(--ck-void)] peer-checked:block">
          <path d="M4.5 9.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
      {text}
    </label>
  );
}

export function CkRadio({
  name,
  label: text,
  state,
  defaultChecked,
}: {
  name: string;
  label: string;
  state?: ControlState;
  defaultChecked?: boolean;
}) {
  const checked = state === "selected" || defaultChecked;
  const forced = state && state !== "selected" ? forceState(state) : {};
  return (
    <label className="inline-flex cursor-pointer items-center gap-2.5 font-plex text-sm text-[var(--ck-text)] has-disabled:cursor-not-allowed has-disabled:text-[#64738a]">
      <span className="relative inline-flex size-[18px] shrink-0">
        <input
          type="radio"
          name={name}
          defaultChecked={checked}
          {...forced}
          className={`peer size-[18px] appearance-none rounded-full border border-[var(--ck-control)] bg-[var(--ck-void)] transition-colors hov:border-[var(--ck-muted)] prs:bg-[var(--ck-raised)] sel:border-[var(--ck-accent)] dis:border-[var(--ck-border)] ${ring}`}
        />
        <span aria-hidden className="pointer-events-none absolute inset-[5px] hidden rounded-full bg-[var(--ck-accent)] shadow-[0_0_6px_var(--ck-accent)] peer-checked:block" />
      </span>
      {text}
    </label>
  );
}

/* Toggle: a guarded switch with an ON/OFF readout */

export function CkToggle({ label: text, defaultOn = false, state }: { label: string; defaultOn?: boolean; state?: ControlState }) {
  const [on, setOn] = useState(state === "selected" || defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      {...(state && state !== "selected" ? forceState(state) : {})}
      className={`group inline-flex items-center gap-3 whitespace-nowrap rounded-[2px] px-1 py-1 font-plex text-sm text-[var(--ck-text)] transition-colors hov:bg-[var(--ck-raised)] dis:cursor-not-allowed dis:text-[#64738a] ${ring}`}
    >
      <span className="relative h-5 w-10 shrink-0 rounded-[2px] border border-[var(--ck-control)] bg-[var(--ck-void)] transition-colors group-aria-checked:border-[var(--ck-accent)] group-disabled:border-[var(--ck-border)] group-data-[state=pressed]:bg-[var(--ck-raised)] group-active:bg-[var(--ck-raised)]">
        <span className="absolute left-[3px] top-[3px] size-3 rounded-[1px] bg-[var(--ck-muted)] transition-transform group-aria-checked:translate-x-5 group-aria-checked:bg-[var(--ck-accent)] group-aria-checked:shadow-[0_0_8px_var(--ck-accent)] group-disabled:bg-[#34425a]" />
      </span>
      {text}
      <span className="w-7 font-cockpit text-[10px] text-[var(--ck-muted)] group-aria-checked:text-[var(--ck-accent)] group-disabled:text-[#64738a]">
        {on ? "ON" : "OFF"}
      </span>
    </button>
  );
}

/* Tabs: hardware selector with an indicator lamp, keyboard arrow support */

export function CkTab({
  selected,
  state,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean; state?: ControlState; ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={state === "selected" || selected ? true : false}
      tabIndex={selected || state ? 0 : -1}
      {...(state && state !== "selected" ? forceState(state) : {})}
      {...rest}
      className={`group flex h-9 items-center gap-2 px-3.5 ${label} text-[var(--ck-muted)] transition-colors hov:bg-[var(--ck-raised)] hov:text-[var(--ck-text)] prs:bg-[#1d2a3f] sel:bg-[var(--ck-raised)] sel:text-[var(--ck-accent)] dis:cursor-not-allowed dis:text-[#4f5d73] ${ring} focus-visible:z-10 data-[state=focus]:z-10`}
    >
      <span className="size-1.5 rounded-full bg-[var(--ck-border)] group-aria-selected:bg-[var(--ck-accent)] group-aria-selected:shadow-[0_0_6px_var(--ck-accent)]" />
      {children}
    </button>
  );
}

export function CkTabs({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  ariaLabel: string;
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
    <div role="tablist" aria-label={ariaLabel} className="inline-flex max-w-full self-start divide-x divide-[var(--ck-border)] border border-[var(--ck-control)] bg-[var(--ck-void)]">
      {options.map((o, i) => (
        <CkTab
          key={o}
          ref={(el) => {
            refs.current[i] = el;
          }}
          selected={o === value}
          onClick={() => onChange(o)}
          onKeyDown={(e) => onKey(e, i)}
        >
          {o}
        </CkTab>
      ))}
    </div>
  );
}

/* Filter chip */

export function CkChip({
  pressed,
  onToggle,
  state,
  children,
}: {
  pressed?: boolean;
  onToggle?: () => void;
  state?: ControlState;
  children: ReactNode;
}) {
  const [local, setLocal] = useState(false);
  const isOn = state === "selected" || (pressed ?? local);
  return (
    <button
      type="button"
      aria-pressed={isOn}
      onClick={() => (onToggle ? onToggle() : setLocal(!local))}
      {...(state && state !== "selected" ? forceState(state) : {})}
      className={`group inline-flex h-8 items-center gap-2 rounded-[2px] border border-[var(--ck-border)] bg-[var(--ck-surface)] px-3 font-cockpit text-[11px] uppercase tracking-[0.1em] text-[var(--ck-muted)] transition-colors hov:border-[var(--ck-control)] hov:text-[var(--ck-text)] prs:bg-[var(--ck-raised)] sel:border-[var(--ck-accent)] sel:bg-[rgba(95,212,230,0.08)] sel:text-[var(--ck-accent)] dis:cursor-not-allowed dis:text-[#4f5d73] ${ring}`}
    >
      <span aria-hidden className="size-2 border border-current group-aria-pressed:bg-[var(--ck-accent)]" />
      {children}
    </button>
  );
}

/* Badge: status only */

const badgeTone = {
  neutral: "border-[var(--ck-control)] text-[var(--ck-muted)]",
  success: "border-[var(--ck-success)]/50 text-[var(--ck-success)]",
  caution: "border-[var(--ck-caution)]/50 text-[var(--ck-caution)]",
  warning: "border-[var(--ck-warning)]/50 text-[var(--ck-warning)]",
};

export function CkBadge({ tone = "neutral", children }: { tone?: keyof typeof badgeTone; children: ReactNode }) {
  return (
    <span className={`inline-flex h-6 items-center gap-1.5 rounded-[2px] border px-2 font-cockpit text-[10px] font-medium uppercase tracking-[0.12em] ${badgeTone[tone]}`}>
      {tone !== "neutral" && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

/* Spec readout row: key, dotted leader, value, unit */

export function CkReadout({ k, v, unit }: { k: string; v: string; unit?: string }) {
  return (
    <div className="flex items-baseline gap-2 font-cockpit text-[13px]">
      <dt className="text-[var(--ck-muted)]">{k}</dt>
      <span aria-hidden className="min-w-4 flex-1 border-b border-dotted border-[var(--ck-border)]" />
      <dd className="tabular-nums text-[var(--ck-text)]">
        {v}
        {unit && <span className="ml-1.5 text-[var(--ck-muted)]">{unit}</span>}
      </dd>
    </div>
  );
}

/* Placeholder for aircraft without a photo: a top-down silhouette */

export function CkSilhouette({ engines = 2 }: { engines?: 2 | 4 }) {
  return (
    <svg aria-hidden viewBox="0 0 200 120" className="absolute inset-0 h-full w-full p-6 text-[var(--ck-control)]">
      <path
        d="M100 8c4 0 6 6 6 16v26l70 22v10l-70-12v24l18 12v7l-24-6-24 6v-7l18-12V70L24 82V72l70-22V24c0-10 2-16 6-16z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {(engines === 4 ? [56, 78, 122, 144] : [70, 130]).map((x) => (
        <rect key={x} x={x - 3} y={x < 100 ? 58 + (100 - x) * 0.06 : 58 + (x - 100) * 0.06} width="6" height="12" fill="none" stroke="currentColor" />
      ))}
    </svg>
  );
}

/* Aircraft card */

export function CkAircraftCard({
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
      {...(state && state !== "selected" ? forceState(state) : {})}
      className={`group relative flex w-full flex-col overflow-hidden rounded-[3px] border border-[var(--ck-border)] bg-[var(--ck-surface)] text-left transition-[border-color,transform,background-color] hov:-translate-y-0.5 hov:border-[var(--ck-control)] prs:translate-y-0 prs:bg-[var(--ck-raised)] sel:border-[var(--ck-accent)] dis:cursor-not-allowed dis:opacity-50 ${ring}`}
    >
      <span className="relative block aspect-[16/10] overflow-hidden bg-[var(--ck-void)]">
        <AircraftPhoto
          a={a}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
          fallback={<CkSilhouette engines={a.engines} />}
        />
        <span className="absolute left-2 top-2 bg-[var(--ck-void)]/80 px-1.5 py-0.5 font-cockpit text-[10px] uppercase tracking-[0.12em] text-[var(--ck-muted)]">
          {a.manufacturer}
        </span>
        <span className="absolute right-2 top-2 hidden bg-[var(--ck-accent)] px-1.5 py-0.5 font-cockpit text-[10px] uppercase tracking-[0.12em] text-[var(--ck-void)] group-aria-pressed:block">
          Selected
        </span>
      </span>
      <span className="flex flex-1 flex-col gap-3 p-4">
        <span>
          <span className="block font-cond text-2xl font-medium uppercase leading-none tracking-wide text-[var(--ck-text)]">{a.name}</span>
          <span className={`mt-1.5 block ${label} text-[var(--ck-muted)]`}>
            {a.body} · {a.engines} engines
          </span>
        </span>
        <span className="grid grid-cols-3 gap-2 border-t border-[var(--ck-border)] pt-3 font-cockpit">
          {[
            ["Range", `${fmt(a.rangeKm)}`, "km"],
            ["Seats", `${a.seats}`, "typ"],
            ["Span", `${a.spanM}`, "m"],
          ].map(([k, v, u]) => (
            <span key={k}>
              <span className="block text-[10px] uppercase tracking-[0.12em] text-[var(--ck-muted)]">{k}</span>
              <span className="text-sm tabular-nums text-[var(--ck-text)]">
                {v} <span className="text-[11px] text-[var(--ck-muted)]">{u}</span>
              </span>
            </span>
          ))}
        </span>
        <span className="mt-auto font-cockpit text-[11px] uppercase tracking-[0.12em] text-[var(--ck-accent)]">View details ▸</span>
      </span>
    </button>
  );
}

/* List row: a compact table line for the same data */

export function CkListRow({
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
      {...(state === "selected" || selected ? { "aria-pressed": true } : {})}
      {...(state && state !== "selected" ? forceState(state) : {})}
      className={`group relative grid w-full grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-[var(--ck-border)] px-4 py-3 text-left transition-colors hov:bg-[var(--ck-raised)] prs:bg-[#1d2a3f] sel:bg-[var(--ck-raised)] dis:cursor-not-allowed dis:opacity-50 sm:grid-cols-[1.4fr_1fr_1fr_0.6fr_auto] ${ring}`}
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-[var(--ck-accent)] opacity-0 group-aria-pressed:opacity-100" />
      <span className="font-cond text-lg font-medium uppercase tracking-wide text-[var(--ck-text)]">{a.name}</span>
      <span className={`hidden sm:block ${label} text-[var(--ck-muted)]`}>{a.manufacturer}</span>
      <span className="font-cockpit text-sm tabular-nums text-[var(--ck-text)]">
        {fmt(a.rangeKm)} <span className="text-[var(--ck-muted)]">km</span>
      </span>
      <span className="hidden font-cockpit text-sm tabular-nums text-[var(--ck-text)] sm:block">{a.seats}</span>
      <span aria-hidden className="font-cockpit text-[var(--ck-muted)] group-hover:text-[var(--ck-accent)]">
        ▸
      </span>
    </button>
  );
}

/* Detail content: shared by the inline specimen and the modal panel */

export function CkDetailContent({ a, onClose, headingId }: { a: Aircraft; onClose?: () => void; headingId?: string }) {
  const [tab, setTab] = useState("Specs");
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4 border-b border-[var(--ck-border)] p-5">
        <div>
          <p className={`${label} text-[var(--ck-muted)]`}>
            {a.manufacturer} · {a.body}
          </p>
          <h3 id={headingId} className="mt-1 font-cond text-4xl font-light uppercase leading-none tracking-wide text-[var(--ck-text)]">
            {a.name}
          </h3>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className={`grid size-9 shrink-0 place-items-center rounded-[2px] border border-[var(--ck-control)] text-[var(--ck-text)] transition-colors hov:bg-[var(--ck-raised)] prs:bg-[#1d2a3f] ${ring}`}
          >
            <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="relative aspect-[16/9] bg-[var(--ck-void)]">
          <AircraftPhoto a={a} sizes="480px" fallback={<CkSilhouette engines={a.engines} />} />
        </div>
        <div className="flex flex-col gap-5 p-5">
          <div className="flex flex-wrap gap-2">
            <CkBadge tone={a.inProduction ? "success" : "caution"}>{a.inProduction ? "In production" : "Production ended"}</CkBadge>
            <CkBadge>In service {a.firstService}</CkBadge>
            <CkBadge>{a.engines} engines</CkBadge>
          </div>
          <p className="font-plex text-[15px] leading-relaxed text-[var(--ck-text)]">{a.summary}</p>
          <CkTabs options={["Specs", "Engines"]} value={tab} onChange={setTab} ariaLabel="Detail sections" />
          {tab === "Specs" ? (
            <dl className="flex flex-col gap-2.5">
              <CkReadout k="RANGE" v={fmt(a.rangeKm)} unit="KM" />
              <CkReadout k="SEATS" v={`${a.seats}`} unit="TYP" />
              <CkReadout k="LENGTH" v={`${a.lengthM}`} unit="M" />
              <CkReadout k="WINGSPAN" v={`${a.spanM}`} unit="M" />
              <CkReadout k="MTOW" v={`${a.mtowT}`} unit="T" />
            </dl>
          ) : (
            <dl className="flex flex-col gap-2.5">
              <CkReadout k="COUNT" v={`${a.engines}`} />
              <CkReadout k="TYPE" v={a.engineTypes} />
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}

/* Detail panel: a native modal dialog docked to the right edge */

export function CkDetailPanel({ a, open, onClose }: { a: Aircraft | null; open: boolean; onClose: () => void }) {
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
      aria-labelledby="ck-detail-title"
      className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-md border-l border-[var(--ck-control)] bg-[var(--ck-surface)] p-0 text-[var(--ck-text)] shadow-[-24px_0_64px_rgba(0,0,0,0.55)] backdrop:bg-[rgba(3,6,12,0.7)] backdrop:backdrop-blur-[2px]"
    >
      {a && <CkDetailContent a={a} onClose={onClose} headingId="ck-detail-title" />}
    </dialog>
  );
}

/* UI states */

export function CkEmpty({ onReset }: { onReset?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 border border-dashed border-[var(--ck-control)] px-6 py-10 text-center">
      <svg aria-hidden viewBox="0 0 48 48" className="size-10 text-[var(--ck-muted)]">
        <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" />
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6" stroke="currentColor" />
        <path d="M18 30l12-12" stroke="currentColor" strokeDasharray="2 3" />
      </svg>
      <div>
        <p className={`${label} text-[var(--ck-text)]`}>No aircraft match</p>
        <p className="mt-1 font-plex text-sm text-[var(--ck-muted)]">Try removing a filter, or show both manufacturers.</p>
      </div>
      <CkButton variant="secondary" onClick={onReset}>
        Reset filters
      </CkButton>
    </div>
  );
}

export function CkLoading() {
  return (
    <div role="status" aria-live="polite" className="border border-[var(--ck-border)] bg-[var(--ck-surface)] p-4">
      <p className={`flex items-center gap-2 ${label} text-[var(--ck-accent)]`}>
        <span className="size-1.5 animate-pulse rounded-full bg-[var(--ck-accent)]" />
        Loading fleet data…
      </p>
      <div className="mt-4 flex flex-col gap-2.5" aria-hidden>
        {[90, 70, 80].map((w) => (
          <span key={w} className="h-3 animate-pulse bg-[var(--ck-raised)]" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

export function CkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div role="alert" className="flex flex-col gap-3 border border-[var(--ck-warning)]/60 bg-[rgba(255,122,122,0.06)] p-4">
      <p className={`flex items-center gap-2 ${label} text-[var(--ck-warning)]`}>
        <span aria-hidden className="grid size-4 place-items-center border border-current text-[10px]">!</span>
        Couldn’t load specs
      </p>
      <p className="font-plex text-sm text-[var(--ck-text)]">The 747-8 data didn’t arrive. Nothing was lost.</p>
      <div>
        <CkButton variant="secondary" onClick={onRetry}>
          Retry
        </CkButton>
      </div>
    </div>
  );
}

export function CkSuccess() {
  return (
    <div role="status" className="flex items-center gap-3 border border-[var(--ck-success)]/50 bg-[rgba(95,224,138,0.06)] p-4">
      <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 text-[var(--ck-success)]">
        <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      <p className="font-plex text-sm text-[var(--ck-text)]">
        <span className={`${label} text-[var(--ck-success)]`}>Saved</span> · A350-900 added to your shortlist.
      </p>
    </div>
  );
}
