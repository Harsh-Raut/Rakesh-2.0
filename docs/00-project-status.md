# PROJECT R — Status Summary
Single reference for everything built so far. Last updated: 20 Aug 2026.

---

## 1. What this is

A cyberpunk-styled, single-page **booking website** for a working DJ act called **Project R**.
Its only job: **turn a visitor into a WhatsApp enquiry.**

Not an artist/fan site. Not a discography. A lead-generation funnel wearing a nightclub's clothes.

**Covers four event types:** weddings & sangeet · clubs, pubs & lounges · corporate & brand · private & college.

## 2. Tech

Plain HTML + CSS + vanilla JS. No framework, no build step, no backend, no dependencies.
One webfont request (Orbitron / Rajdhani / Share Tech Mono). Deployable to any static host.

```
index.html              the whole site
assets/css/style.css    design system — 23 numbered blocks
assets/js/main.js       16 numbered modules
.claude/launch.json     local preview config
docs/                   this file + 4 strategy documents
```

Run locally:

```bash
python3 -m http.server 4321
```

## 3. ⚠️ The one thing that must be set first

`assets/js/main.js`, first three lines:

```js
const WHATSAPP_NUMBER = '910000000000';   // country code + number, digits only, no + or spaces
const PHONE_DISPLAY   = '+91 XXXXX XXXXX';
const PHONE_DIAL      = '+910000000000';
```

**Nothing on the site works until this is real.** For 98765 43210 in India → `919876543210`.

## 4. Page structure

| # | Section | Job |
|---|---|---|
| 00 | Door / preloader | Sets the nightlife tone. Self-dismisses in 4.5s. |
| 01 | Hero | Proposition + two CTAs (WhatsApp / packages) + stats |
| — | Ticker | Event types, "same-day reply" |
| 02 | **Four Kinds of Night** | The product menu — visitor self-identifies |
| 03 | **How It Works** | Kills process anxiety. Pinned horizontal scroll. |
| 04 | The Full Setup | Included kit + add-ons — turns rate comparison into value comparison |
| 05 | Packages | Three tiers, middle flagged "Most Booked" |
| 06 | The Music | Genre meters + requests policy |
| 07 | Gallery | Proof of a packed floor (placeholder tiles) |
| 08 | Reviews | Trust (placeholder) |
| 09 | Enquire | WhatsApp card, call, email + form |
| 10 | FAQ | Removes pre-booking back-and-forth |
| — | Footer + persistent CTAs | Floating WhatsApp button (desktop), sticky bar (mobile) |

## 5. The WhatsApp mechanic (core of the site)

Every green element carries `class="wa"` and its own `data-wa="..."` message. JS turns each into a
`wa.me` click-to-chat link with that message pre-filled — so the first chat already says which
section the lead came from.

```html
<a href="#" class="wa" data-wa="Hi, I saw your NYE availability.">Ask about NYE</a>
```

**The enquiry form has no backend by design.** It formats name, phone, date, city, event type,
guest count, hours and notes into a message and opens WhatsApp with it ready to send.
Nothing stored, nothing to host, nothing to break.

## 6. Design system

- **Palette:** Void `#04030a` · Cyan `#00f0ff` · Magenta `#ff2bd1` · Violet `#8b3bff` · Acid `#c6ff3d` · Amber `#ffb43d` · Alert `#ff2f4d` · WhatsApp Green `#25D366`
- **Colour rule:** cyan/magenta = club energy · **amber = weddings/warmth** · **green is reserved exclusively for WhatsApp CTAs**
- **Type:** Orbitron (display) · Rajdhani (body) · Share Tech Mono (labels/data)
- **Shape:** bevelled clipped corners throughout (`--edge`)
- **Ambient:** drifting grid, sweeping scanlines, swaying laser rig, floating specks, vignette

## 7. Interactions built

**Global**
- **Playhead** scroll-progress bar across the top, gradient with a glowing knob
- **Section dividers** — a neon line that draws itself in before each section, amber dot terminator
- **Room hue** — background tint crossfades per section (amber for weddings, cyan for clubs, violet for setup, magenta for packages, green near the enquiry form)
- Custom cursor with hover states (desktop only)

