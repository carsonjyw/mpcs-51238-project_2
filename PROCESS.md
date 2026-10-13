# Aircraft Explorer — Design & Development Process

**Course:** Design, Build, Ship — Assignment 2: UI/UX & Visual Design  
**Project:** Aircraft Explorer  
**My role:** Concept, creative direction, design decisions, feedback, scope, and final review  
**AI collaborator:** Claude Code — implementation, visual exploration, image research, and technical testing

## How I worked with the agent

I used Claude Code as a **coding and design collaborator**, not as a substitute for making decisions. I chose the project, defined its audience and visual directions, reviewed what appeared in the browser, and gave specific feedback when something did not work. Claude Code translated those decisions into components, pages, and interactions, and suggested technical approaches when appropriate. I accepted, revised, or rejected those suggestions during the process.

Rather than requesting an entire finished assignment in one prompt, I worked in stages: **plan → build → review → revise → test**. The most important changes came from noticing what was missing in the actual experience, not from adding features simply because they were possible.

## 1. Choosing the concept

I chose **Aircraft Explorer** because commercial aviation is a subject I genuinely wanted to explore. My goal was to make modern passenger aircraft approachable to aviation enthusiasts, students, and curious travelers—not just to display a list of technical specifications.

I set the initial scope at eight aircraft: the **Airbus A320neo, A321neo, A350-900, and A380**, and the **Boeing 737 MAX 8, 777-300ER, 787-9, and 747-8**. I also kept the technical constraints clear: one static Next.js + Tailwind CSS project, with local data and no database, accounts, runtime external APIs, or persistent storage.

I established three visual directions for comparison:

| Direction | Design brief I gave |
|---|---|
| **Sky Minimal** | Premium airline websites: white and soft blue, clean typography, generous whitespace, and aircraft photography as the focus. |
| **Cockpit Dark** | Modern flight decks: deep navy, charcoal, cyan accents, precise grids, and technical visual details. |
| **Aviation Editorial** | Aviation magazines: warm paper tones, strong serif headlines, expressive layouts, and large photography. |

I asked the agent to stop after each stage so I could evaluate the result before moving on.

## 2. Stage 1 — Building and reviewing the hub

Claude Code initialized the project and created the homepage hub linking to the three mood boards, three design systems, and the final site.

**My review:** I liked the clear hierarchy, three-column navigation cards, and prominent Aircraft Explorer link. But the gap between the introduction and the Mood Boards section felt unnecessarily large. I asked for tighter spacing **without adding gradients, heavy shadows, or extra decoration**. That was a small but deliberate decision: I wanted the hub to function as a neutral entry point, not compete visually with the three styles.

I also wanted Assignment 2 kept separate from my earlier coursework, so I asked that its project folder be moved outside the Assignment 1 repository. I subsequently took responsibility for Git and GitHub operations myself and instructed the agent not to perform them.

## 3. Stage 2 — Exploring three visual languages

I directed the agent to make **three genuinely different mood boards**, not one layout recolored three times. I approved the use of locally stored, appropriately licensed Wikimedia Commons photographs, with credits and license checks. My brief included aircraft, flight decks, engines, wings, terminals, and aviation imagery at different times of day.

The agent developed three distinct compositions:

- **Sky Minimal:** an airy, asymmetric gallery wall with soft surfaces and restrained blue accents.
- **Cockpit Dark:** a dense, instrument-inspired arrangement with technical readouts and display-unit labels.
- **Aviation Editorial:** a magazine-like sequence of masthead, cover, editorial typography, and photo essays.

**My review:** I wanted Sky Minimal's secondary text to remain readable; I initially favored Cockpit Dark but thought some introductory text was too dim and its hero too spacious; and I wanted Aviation Editorial to retain its distinctive print character.

**The important correction:** I challenged the claim that each board had "28 artifacts." A label saying *28 artifacts* was not enough: I wanted **28 identifiable visual artifacts**. Following that request, the agent audited the boards, identified weak items (including text-only filler and repeated photos), and replaced them with stronger images and drawn pieces such as a wayfinding sign, weather radar, and airmail envelope. The final audit reported **28 distinct artifacts on each board**.

## 4. Stage 3 — Turning moods into design systems

I asked for a complete design system for **every** mood board, even though only one would be used for the final site. Each needed color roles and contrast ratios, typography, spacing and shapes, UI components, control states, and empty/loading/error/success states.

At this point, **Cockpit Dark was my tentative choice**. My instruction was to keep its aviation identity while making the components much more readable and usable than the experimental mood board. Claude Code proposed technical choices such as contrast-conscious typography and semantic color usage.

