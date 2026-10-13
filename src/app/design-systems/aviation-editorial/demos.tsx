"use client";

import { useState } from "react";
import { EdButton, EdCard, EdModal, EdTabs } from "@/components/ds/editorial";
import { getAircraft, type Aircraft } from "@/lib/aircraft";

// Live specimens for the Aviation Editorial design system page.

export function TabsDemo() {
  const [v, setV] = useState("Boeing");
  return <EdTabs options={["All", "Airbus", "Boeing"]} value={v} onChange={setV} />;
}

export function CardsDemo() {
  const [open, setOpen] = useState<Aircraft | null>(null);
  const items: [string, string][] = [
    ["777-300er", "The twin that crossed oceans"],
    ["a380", "Two decks, one era"],
    ["a350-900", "Carbon and quiet"],
  ];
  return (
    <>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {items.map(([id, kicker]) => {
          const a = getAircraft(id);
          return <EdCard key={id} a={a} kicker={kicker} onOpen={() => setOpen(a)} />;
        })}
      </div>
      {open && <EdModal a={open} onClose={() => setOpen(null)} />}
    </>
  );
}

export function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <EdButton variant="secondary" onClick={() => setOpen(true)}>
        Open as a page
      </EdButton>
      {open && <EdModal a={getAircraft("777-300er")} onClose={() => setOpen(false)} />}
    </>
  );
}
