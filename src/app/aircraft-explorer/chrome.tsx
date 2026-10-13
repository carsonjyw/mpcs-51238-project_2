import type { ReactNode } from "react";
import Link from "next/link";
import { manrope } from "@/lib/fonts";
import { skyTokens } from "@/lib/tokens";

// Shared frame for every Aircraft Explorer page: Sky Minimal tokens, header, footer.

export const quietLink =
  "rounded-full px-3 py-1.5 text-sm text-[var(--sk-muted)] transition hover:bg-[var(--sk-mist)] hover:text-[var(--sk-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent)] active:bg-[var(--sk-haze)]";

export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div style={skyTokens} className={`${manrope.className} min-h-full flex-1 bg-[var(--sk-bg)] text-[var(--sk-text)]`}>
      <header className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-5 sm:px-10">
        <Link
          href="/aircraft-explorer"
          className="-mx-2 flex items-center gap-2.5 rounded-full px-2 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent)]"
        >
          <svg viewBox="0 0 24 24" className="size-5 rotate-45 fill-[var(--sk-text)]" aria-hidden>
            <path d="M21 15.5v-1.8l-7.6-4.8V3.8a1.4 1.4 0 0 0-2.8 0v5.1L3 13.7v1.8l7.6-2.3v4.9l-2 1.5v1.4l3.4-1 3.4 1v-1.4l-2-1.5v-4.9z" />
          </svg>
          <span className="text-sm font-semibold uppercase tracking-[0.14em]">Aircraft Explorer</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1">
          <Link href="/aircraft-explorer#fleet" className={`${quietLink} hidden sm:inline-block`}>
            Fleet
          </Link>
          <Link href="/aircraft-explorer#about" className={`${quietLink} hidden sm:inline-block`}>
            About
          </Link>
          <Link href="/" className={quietLink}>
            ← Hub
          </Link>
        </nav>
      </header>
      {children}
      <footer className="border-t border-[var(--sk-border)]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-8 text-sm text-[var(--sk-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span>Aircraft Explorer · Design, Build, Ship, Assignment 2</span>
          <Link href="/" className={`${quietLink} -mx-3 self-start`}>
            ← Back to hub
          </Link>
        </div>
      </footer>
    </div>
  );
}
