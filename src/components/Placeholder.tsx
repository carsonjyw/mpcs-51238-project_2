import Link from "next/link";

// Temporary page for routes that are built in later stages.
export default function Placeholder({ kicker, title, stage }: { kicker: string; title: string; stage: string }) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-12 sm:px-8 sm:py-20">
      <Link
        href="/"
        className="self-start rounded text-sm text-muted underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        ← Back to hub
      </Link>
      <p className="mt-10 font-mono text-xs uppercase tracking-[0.14em] text-muted">{kicker}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 text-muted">Coming in {stage}.</p>
    </main>
  );
}
