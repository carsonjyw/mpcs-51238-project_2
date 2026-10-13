"use client";

import { useMemo, useState } from "react";
import { SkOutlineLink, SkProfileCard, SkSelect, SkTabs } from "@/components/ds/sky";
import { aircraft, type Aircraft } from "@/lib/aircraft";
import { profiles } from "@/lib/profiles";

// The fleet: manufacturer filter, sort, and cards linking to each aircraft's profile.
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
  const fleet = useMemo(() => sortFleet(maker === "All" ? aircraft : aircraft.filter((a) => a.manufacturer === maker), sort), [maker, sort]);

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SkTabs options={[...makers]} value={maker} onChange={setMaker} ariaLabel="Manufacturer" controls="fleet-grid" />
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <SkSelect label="Sort by" options={[...sorts]} value={sort} onChange={setSort} inline />
          <SkOutlineLink href="/aircraft-explorer/compare">Compare Aircraft</SkOutlineLink>
        </div>
      </div>
      <p aria-live="polite" className="mt-6 text-sm text-[var(--sk-muted)]">
        {maker === "All" ? `All ${fleet.length} aircraft` : `${fleet.length} ${maker} aircraft`} · sorted by {sort.toLowerCase()}
      </p>
      <ul id="fleet-grid" role="tabpanel" aria-label={`${maker} aircraft`} className="mt-6 grid gap-6 md:grid-cols-2 lg:gap-8">
        {fleet.map((a) => (
          <li key={a.id}>
            <SkProfileCard a={a} tagline={profiles[a.id].tagline} href={`/aircraft-explorer/${a.id}`} />
          </li>
        ))}
      </ul>
    </>
  );
}
