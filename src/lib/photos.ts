import credits from "./photo-credits.json";

// Photographs downloaded from Wikimedia Commons, stored in /public/photos.
// Each entry keeps the author, license, and source page for attribution.

export type PhotoSlug = keyof typeof credits;

export type PhotoInfo = {
  slug: PhotoSlug;
  src: string;
  caption: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
  width: number;
  height: number;
};

export function photo(slug: PhotoSlug): PhotoInfo {
  return { slug, ...credits[slug] };
}
