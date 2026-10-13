import type { PhotoSlug } from "./photos";

// Long-form, model-specific content for each aircraft. Static and local.
// Figures marked "approx." are rounded or configuration-dependent; seating
// layouts are typical examples, not any airline's actual seat map.

export type GalleryCategory = "Exterior" | "Cockpit" | "Cabin" | "Engines";

export type CabinClass = { name: "First" | "Business" | "Premium economy" | "Economy"; layout: string; rows: number };

export type Deck = { name: string; classes: CabinClass[] };

export type Profile = {
  tagline: string;
  overview: string;
  history: { year: string; text: string }[];
  design: string[];
  operations: string;
  operators: string[];
  recognize: { title: string; text: string }[];
  facts: string[];
  engines: { maker: string; model: string; note: string }[];
  status: string;
  firstFlight: string;
  heightM: number;
  cabinWidth: string;
  seating: string;
  decks: Deck[];
  cabinNote?: string;
  gallery: { slug: PhotoSlug; category: GalleryCategory }[];
};

export const profiles: Record<string, Profile> = {
  a320neo: {
    tagline: "The re-engined workhorse of short-haul flying.",
    overview:
      "The A320neo keeps the proven fuselage, cockpit, and fly-by-wire controls of Airbus’s original A320, and pairs them with much larger, more efficient engines and new wingtip devices. It flies the short and medium-length routes that make up most of the world’s airline schedule, for low-cost and full-service airlines alike.",
    history: [
      { year: "2010", text: "Airbus launches the “New Engine Option,” the meaning of “neo.”" },
      { year: "2014", text: "First flight, from Toulouse." },
      { year: "2016", text: "Enters service with Lufthansa." },
      { year: "2019", text: "The A320 family overtakes the Boeing 737 as the best-selling airliner family by orders." },
    ],
    design: [
      "A choice of two engines: CFM’s LEAP-1A or Pratt & Whitney’s geared PW1100G.",
      "“Sharklet” wingtip devices that sweep up from the wing to reduce drag.",
      "A cabin about 3.7 m wide, slightly wider than the 737’s, with six-abreast seating.",
      "Sidestick controls and a cockpit shared with the rest of the A320 family, so pilots can move between models with little extra training.",
    ],
    operations:
      "Typical flights last one to four hours: domestic trunk routes, city pairs within Europe or Asia, and leisure routes. Low-cost carriers favour it for its fuel economy and high seat count.",
    operators: ["IndiGo", "Frontier Airlines", "Lufthansa", "Avianca"],
    recognize: [
      { title: "Upswept Sharklets", text: "Tall, curved wingtips that rise smoothly from the wing. The 737 MAX’s tips instead split into an upper and a lower blade." },
      { title: "Big engines under a short wing", text: "The neo’s nacelles are noticeably fatter than on older A320s, and the PW1100G version has the largest-looking intakes." },
      { title: "Rounded Airbus nose", text: "A smooth, rounded nose and a fuselage that sits higher off the ground than a 737, on longer landing gear." },
    ],
    facts: [
      "“neo” stands for New Engine Option.",
      "The PW1100G is a geared turbofan: a gearbox lets the large fan turn more slowly than the turbine that drives it, which improves efficiency.",
      "India’s IndiGo operates one of the largest A320neo family fleets in the world.",
    ],
    engines: [
      { maker: "CFM International", model: "LEAP-1A", note: "A joint GE and Safran engine, also used on the A321neo." },
      { maker: "Pratt & Whitney", model: "PW1100G-JM", note: "A geared turbofan; the gearbox lets fan and turbine each run at their most efficient speed." },
    ],
    status: "In production",
    firstFlight: "2014",
    heightM: 11.8,
    cabinWidth: "3.7 m",
    seating: "Typically 150–180 seats; up to 194 in the densest layouts.",
    decks: [{ name: "Main deck", classes: [{ name: "Business", layout: "2-2", rows: 3 }, { name: "Economy", layout: "3-3", rows: 24 }] }],
    cabinNote: "Many European airlines sell business class in ordinary 3-3 rows with the middle seat left empty.",
    gallery: [
      { slug: "a320neo-avianca", category: "Exterior" },
      { slug: "a320neo-haze", category: "Exterior" },
      { slug: "a320neo-cabin", category: "Cabin" },
      { slug: "a320neo-pw1100g", category: "Engines" },
    ],
  },

  a321neo: {
    tagline: "The single-aisle jet that crosses oceans.",
    overview:
      "The A321neo is the longest member of the A320neo family, about 7 m longer than the A320neo. It carries as many passengers as some small wide-bodies, and its long-range LR and XLR versions have brought single-aisle aircraft to transatlantic and other long, thin routes that could not fill a larger jet.",
    history: [
      { year: "2016", text: "First flight." },
      { year: "2017", text: "Enters service with Virgin America." },
      { year: "2018", text: "The longer-range A321LR enters service." },
      { year: "2024", text: "The extra-long-range A321XLR enters service with Iberia." },
    ],
    design: [
      "A 44.5 m fuselage on the same wing as the A320neo, with Sharklets and the same two engine choices.",
      "“Cabin Flex” layouts rearrange the exit doors so airlines can fit more seats.",
      "The LR adds optional extra fuel tanks; the XLR has a permanent rear centre tank for about 8,700 km of range.",
    ],
    operations:
      "Used on busy domestic routes with high demand, and in LR or XLR form on flights of up to around eight to ten hours, such as between the US East Coast and Europe.",
    operators: ["American Airlines", "Delta Air Lines", "JetBlue", "Wizz Air", "Aer Lingus"],
    recognize: [
      { title: "Long and slender", text: "A noticeably long fuselage for its wingspan; next to an A320 it looks stretched." },
      { title: "A door behind the wing", text: "A full-size exit door just behind the wing, which the shorter A320 does not have." },
      { title: "neo engines and Sharklets", text: "The same large nacelles and upswept wingtips as the A320neo." },
    ],
    facts: [
      "JetBlue began flying A321LRs between New York and London in 2021.",
      "The A321XLR can fly about 8,700 km, enough for routes such as New York to Rome.",
      "The A321neo has become the best-selling variant of the A320neo family.",
    ],
    engines: [
      { maker: "CFM International", model: "LEAP-1A", note: "Shared with the A320neo." },
      { maker: "Pratt & Whitney", model: "PW1100G-JM", note: "Geared turbofan option, shared with the A320neo." },
    ],
    status: "In production",
    firstFlight: "2016",
    heightM: 11.8,
    cabinWidth: "3.7 m",
    seating: "Typically 180–220 seats; up to 244 in the densest layouts.",
    decks: [{ name: "Main deck", classes: [{ name: "Business", layout: "2-2", rows: 4 }, { name: "Economy", layout: "3-3", rows: 30 }] }],
    cabinNote: "Some transatlantic A321LR and XLR cabins use lie-flat business seats in a 1-1 or 2-2 layout.",
    gallery: [
      { slug: "a321neo-aerlingus", category: "Exterior" },
      { slug: "a321neo-above-cloud", category: "Exterior" },
      { slug: "a321lr-sas", category: "Exterior" },
      { slug: "a321neo-delta-cabin", category: "Cabin" },
      { slug: "a321neo-thai-cabin", category: "Cabin" },
      { slug: "a321neo-leap1a", category: "Engines" },
    ],
  },

  "a350-900": {
    tagline: "Airbus’s carbon-composite long-hauler.",
    overview:
      "The A350-900 is a long-range, twin-aisle aircraft built largely from carbon-fibre composites. Its light structure, efficient Rolls-Royce engines, and quiet, wide cabin have made it a favourite for long flights, including some of the longest scheduled routes in the world.",
    history: [
      { year: "2006", text: "Airbus relaunches the programme as the A350 XWB, “Extra Wide Body.”" },
      { year: "2013", text: "First flight, from Toulouse." },
      { year: "2015", text: "Enters service with Qatar Airways." },
      { year: "2018", text: "An ultra-long-range version starts nonstop Singapore–New York flights." },
    ],
    design: [
      "About 53% of the structure by weight is composite materials, mostly carbon-fibre reinforced plastic.",
      "A cabin about 5.6 m wide; most airlines fit nine-abreast economy seating.",
      "Powered only by the Rolls-Royce Trent XWB, designed for this aircraft.",
      "A cockpit closely related to the A380’s, which simplifies training across Airbus wide-bodies.",
    ],
    operations:
      "Flies long-haul routes of roughly 8 to 19 hours. Its range lets airlines connect distant cities nonstop, while its size suits routes that would not fill an A380 or 777.",
    operators: ["Singapore Airlines", "Qatar Airways", "Cathay Pacific", "Delta Air Lines", "Air France"],
    recognize: [
      { title: "The “raccoon mask”", text: "A black painted band around the cockpit windows that gives the nose a distinctive masked look." },
      { title: "Curving wingtips", text: "Wingtips that bend smoothly upward in a long curve rather than ending in a separate winglet." },
      { title: "Four-wheel main gear", text: "Each main landing gear has four wheels. The longer A350-1000 has six." },
    ],
    facts: [
      "XWB stands for Extra Wide Body.",
      "The 10,000th aircraft Airbus delivered was an A350-900 for Singapore Airlines, in 2016.",
      "Singapore–New York nonstop flights cover about 15,300 km and are scheduled at roughly 18 hours.",
    ],
    engines: [{ maker: "Rolls-Royce", model: "Trent XWB-84", note: "Exclusive to the A350-900; the “84” refers to its rating of about 84,000 lbf of takeoff thrust." }],
    status: "In production",
    firstFlight: "2013",
    heightM: 17.1,
    cabinWidth: "5.6 m",
    seating: "Typically 300–350 seats in three classes.",
    decks: [
      {
        name: "Main deck",
        classes: [
          { name: "Business", layout: "1-2-1", rows: 8 },
          { name: "Premium economy", layout: "2-4-2", rows: 3 },
          { name: "Economy", layout: "3-3-3", rows: 26 },
        ],
      },
    ],
    gallery: [
      { slug: "a350-delta-flight", category: "Exterior" },
      { slug: "a350-sia-10000", category: "Exterior" },
      { slug: "a350-cathay-takeoff", category: "Exterior" },
      { slug: "a350-edelweiss", category: "Exterior" },
      { slug: "a350-fiji-landing", category: "Exterior" },
      { slug: "a350-cockpit", category: "Cockpit" },
      { slug: "a350-simulator", category: "Cockpit" },
      { slug: "a350-af-economy", category: "Cabin" },
      { slug: "a350-delta-cabin", category: "Cabin" },
      { slug: "trent-xwb-intake", category: "Engines" },
      { slug: "trent-xwb-core", category: "Engines" },
    ],
  },

  a380: {
    tagline: "The double-decker that redefined big.",
    overview:
      "The A380 is the largest passenger airliner ever built, with two full-length passenger decks. It was designed to move very large numbers of people between busy hub airports, and its quiet, spacious cabin made it a favourite with travellers even as airlines moved toward smaller twin-engine jets.",
    history: [
      { year: "2000", text: "Airbus launches the programme." },
      { year: "2005", text: "First flight, from Toulouse." },
      { year: "2007", text: "Enters service with Singapore Airlines, Singapore to Sydney." },
      { year: "2021", text: "The final A380 is delivered, to Emirates." },
    ],
    design: [
      "Two passenger decks running the full length of the fuselage.",
      "A wingspan of 79.8 m, kept just under the 80 m limit for the largest airport gates.",
      "Four engines: Rolls-Royce Trent 900 or Engine Alliance GP7200.",
      "Certified for up to 853 passengers, although airlines fit far fewer.",
    ],
    operations:
      "Used on high-demand routes between major hubs, often at airports where take-off and landing slots are scarce. Most operators fly it on long-haul routes of 7 to 15 hours.",
    operators: ["Emirates", "Singapore Airlines", "British Airways", "Qantas", "Lufthansa"],
    recognize: [
      { title: "Two full rows of windows", text: "Two complete lines of windows running from nose to tail, one for each deck." },
      { title: "Four engines, enormous wing", text: "Four engines under a very long, deep wing with small fences at the tips." },
      { title: "No hump", text: "A smooth, rounded nose. The 747’s upper deck ends partway back, forming a hump; the A380’s runs the full length." },
    ],
    facts: [
      "Emirates received 123 A380s, about half of the 251 built.",
      "The first commercial A380 flight was Singapore Airlines SQ380, Singapore to Sydney.",
      "The upper deck alone is wider than the cabin of a single-aisle airliner.",
    ],
    engines: [
      { maker: "Rolls-Royce", model: "Trent 900", note: "The launch engine, chosen by airlines such as Singapore Airlines, Lufthansa, and British Airways." },
      { maker: "Engine Alliance", model: "GP7200", note: "A joint engine from GE and Pratt & Whitney, used by Emirates and others." },
    ],
    status: "Production ended in 2021",
    firstFlight: "2005",
    heightM: 24.1,
    cabinWidth: "6.5 m main deck, 5.8 m upper deck",
    seating: "Typically 500–600 seats in airline service; certified for up to 853.",
    decks: [
      {
        name: "Upper deck",
        classes: [
          { name: "Business", layout: "1-2-1", rows: 14 },
          { name: "Economy", layout: "2-4-2", rows: 12 },
        ],
      },
      {
        name: "Main deck",
        classes: [
          { name: "Premium economy", layout: "2-4-2", rows: 5 },
          { name: "Economy", layout: "3-4-3", rows: 40 },
        ],
      },
    ],
    cabinNote: "Some airlines put first-class suites on the main deck and dedicate the upper deck entirely to business class.",
    gallery: [
      { slug: "a380-lufthansa-landing", category: "Exterior" },
      { slug: "a380-emirates-eer", category: "Exterior" },
      { slug: "a380-emirates-edj", category: "Exterior" },
      { slug: "a380-cockpit", category: "Cockpit" },
      { slug: "a380-qantas-cockpit", category: "Cockpit" },
      { slug: "a380-cockpit-2", category: "Cockpit" },
      { slug: "a380-upper-deck", category: "Cabin" },
      { slug: "a380-lh-economy", category: "Cabin" },
      { slug: "a380-trent970", category: "Engines" },
      { slug: "a380-gp7200", category: "Engines" },
    ],
  },

  "737-max-8": {
    tagline: "The newest generation of a jet first flown in 1967.",
    overview:
      "The 737 MAX 8 is the fourth generation of Boeing’s 737, one of the most produced jetliner families ever. It keeps the familiar 737 fuselage and adds new CFM LEAP-1B engines, redesigned winglets, and an updated flight deck to cut fuel use on short and medium routes.",
    history: [
      { year: "1967", text: "The original 737 makes its first flight." },
      { year: "2016", text: "The 737 MAX 8 makes its first flight." },
      { year: "2017", text: "Enters service with Malindo Air." },
      { year: "2019–20", text: "Grounded worldwide after two fatal accidents; returns from late 2020 after flight-control software and pilot training changes." },
    ],
    design: [
      "CFM LEAP-1B engines, larger than those on earlier 737s, mounted further forward and higher on the wing.",
      "A nose landing gear lengthened by about 20 cm to keep the bigger engines clear of the ground.",
      "Split-tip “Advanced Technology” winglets and a reshaped tail cone.",
      "A cabin about 3.5 m wide, with six-abreast seating.",
    ],
    operations:
      "Flies short and medium routes of one to six hours for low-cost and full-service airlines. Ryanair’s high-density version seats up to 197.",
    operators: ["Southwest Airlines", "Ryanair", "United Airlines", "WestJet", "Icelandair"],
    recognize: [
      { title: "Split winglets", text: "Each wingtip splits into a large blade pointing up and a smaller one pointing down." },
      { title: "Serrated engine nacelles", text: "Saw-tooth “chevron” edges at the back of the engine casings, which reduce noise." },
      { title: "Low to the ground", text: "A 737 sits much lower than an A320, with the engines close to the runway, even with the MAX’s taller nose gear." },
    ],
    facts: [
      "Ryanair’s 737-8200 is a high-density MAX 8 variant with up to 197 seats.",
      "Southwest Airlines is the world’s largest 737 operator and flies no other aircraft type.",
      "The 737 has been in production continuously since the 1960s.",
    ],
    engines: [{ maker: "CFM International", model: "LEAP-1B", note: "The only engine offered on the 737 MAX, sized for the 737’s low ground clearance." }],
    status: "In production",
    firstFlight: "2016",
    heightM: 12.3,
    cabinWidth: "3.5 m",
    seating: "Typically 162–178 seats; up to 210 in the high-density MAX 8-200.",
    decks: [{ name: "Main deck", classes: [{ name: "First", layout: "2-2", rows: 4 }, { name: "Economy", layout: "3-3", rows: 24 }] }],
    cabinNote: "US airlines often sell the front rows as first class in a 2-2 layout; most others fly all-economy 3-3.",
    gallery: [
      { slug: "b737max-icelandair", category: "Exterior" },
      { slug: "b737max-southwest", category: "Exterior" },
      { slug: "b737max-contrails", category: "Exterior" },
      { slug: "b737max-ryanair-winglet", category: "Exterior" },
      { slug: "b737max-cockpit", category: "Cockpit" },
      { slug: "b737max-cabin", category: "Cabin" },
      { slug: "b737max-cabin-2", category: "Cabin" },
      { slug: "b737max-leap1b", category: "Engines" },
    ],
  },

  "777-300er": {
    tagline: "The long-range twin that replaced the jumbo on many routes.",
    overview:
      "The 777-300ER is the extended-range version of Boeing’s stretched 777. It offered close to 747 capacity with only two engines, which made it one of the most successful long-haul aircraft of the 2000s and 2010s and the backbone of many intercontinental fleets.",
    history: [
      { year: "1994", text: "The original 777 makes its first flight." },
      { year: "1995", text: "The 777 enters service with United Airlines." },
      { year: "2003", text: "The 777-300ER makes its first flight." },
      { year: "2004", text: "Enters service with Air France." },
    ],
    design: [
      "Six-wheel main landing gear bogies that spread its weight across the runway.",
      "Raked wingtips that extend the wingspan to 64.8 m.",
      "Powered only by the GE90-115B, with a fan about 3.25 m across.",
      "A cabin about 5.9 m wide; ten-abreast economy (3-4-3) is now the most common layout.",
    ],
    operations:
      "Flies long-haul trunk routes of 8 to 16 hours between major cities, carrying large numbers of passengers plus significant cargo in its lower hold.",
    operators: ["Emirates", "Air France", "Cathay Pacific", "Qatar Airways", "Air Canada"],
    recognize: [
      { title: "Huge twin engines", text: "Two very large engines whose intakes are nearly as wide as a single-aisle jet’s fuselage." },
      { title: "Six-wheel main gear", text: "Each main landing gear has three axles and six wheels, easy to see on approach." },
      { title: "Blade-shaped tail", text: "The tail cone ends in a flat, vertical knife edge rather than a round cone." },
    ],
    facts: [
      "The GE90-115B was certified at 115,300 lbf of thrust and for years was the most powerful jet engine in airline service.",
      "During testing in 2002 a GE90-115B reached 127,900 lbf, a world record at the time.",
      "Emirates is the largest operator of the 777.",
    ],
    engines: [{ maker: "GE Aerospace", model: "GE90-115B", note: "The only engine offered on the 777-300ER." }],
    status: "In airline service worldwide; the 777-9 is its planned successor.",
    firstFlight: "2003",
    heightM: 18.5,
    cabinWidth: "5.9 m",
    seating: "Typically about 300–400 seats; Boeing quoted 396 in two classes.",
    decks: [
      {
        name: "Main deck",
        classes: [
          { name: "Business", layout: "1-2-1", rows: 10 },
          { name: "Premium economy", layout: "2-4-2", rows: 3 },
          { name: "Economy", layout: "3-4-3", rows: 30 },
        ],
      },
    ],
    gallery: [
      { slug: "b777-alitalia", category: "Exterior" },
      { slug: "b777-aircanada", category: "Exterior" },
      { slug: "b777-airnz", category: "Exterior" },
      { slug: "b777-cathay-runway", category: "Exterior" },
      { slug: "b777-aeroflot-sunset", category: "Exterior" },
      { slug: "b777-united-polaris", category: "Cabin" },
      { slug: "b777-aeroflot-business", category: "Cabin" },
      { slug: "b777-airnz-cabin", category: "Cabin" },
      { slug: "ge90-intake", category: "Engines" },
      { slug: "b777-af-ge90", category: "Engines" },
      { slug: "b777-ge90-wing-view", category: "Engines" },
    ],
  },

  "787-9": {
    tagline: "The Dreamliner that opened new nonstop routes.",
    overview:
      "The 787-9 is the stretched, longer-range version of Boeing’s Dreamliner. Its composite airframe and efficient engines let airlines fly long distances with fewer seats than a 777 or 747, which made many new nonstop city pairs worthwhile.",
    history: [
      { year: "2009", text: "The first 787, a 787-8, makes its first flight." },
      { year: "2013", text: "The 787-9 makes its first flight." },
      { year: "2014", text: "Enters service with Air New Zealand." },
      { year: "2018", text: "Qantas begins nonstop Perth–London flights with the 787-9." },
    ],
    design: [
      "About half of the airframe by weight is carbon-fibre composite.",
      "Larger cabin windows that dim electronically instead of using pull-down shades.",
      "Cabin pressurised to a lower altitude, about 6,000 ft, with higher humidity than older jets.",
      "Many systems are electrically powered rather than driven by air taken from the engines.",
    ],
    operations:
      "Flies long-haul and very long routes of up to around 17 hours, especially where demand is too low for a larger aircraft.",
    operators: ["All Nippon Airways", "United Airlines", "Qantas", "Air New Zealand", "KLM"],
    recognize: [
      { title: "Raked wingtips, no winglets", text: "Long, swept wingtips without winglets, on wings that curve visibly upward in flight." },
      { title: "Serrated engine nacelles", text: "Saw-tooth chevrons around the back of both engine casings." },
      { title: "Four-pane windshield", text: "A smooth, rounded nose with only four cockpit windows; most airliners have six." },
    ],
    facts: [
      "Qantas’s Perth–London route, launched in 2018, covers about 14,500 km.",
      "Air New Zealand was the first airline to fly the 787-9.",
      "The 787-9 is about 6 m longer than the original 787-8.",
    ],
    engines: [
      { maker: "GE Aerospace", model: "GEnx-1B", note: "One of two engine choices, chosen per airline." },
      { maker: "Rolls-Royce", model: "Trent 1000", note: "The other engine choice for the 787 family." },
    ],
    status: "In production",
    firstFlight: "2013",
    heightM: 17.0,
    cabinWidth: "5.5 m",
    seating: "Typically about 250–300 seats; Boeing quotes around 290 in two classes.",
    decks: [
      {
        name: "Main deck",
        classes: [
          { name: "Business", layout: "1-2-1", rows: 8 },
          { name: "Premium economy", layout: "2-3-2", rows: 4 },
          { name: "Economy", layout: "3-3-3", rows: 24 },
        ],
      },
    ],
    gallery: [
      { slug: "b787-aircanada-approach", category: "Exterior" },
      { slug: "b787-klm-clouds", category: "Exterior" },
      { slug: "b787-qantas-livery", category: "Exterior" },
      { slug: "b787-eva-economy", category: "Cabin" },
      { slug: "b787-bamboo-business", category: "Cabin" },
      { slug: "b787-aireuropa-cabin", category: "Cabin" },
      { slug: "b787-united-genx", category: "Engines" },
    ],
  },

  "747-8": {
    tagline: "The final and longest version of the original jumbo.",
    overview:
      "The 747-8 Intercontinental is the last passenger version of the Boeing 747, the aircraft that opened long-haul travel to mass markets in 1970. It stretches the classic design, adds a new wing and engines derived from the 787’s, and was for years the longest passenger airliner in service.",
    history: [
      { year: "1969", text: "The original 747 makes its first flight." },
      { year: "2011", text: "The 747-8 Intercontinental makes its first flight." },
      { year: "2012", text: "Enters service with Lufthansa." },
      { year: "2023", text: "The last 747, a 747-8 freighter, is delivered, ending production." },
    ],
    design: [
      "A fuselage stretched to 76.3 m, about 5.6 m longer than the 747-400.",
      "A new wing with raked wingtips instead of the 747-400’s upright winglets.",
      "GEnx-2B engines, a version of the 787’s GEnx sized for the 747.",
      "A longer upper deck behind the cockpit.",
    ],
    operations:
      "Flown by a small number of airlines on long-haul routes between major hubs, and as a VIP and government aircraft.",
    operators: ["Lufthansa", "Korean Air", "Air China"],
    recognize: [
      { title: "The long hump", text: "An upper deck that extends further back along the fuselage than on earlier 747s." },
      { title: "Raked wingtips", text: "Swept wingtips without winglets. The older 747-400 has tall upright winglets." },
      { title: "Four chevron engines", text: "Four engines, each with saw-tooth chevrons at the back of the nacelle." },
    ],
    facts: [
      "In all, 1,574 Boeing 747s of every version were built; the last was delivered in 2023.",
      "Lufthansa was the first, and largest, airline operator of the passenger 747-8.",
      "Two 747-8s are being converted into the next US presidential aircraft, the VC-25B.",
    ],
    engines: [{ maker: "GE Aerospace", model: "GEnx-2B67", note: "Derived from the 787’s GEnx-1B and the only engine on the 747-8." }],
    status: "Production ended in 2023",
    firstFlight: "2011",
    heightM: 19.4,
    cabinWidth: "6.1 m main deck",
    seating: "Typically about 360–470 seats depending on airline; Lufthansa’s seat 364.",
    decks: [
      { name: "Upper deck", classes: [{ name: "Business", layout: "2-2", rows: 8 }] },
      {
        name: "Main deck",
        classes: [
          { name: "First", layout: "1-1", rows: 4 },
          { name: "Business", layout: "2-3-2", rows: 6 },
          { name: "Economy", layout: "3-4-3", rows: 28 },
        ],
      },
    ],
    cabinNote: "Layouts vary widely: some airlines put first class in the nose of the main deck, others use the upper deck for business class.",
    gallery: [
      { slug: "b747-8-lufthansa", category: "Exterior" },
      { slug: "b747-8-airchina", category: "Exterior" },
      { slug: "b747-8-retro", category: "Exterior" },
      { slug: "b747-8-thrust-levers", category: "Cockpit" },
      { slug: "b747-8i-staircase", category: "Cabin" },
      { slug: "b747-8-wing-engines", category: "Engines" },
      { slug: "genx-2b-fan", category: "Engines" },
    ],
  },
};

export function getProfile(id: string) {
  const p = profiles[id];
  if (!p) throw new Error(`No profile for ${id}`);
  return p;
}
