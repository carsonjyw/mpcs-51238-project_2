import Image from "next/image";
import { photo, type PhotoSlug } from "@/lib/photos";

// Fills its positioned parent. The parent sets the size and aspect ratio.
export default function Photo({
  slug,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  className = "",
  position,
  preload,
}: {
  slug: PhotoSlug;
  sizes?: string;
  className?: string;
  position?: string;
  preload?: boolean;
}) {
  const p = photo(slug);
  return (
    <Image
      src={p.src}
      alt={p.caption}
      fill
      sizes={sizes}
      preload={preload}
      className={`object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
