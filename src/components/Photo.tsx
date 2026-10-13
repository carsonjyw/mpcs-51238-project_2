import Image from "next/image";
import { photo, type PhotoSlug } from "@/lib/photos";

// Fills its positioned parent. The parent sets the size and aspect ratio.
export default function Photo({
  slug,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  className = "",
  position,
  preload,
  eager,
}: {
  slug: PhotoSlug;
  sizes?: string;
  className?: string;
  position?: string;
  preload?: boolean;
  eager?: boolean; // skip lazy loading, for images that must always show (cards, panels)
}) {
  const p = photo(slug);
  return (
    <Image
      src={p.src}
      alt={p.caption}
      fill
      sizes={sizes}
      preload={preload}
      loading={eager ? "eager" : undefined}
      className={`object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
