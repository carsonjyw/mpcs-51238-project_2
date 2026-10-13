"use client";

import { useState } from "react";
import {
  CkAircraftCard,
  CkButton,
  CkChip,
  CkDetailContent,
  CkDetailPanel,
  CkEmpty,
  CkError,
  CkListRow,
  CkLoading,
  CkSuccess,
  CkTabs,
} from "@/components/ds/cockpit";
import { getAircraft, type Aircraft } from "@/lib/aircraft";

// Live, clickable specimens for the Cockpit Dark design system page.

export function TabsDemo() {
  const [v, setV] = useState("Airbus");
  return <CkTabs options={["All", "Airbus", "Boeing"]} value={v} onChange={setV} ariaLabel="Manufacturer" />;
}

export function ChipsDemo() {
  const [on, setOn] = useState<string[]>(["Wide-body"]);
  const toggle = (c: string) => setOn((o) => (o.includes(c) ? o.filter((x) => x !== c) : [...o, c]));
  return (
    <div className="flex flex-wrap gap-2">
      {["Wide-body", "Narrow-body", "Four engines", "In production"].map((c) => (
        <CkChip key={c} pressed={on.includes(c)} onToggle={() => toggle(c)}>
          {c}
        </CkChip>
      ))}
    </div>
  );
}

export function CardsDemo() {
  const [open, setOpen] = useState<Aircraft | null>(null);
  const cards = ["787-9", "a350-900", "747-8"].map(getAircraft);
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((a) => (
          <CkAircraftCard key={a.id} a={a} selected={open?.id === a.id} onOpen={() => setOpen(a)} />
        ))}
      </div>
      <CkDetailPanel a={open} open={!!open} onClose={() => setOpen(null)} />
    </>
  );
}

export function ListDemo() {
  const [sel, setSel] = useState("a350-900");
  const rows = ["a320neo", "a350-900", "787-9", "a380"].map(getAircraft);
  return (
    <div className="border-t border-[var(--ck-border)]">
      <div className="hidden grid-cols-[1.4fr_1fr_1fr_0.6fr_auto] gap-4 px-4 py-2 font-cockpit text-[10px] uppercase tracking-[0.14em] text-[var(--ck-muted)] sm:grid">
        <span>Model</span>
        <span>Maker</span>
        <span>Range</span>
        <span>Seats</span>
        <span className="w-2" />
      </div>
      {rows.map((a) => (
        <CkListRow key={a.id} a={a} selected={sel === a.id} onOpen={() => setSel(a.id)} />
      ))}
    </div>
  );
}

export function PanelDemo() {
  const [open, setOpen] = useState(false);
  const a = getAircraft("a350-900");
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
      <div className="max-w-md border border-[var(--ck-control)] bg-[var(--ck-surface)]">
        <CkDetailContent a={a} onClose={() => undefined} />
      </div>
      <div className="flex flex-col gap-3">
        <p className="max-w-xs font-plex text-sm leading-relaxed text-[var(--ck-muted)]">
          Opens as a modal docked to the right edge. Escape, the close button, or a click on the
          backdrop closes it, and focus returns to the trigger.
        </p>
        <div>
          <CkButton onClick={() => setOpen(true)}>Open detail panel</CkButton>
        </div>
      </div>
      <CkDetailPanel a={open ? a : null} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export function StatesDemo() {
  const [round, setRound] = useState(0);
  const again = () => setRound((r) => r + 1);
  const panels: [string, string, React.ReactNode][] = [
    ["Empty", "Filters exclude every aircraft", <CkEmpty key="e" onReset={again} />],
    ["Loading", "Fleet data on its way", <CkLoading key="l" />],
    ["Error", "One aircraft failed to load", <CkError key="r" onRetry={again} />],
    ["Success", "Shortlist confirmed", <CkSuccess key="s" />],
  ];
  return (
    <div key={round} className="grid gap-px border border-[var(--ck-border)] bg-[var(--ck-border)] lg:grid-cols-2">
      {panels.map(([name, note, node]) => (
        <div key={name} className="flex flex-col gap-3 bg-[var(--ck-surface)] p-4 sm:p-5">
          <p className="font-cockpit text-[11px] uppercase tracking-[0.14em] text-[var(--ck-muted)]">
            <span className="text-[var(--ck-text)]">{name}</span> · {note}
          </p>
          {node}
        </div>
      ))}
    </div>
  );
}
