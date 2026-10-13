import { photo, type PhotoSlug } from "@/lib/photos";

// Attribution list for the photographs used on a page.
// Styling comes from the page, so each board can keep its own look.
export default function PhotoCredits({
  slugs,
  className = "",
  linkClassName = "",
}: {
  slugs: PhotoSlug[];
  className?: string;
  linkClassName?: string;
}) {
  return (
    <ol className={className}>
      {slugs.map((slug, i) => {
        const p = photo(slug);
        return (
          <li key={slug}>
            {String(i + 1).padStart(2, "0")}. {p.caption}. Photo:{" "}
            <a href={p.source} className={linkClassName} target="_blank" rel="noreferrer">
              {p.author}
            </a>
            ,{" "}
            {p.licenseUrl ? (
              <a href={p.licenseUrl} className={linkClassName} target="_blank" rel="noreferrer">
                {p.license}
              </a>
            ) : (
              p.license
            )}
            , via Wikimedia Commons. Resized and cropped.
          </li>
        );
      })}
    </ol>
  );
}
