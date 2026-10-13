"use client";

import { useMemo, useState } from "react";
import { SkCard, SkDetail, SkDialog, SkSelect, SkTabs } from "@/components/ds/sky";
import { aircraft, type Aircraft } from "@/lib/aircraft";

// The interactive fleet: manufacturer filter, sort, card grid, and detail panel.
// All state lives in memory; nothing is saved.

const makers = ["All", "Airbus", "Boeing"] as const;
const sorts = ["Longest range", "Most seats", "Newest", "Name"] as const;

function sortFleet(list: Aircraft[], by: string) {
  const s = [...list];
  if (by === "Longest range") s.sort((x, y) => y.rangeKm - x.rangeKm);
  if (by === "Most seats") s.sort((x, y) => y.seats - x.seats);
  if (by === "Newest") s.sort((x, y) => y.firstService - x.firstService);
  if (by === "Name") s.sort((x, y) => x.name.localeCompare(y.name, "en", { numeric: true }));
  return s;
}

export default function Explorer() {
  const [maker, setMaker] = useState<string>("All");
  const [sort, setSort] = useState<string>("Longest range");
  const [openId, setOpenId] = useState<string | null>(null);

  const fleet = useMemo(
    () => sortFleet(maker === "All" ? aircraft : aircraft.filter((a) => a.manufacturer === maker), sort),
    [maker, sort],
  );
  const index = fleet.findIndex((a) => a.id === openId);
  const open = index >= 0 ? fleet[index] : null;
  const step = (d: number) => setOpenId(fleet[(index + d + fleet.length) % fleet.length].id);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SkTabs options={[...makers]} value={maker} onChange={setMaker} ariaLabel="Manufacturer" controls="fleet-grid" />
        <SkSelect label="Sort by" options={[...sorts]} value={sort} onChange={setSort} inline />
      </div>
      <p aria-live="polite" className="mt-6 text-sm text-[var(--sk-muted)]">
        {maker === "All" ? `All ${fleet.length} aircraft` : `${fleet.length} ${maker} aircraft`} · sorted by {sort.toLowerCase()}
      </p>

      <div id="fleet-grid" role="tabpanel" aria-label={`${maker} aircraft`} className="mt-6 grid gap-6 md:grid-cols-2 lg:gap-8">
        {fleet.map((a) => (
          <SkCard key={a.id} a={a} selected={a.id === openId} onOpen={() => setOpenId(a.id)} />
        ))}
      </div>

      <SkDialog open={!!open} onClose={() => setOpenId(null)} labelledBy="aircraft-title" className="max-w-3xl">
        {open && (
          <SkDetail
            a={open}
            headingId="aircraft-title"
            position={`${index + 1} of ${fleet.length}${maker === "All" ? "" : ` ${maker}`} aircraft`}
            onClose={() => setOpenId(null)}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        )}
      </SkDialog>
    </>
  );
}