**Four Kinds of Night**
- **The crate** — cards start overlapped at centre, scaled 0.80–0.84, fanned ±10°, dimmed with progressive blur and descending z-index, then **deal out** into the grid as you scroll. Modelled on the Karan Aujla shelf (which is 2D stacking + z-order, not 3D). Scroll-progress driven, so it re-stacks scrolling back up. Tuned so the whole deal-out happens **on screen**.
- **Pointer tilt** in 3D (max 9°/11°), pointer-following glow, icon lift
- **Light-trace edge** — conic gradient masked to a 1.5px border, sweeping the bevel every 2.2s on hover
- **Floor-energy meter** per card — bar fills and BPM ticks up on hover:

  | Card | BPM | Range |
  |---|---|---|
  | Weddings & Sangeet | 118 | Dinner → Baraat |
  | Clubs, Pubs & Lounges | 132 | Open → Last Call |
  | Corporate & Brand | 112 | Dining → After-party |
  | Private & College | 126 | Warm-up → Peak |

**How It Works — pinned horizontal scroll**
- Section pins; vertical scroll drives the track sideways (0 → −792px at 1440px viewport)
- Runway computed from real track width × 1.25, so the last panel always lands flush
- Fifth panel added: a green "That's It." CTA card, so the pinned section ends on the ask
- Per-step timing tags, progress rail marked `01 02 03 04 GO`, active-panel highlight

## 8. Performance & accessibility rules applied

- Transform/opacity only; all scroll handlers `requestAnimationFrame`-throttled and `passive`
- **Crate and pin are desktop-only (≥981px).** Below that: normal grid, and How It Works becomes a native swipe strip with `scroll-snap-type: x mandatory` — no scroll-jacking on phones
- The rail syncs to the track's own scroll on mobile, since the pinned path never runs there
- Card tilt gated behind `(hover:hover) and (pointer:fine)`
- Touch devices get a static symmetric card edge instead of a frozen mid-sweep trace
- Everything disabled under `prefers-reduced-motion`
- Crate clears its inline transforms on completion so hover-tilt takes over cleanly

## 9. Placeholders — MUST be replaced before launch

| What | Where | Note |
|---|---|---|
| WhatsApp number, phone, email | `main.js` top + `#booking` | **Do this first** |
| Package prices | `.pkg .price` | Currently `₹ __,___` |
| Stats | Hero `[data-count]` | `000` / `00`. The counter **deliberately refuses to animate placeholder zeros** |
| Gallery photos | `.gal` tiles | Emoji tiles → real event photos, 1600px+ |
| Reviews | `#reviews` | Real only. A WhatsApp/Google screenshot beats typed text |
| City name | `<title>`, footer | Critical for local search |
| Social links | Footer, music section | All currently `href="#"` |
| FAQ answers | `main.js` → `faqs[]` | Match real terms (advance %, travel policy) |

**Do not ship the fake numbers.** Wedding clients check references.

## 10. Strategy documents

| Doc | Contents |
|---|---|
| [01 Brand & Positioning](01-brand-strategy.md) | The four questions every buyer asks, four buyer types, differentiators, voice, visual system, guardrails |
| [02 Marketing & Lead Gen](02-marketing-plan.md) | Where DJ bookings actually come from (ranked by conversion), priority actions, seasonality, pricing strategy, 7-step enquiry-closing script |
| [03 Content Plan](03-content-calendar.md) | What to shoot at every event, weekly rhythm, 10 Reel formats, first 30 days |
| [04 Website Guide](04-website-architecture.md) | Section rationale, WhatsApp system, data-wiring table, local SEO, launch checklist |

**Three things from the strategy worth remembering:**
1. Referrals and wedding planners convert 4× better than Instagram. Build those first.
2. The marketing push for peak season happens in **August**, not December.
3. **Reply time beats everything.** A DJ who answers in 10 minutes beats a better DJ who answers tomorrow — and the site now promises "same-day reply" in three places, so it has to be true.

## 11. Discussed but not built

From the interaction proposal: cursor-reactive / drag-scratch turntable · headline letter-lock ·
scroll-reactive ticker · drawing line between steps · boot-up sequence on the kit list ·
breathing "Most Booked" card · live WhatsApp message preview on the form ·
gallery parallax + lightbox · the genre-mixer lead qualifier.
