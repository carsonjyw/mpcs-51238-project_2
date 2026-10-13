import type { ReactNode } from "react";
import Photo from "@/components/Photo";
import type { Aircraft } from "@/lib/aircraft";

// The image area of an aircraft card or panel. Loads eagerly so cards never
// appear empty, and falls back to a drawn side profile if a photo is missing.
export default function AircraftPhoto({
  a,
  sizes,
  className = "",
  fallback,
}: {
  a: Aircraft;
  sizes: string;
  className?: string;
  fallback?: ReactNode;
}) {
  if (a.photo) return <Photo slug={a.photo} sizes={sizes} className={className} eager />;
  return (
    fallback ?? (
      <svg viewBox="0 0 240 90" role="img" aria-label={`${a.manufacturer} ${a.name}, drawing`} className="absolute inset-0 h-full w-full p-6 opacity-70">
        <path
          d="M28 46c0-6 6-10 16-10h132l22-18h12l-8 20 18 2c6 1 8 4 8 6s-2 5-8 6l-30 2H70c-26 0-42-2-42-8z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path d="M96 48l34 20h14l-18-20z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    )
  );
}
