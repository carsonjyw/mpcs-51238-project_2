"use client";

import { useState } from "react";
import { SkButton, SkCard, SkModal, SkTabs } from "@/components/ds/sky";
import { getAircraft, type Aircraft } from "@/lib/aircraft";

// Live specimens for the Sky Minimal design system page.

export function TabsDemo() {
  const [v, setV] = useState("All");
  return <SkTabs options={["All", "Airbus", "Boeing"]} value={v} onChange={setV} />;
}

export function CardsDemo() {
  const [open, setOpen] = useState<Aircraft | null>(null);
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {["a380", "787-9"].map((id) => {
          const a = getAircraft(id);
          return <SkCard key={id} a={a} onOpen={() => setOpen(a)} />;
        })}
      </div>
      {open && <SkModal a={open} open onClose={() => setOpen(null)} />}
    </>
  );
}

export function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SkButton onClick={() => setOpen(true)}>Open as modal</SkButton>
      {open && <SkModal a={getAircraft("a350-900")} open onClose={() => setOpen(false)} />}
    </>
  );
}
