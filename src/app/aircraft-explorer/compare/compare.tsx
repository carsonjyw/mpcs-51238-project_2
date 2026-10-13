"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import AircraftPhoto from "@/components/AircraftPhoto";
import { SkButton, SkSelect } from "@/components/ds/sky";
import { aircraft, fmt, getAircraft, type Aircraft } from "@/lib/aircraft";
import { profiles } from "@/lib/profiles";

// Side-by-side comparison of two or three aircraft. Selection lives in memory only.

const fullName = (a: Aircraft) => `${a.manufacturer} ${a.name}`;
const names = aircraft.map(fullName);
const byName = (n: string) => aircraft.find((a) => fullName(a) === n)!;

// Bars share one scale per row across the whole fleet, so they stay comparable as selections change.
const fleetMax = {
  rangeKm: Math.max(...aircraft.map((a) => a.rangeKm)),
  mtowT: Math.max(...aircraft.map((a) => a.mtowT)),
  lengthM: Math.max(...aircraft.map((a) => a.lengthM)),
  spanM: Math.max(...aircraft.map((a) => a.spanM)),
  heightM: Math.max(...aircraft.map((a) => profiles[a.id].heightM)),
  seats: Math.max(...aircraft.map((a) => a.seats)),
};

function economyLayout(a: Aircraft) {
  const main = profiles[a.id].decks.find((d) => d.name === "Main deck") ?? profiles[a.id].decks[0];
  return main.classes.find((c) => c.name === "Economy")?.layout ?? "—";
}

type Row = {
  label: string;
  note?: string;
  value: (a: Aircraft) => string;
  num?: (a: Aircraft) => number;
  max?: number;
};

const sections: { title: string; rows: Row[] }[] = [
  {
    title: "Performance",
    rows: [
      { label: "Range", note: "Maximum design range, approx.", value: (a) => `${fmt(a.rangeKm)} km`, num: (a) => a.rangeKm, max: fleetMax.rangeKm },
      { label: "Max takeoff weight", note: "Approx.", value: (a) => `${a.mtowT} t`, num: (a) => a.mtowT, max: fleetMax.mtowT },
    ],
  },
  {
    title: "Size",
    rows: [
      { label: "Length", value: (a) => `${a.lengthM} m`, num: (a) => a.lengthM, max: fleetMax.lengthM },
      { label: "Wingspan", value: (a) => `${a.spanM} m`, num: (a) => a.spanM, max: fleetMax.spanM },
      { label: "Height", note: "Approx.", value: (a) => `${profiles[a.id].heightM} m`, num: (a) => profiles[a.id].heightM, max: fleetMax.heightM },
    ],
  },
  {
    title: "Cabin",
    rows: [
      { label: "Typical seats", note: "Varies by airline", value: (a) => `${a.seats}`, num: (a) => a.seats, max: fleetMax.seats },
      { label: "Economy seating", note: "Typical, seats across", value: economyLayout },
      { label: "Cabin width", note: "Approx.", value: (a) => profiles[a.id].cabinWidth },
      { label: "Passenger decks", value: (a) => (profiles[a.id].decks.length === 2 ? "Two" : "One") },
    ],
  },
  {
    title: "Engines",
    rows: [
      { label: "Number of engines", value: (a) => `${a.engines}` },
      { label: "Engine options", value: (a) => profiles[a.id].engines.map((e) => e.model).join(" or ") },
    ],
  },
  {
    title: "History",
    rows: [
      { label: "First flight", value: (a) => profiles[a.id].firstFlight },
      { label: "Entered service", value: (a) => `${a.firstService}` },
      { label: "Status", value: (a) => profiles[a.id].status },
    ],
  },
];

// Label column on wider screens; on phones the label sits above the values.
function Line({ label, note, n, children }: { label: string; note?: string; n: number; children: ReactNode }) {
  return (
    <div className="grid gap-3 border-t border-[var(--sk-border)] py-4 md:grid-cols-[200px_1fr] md:gap-6">
      <div className="text-sm">
        <span className="font-semibold">{label}</span>
        {note && <span className="block text-xs text-[var(--sk-muted)]">{note}</span>}
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {children}
      </div>
    </div>
  );
}

function summary(a: Aircraft, b: Aircraft) {
  const out: string[] = [];
  const range = a.rangeKm - b.rangeKm;
  if (range !== 0) {
    const [far, near] = range > 0 ? [a, b] : [b, a];
    out.push(`The ${far.name} can fly about ${fmt(Math.abs(range))} km farther than the ${near.name}.`);
  }
  const seats = a.seats - b.seats;
  if (seats !== 0) {
    const [more, fewer] = seats > 0 ? [a, b] : [b, a];
    out.push(`The ${more.name} typically seats about ${Math.abs(seats)} more passengers than the ${fewer.name}.`);
  }
  const len = Math.round((a.lengthM - b.lengthM) * 10) / 10;
  if (len !== 0) {
    const [longer, shorter] = len > 0 ? [a, b] : [b, a];
    out.push(`The ${longer.name} is ${Math.abs(len)} m longer than the ${shorter.name}.`);
  }
  if (a.engines !== b.engines) out.push(`The ${a.engines === 4 ? a.name : b.name} has four engines; the ${a.engines === 4 ? b.name : a.name} has two.`);
  return out;
}