**My review revealed an important usability issue:** the UI States section was so far down the long pages that I initially could not find it. I also noticed cards that appeared to have blank images in screenshots. The agent investigated rather than blindly adding content: the states already existed, and the blank areas were caused by image lazy loading during full-page screenshots. Section navigation, eager card-image loading, and a visual fallback made the pages easier to inspect and use.

The audit also uncovered a real contrast failure in Sky Minimal's pressed button state. The reported ratio improved from **4.30:1 to 6.95:1** after the fix. This reinforced for me that a polished design must be tested in its interactive states, not just judged as a static image.

## 5. Stage 4 — I changed my mind about the final style

After seeing all three design systems, I **changed my final choice from Cockpit Dark to Sky Minimal**. This was one of my biggest design decisions. I realized that the lighter direction better supported what I wanted users to do: focus on aircraft photographs, read specifications comfortably, and move between models without visual clutter.

I directed the agent to reuse Sky Minimal's components, color tokens, and typography rather than invent another style. I also asked it to keep Horizon Blue mainly for interactive actions and avoid mixing in dark cockpit styling.

The first Aircraft Explorer included a hero, eight aircraft cards, manufacturer filtering, sorting, and a detail dialog. It worked, but I was not satisfied with the experience yet.

## 6. My biggest revision — From a sparse gallery to aircraft exploration

**My central criticism was that the site felt too empty and generic.** The first version was mostly a photograph, a few figures, and a short paragraph per aircraft. I did not want a product catalog; I wanted an experience where someone interested in aviation could actually **learn something**.

I expanded the creative brief in specific ways:

- **Richer model-specific content:** background, history, design decisions, typical operations, distinguishing features, and technical specifications.
- **Real photo galleries:** exterior, cockpit, cabin, and engine views, with images matched to the actual aircraft whenever possible.
- **Cabin and seating diagrams:** illustrative layouts, including upper and main decks for double-deck aircraft, clearly marked as not airline-specific seat maps.
- **Engine information:** engine families, manufacturers, and photographs where reliable assets were available.
- **“How to recognize it”:** visual clues that help visitors distinguish aircraft in real life.
- **A more focused hero and better cards:** stronger aircraft photography, more useful information hierarchy, and less empty space.

The agent pointed out that a single dialog would become cramped with all this content and **proposed dedicated profile pages**. I accepted that approach. Each of the eight aircraft now has a static page with **Overview, Gallery, Cabin, and Engines & Specs** tabs. The agent also sourced and credited additional photography; the project documentation reports **76 licensed images in total**. Where a reliable model-specific image could not be found, the category was omitted or a related variant was identified clearly instead of being presented inaccurately.

This was the turning point of the project: I kept the minimalist visual language, but made the **content itself much more substantial**.

## 7. I requested aircraft comparison

Once the profiles had meaningful information, I wanted visitors to compare aircraft rather than read about them in isolation. I specifically requested a blue-outlined **“Compare Aircraft →”** button beside the Airbus/Boeing filters, with a mobile layout that would not crowd those controls.

The comparison route was initially missing, and I raised that problem when the button led to a 404 page. The agent then built `/aircraft-explorer/compare`, supporting:

- Selection of **two or three aircraft** with no duplicates.
- Side-by-side photographs and a short **“at a glance”** summary.
- Comparison of performance, dimensions, cabin, engines, and history.
- Scaled numeric bars and aircraft-selection controls.

I wanted this to be useful for understanding different aircraft designs, **not a simplistic ranking of which plane is “best.”**

## 8. Final QA — Choosing reliability over more features

As the deadline approached, I explicitly asked the agent to **stop adding features** and focus on bugs, missing assignment requirements, accessibility, and visual problems.

Claude Code reported browser checks at **390px mobile and 1440px desktop**, covering the hub, mood boards, design systems, aircraft profiles, image viewers, comparison controls, navigation, and keyboard focus. Its final checks reported:

- **28 distinct mood-board artifacts per style.**
- All required design-system components and UI/control states.
- Eight working aircraft profile pages and their galleries and seat-map views.
- Working filters, tabs, photo navigation, and comparison interactions.
- No reported horizontal overflow, broken images, clipped text, or text contrast failures in the tested views.
- Passing TypeScript, ESLint, and production build checks.

One last mobile problem mattered to me: with three aircraft compared at **390px**, it was difficult to tell which values belonged to which aircraft after scrolling. The agent added compact aircraft labels above the values on phones. That is a good example of how I approached the final polish: **improve clarity, not just appearance**.
