import type { CabinClass, Deck } from "@/lib/profiles";

// Illustrative, top-down cabin diagram drawn from a deck's class layouts.
// Nose on the left. Row counts are representative, not an airline seat map.

const SEAT: Record<CabinClass["name"], { pitch: number; across: number; fill: string }> = {
  First: { pitch: 28, across: 16, fill: "#18212c" },
  Business: { pitch: 22, across: 13, fill: "#4a5664" },
  "Premium economy": { pitch: 15, across: 10, fill: "#8496aa" },
  Economy: { pitch: 12, across: 8, fill: "#b9cbe0" },
};

export const seatColors = Object.fromEntries(Object.entries(SEAT).map(([k, v]) => [k, v.fill])) as Record<CabinClass["name"], string>;

const GAP = 1.5; // between seats in a group
const AISLE = 9;
const CLASS_GAP = 16;
const NOSE = 70;
const TAIL = 90;
const PAD = 10;

function groupsOf(layout: string) {
  return layout.split("-").map(Number);
}

function rowWidth(c: CabinClass) {
  const g = groupsOf(c.layout);
  const s = SEAT[c.name];
  const seats = g.reduce((a, b) => a + b, 0);
  return seats * s.across + (seats - g.length) * GAP + (g.length - 1) * AISLE;
}

export default function SeatMap({ deck, engines, title, wings = true }: { deck: Deck; engines: 2 | 4; title: string; wings?: boolean }) {
  const inner = Math.max(...deck.classes.map(rowWidth));
  const H = inner + PAD * 2; // fuselage width
  const cabinLen = deck.classes.reduce((a, c) => a + c.rows * SEAT[c.name].pitch, 0) + CLASS_GAP * (deck.classes.length - 1);
  const L = NOSE + cabinLen + TAIL + 12;
  const span = wings ? H * 0.65 : 6; // wing reach beyond the fuselage on each side
  const top = span; // fuselage top edge, leaving room for the wing above
  const W = L;
  const Ht = H + span * 2;

  // Wing: root at about 40% of the cabin, swept back.
  const root = NOSE + cabinLen * 0.38;
  const chord = cabinLen * 0.22;
  const wing = (dir: 1 | -1) => {
    const edge = dir === 1 ? top + H : top;
    const tipY = edge + dir * span * 0.95;
    return `M${root},${edge} L${root + chord * 1.25},${tipY} L${root + chord * 1.55},${tipY} L${root + chord},${edge} Z`;
  };
  const enginePos = engines === 4 ? [0.32, 0.65] : [0.42];

  let x = NOSE + 6;
  const seats: { x: number; y: number; w: number; h: number; fill: string }[] = [];
  deck.classes.forEach((c, ci) => {
    const s = SEAT[c.name];
    const g = groupsOf(c.layout);
    const width = rowWidth(c);
    for (let r = 0; r < c.rows; r++) {
      let y = top + PAD + (inner - width) / 2;
      g.forEach((n, gi) => {
        for (let k = 0; k < n; k++) {
          seats.push({ x: x + 1, y, w: s.pitch - 3, h: s.across, fill: s.fill });
          y += s.across + (k < n - 1 ? GAP : 0);
        }
        if (gi < g.length - 1) y += AISLE;
      });
      x += s.pitch;
    }
    if (ci < deck.classes.length - 1) x += CLASS_GAP;
  });

  const body = `M${NOSE},${top} H${L - TAIL} C${L - TAIL / 3},${top} ${L},${top + H * 0.35} ${L},${top + H * 0.5} C${L},${top + H * 0.65} ${L - TAIL / 3},${top + H} ${L - TAIL},${top + H} H${NOSE} C${NOSE * 0.35},${top + H} 0,${top + H * 0.78} 0,${top + H / 2} C0,${top + H * 0.22} ${NOSE * 0.35},${top} ${NOSE},${top} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${Ht}`} role="img" aria-label={title} className="h-auto w-full min-w-[620px]">
      <title>{title}</title>
      {wings &&
        [1, -1].map((d) => <path key={d} d={wing(d as 1 | -1)} fill="#eef3f8" stroke="#d6e2ee" />)}
      {wings &&
        [1, -1].flatMap((d) =>
          enginePos.map((p) => {
            const ey = d === 1 ? top + H + span * p : top - span * p;
            const ex = root + chord * 1.25 * p - 18;
            return <rect key={`${d}-${p}`} x={ex} y={ey - 5} width={34} height={10} rx={5} fill="#ffffff" stroke="#c9d6e3" />;
          }),
        )}
      <path d={body} fill="#ffffff" stroke="#c9d6e3" strokeWidth="1.5" />
      <path d={`M${L - TAIL + 18},${top + H / 2} L${L - 6},${top + H / 2}`} stroke="#d6e2ee" strokeWidth="1.5" />
      {seats.map((s, i) => (
        <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx={2} fill={s.fill} />
      ))}
    </svg>
  );
}