export default function Compare() {
  const [ids, setIds] = useState<string[]>(["a350-900", "787-9"]);
  const picked = ids.map(getAircraft);
  const n = picked.length;

  // Choosing an aircraft that is already in another slot swaps the two.
  function choose(slot: number, name: string) {
    const id = byName(name).id;
    setIds((cur) => {
      const next = [...cur];
      const other = next.indexOf(id);
      if (other >= 0 && other !== slot) next[other] = next[slot];
      next[slot] = id;
      return next;
    });
  }
  const add = () => setIds((cur) => [...cur, aircraft.find((a) => !cur.includes(a.id))!.id]);
  const remove = (slot: number) => setIds((cur) => cur.filter((_, i) => i !== slot));

  return (
    <div>
      {/* Pickers */}
      <div className="grid gap-4 rounded-[22px] bg-white p-5 ring-1 ring-[var(--sk-border)] sm:p-6 md:grid-cols-[200px_1fr] md:items-end md:gap-6">
        <p className="text-sm text-[var(--sk-muted)]">Choose two or three aircraft.</p>
        <div className="grid gap-4 sm:grid-cols-[repeat(var(--n),minmax(0,1fr))]" style={{ "--n": n } as React.CSSProperties}>
          {picked.map((a, i) => (
            <div key={i} className="flex min-w-0 items-end gap-2">
              <div className="min-w-0 flex-1">
                <SkSelect label={`Aircraft ${i + 1}`} options={names} value={fullName(a)} onChange={(v) => choose(i, v)} />
              </div>
              {n > 2 && (
                <button
                  type="button"
                  onClick={() => remove(i)}
                  aria-label={`Remove ${fullName(a)} from the comparison`}
                  className="grid size-11 shrink-0 place-items-center rounded-full text-[var(--sk-muted)] ring-1 ring-inset ring-[var(--sk-border)] transition hover:bg-[var(--sk-mist)] hover:text-[var(--sk-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent)] active:scale-95"
                >
                  <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
        {n < 3 && (
          <div className="md:col-start-2">
            <SkButton variant="secondary" onClick={add}>
              + Add a third aircraft
            </SkButton>
          </div>
        )}
      </div>

      {/* Aircraft headers */}
      <div className="mt-10 grid gap-3 md:grid-cols-[200px_1fr] md:gap-6">
        <div className="hidden md:block" />
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {picked.map((a) => (
            <div key={a.id} className="min-w-0">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[18px] bg-[var(--sk-mist)] text-[var(--sk-control)]">
                <AircraftPhoto a={a} sizes="(min-width: 1024px) 30vw, 33vw" />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sk-muted)]">{a.manufacturer}</p>
              <p className="text-xl font-light leading-tight tracking-tight sm:text-2xl">{a.name}</p>
              <p className="mt-1 hidden text-sm text-[var(--sk-muted)] sm:block">{a.body}</p>
              <Link
                href={`/aircraft-explorer/${a.id}`}
                className="mt-2 inline-flex rounded-full text-sm font-semibold text-[var(--sk-accent)] hover:text-[var(--sk-accent-hover)] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent)] active:text-[var(--sk-accent-press)]"
              >
                Profile<span aria-hidden>&nbsp;→</span>
                <span className="sr-only"> of the {fullName(a)}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* At a glance, for the first two */}
      {n >= 2 && (
        <div aria-live="polite" className="mt-10 rounded-[22px] bg-[var(--sk-mist)] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sk-muted)]">
            At a glance · {picked[0].name} and {picked[1].name}
          </p>
          <ul className="mt-3 flex flex-col gap-1.5 leading-relaxed">
            {summary(picked[0], picked[1]).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Spec rows */}
      {sections.map((sec) => (
        <section key={sec.title} aria-label={sec.title} className="mt-12">
          <h2 className="mb-2 text-2xl font-light tracking-tight">{sec.title}</h2>
          {sec.rows.map((row) => {
            const nums = row.num ? picked.map(row.num) : [];
            const lead = nums.length ? Math.max(...nums) : null;
            return (
              <Line key={row.label} label={row.label} note={row.note} n={n}>
                {picked.map((a) => {
                  const v = row.num?.(a);
                  const isLead = v !== undefined && v === lead && new Set(nums).size > 1;
                  return (
                    <div key={a.id} className="min-w-0">
                      <span className="mb-1 block truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sk-muted)] md:sr-only">
                        {a.name}
                        <span className="sr-only">: </span>
                      </span>
                      <span className={`break-words text-sm tabular-nums sm:text-base ${isLead ? "font-semibold" : ""}`}>{row.value(a)}</span>
                      {v !== undefined && row.max && (
                        <span aria-hidden className="mt-2 block h-1.5 overflow-hidden rounded-full bg-[var(--sk-mist)]">
                          <span className="block h-full rounded-full" style={{ width: `${(v / row.max) * 100}%`, background: isLead ? "var(--sk-text)" : "#a9c4de" }} />
                        </span>
                      )}
                    </div>
                  );
                })}
              </Line>
            );
          })}
        </section>
      ))}
    </div>
  );
}
